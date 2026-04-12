import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { StudentFacade } from '../../../../store/student/student.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { ProfileImageFacade } from '../../../../store/profile-image/profile-image.facade';
import {
  StudentListInterface,
  DropdownListInterface,
  StudentClassListInterface,
  FeeListInterface,
  PaymentStatusEnum,
} from '../../../../types';
import { getClassLabel } from '../../../../services/helper.service';

interface FeeEntry {
  fee: FeeListInterface;
  className: string;
}

interface FeeGroup {
  sessionName: string;
  termLabel: string;
  sortKey: string;
  fees: FeeEntry[];
  total: number;
  paid: number;
  balance: number;
}

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit, OnDestroy {
  student$: Observable<StudentListInterface | null>;
  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  loading$: Observable<boolean>;
  feeGroups: FeeGroup[] = [];

  photoUrl: string | null = null;
  photoUploading = false;
  photoDeleting = false;
  entityInitials = 'U';

  readonly PaymentStatusEnum = PaymentStatusEnum;

  private studentId = '';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private studentFacade: StudentFacade,
    private sharedFacade: SharedFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
    private profileImageFacade: ProfileImageFacade,
  ) {
    this.student$ = this.studentFacade.studentByProperties$.pipe(
      map(students => students?.[0] ?? null)
    );
    this.genderList$ = this.sharedFacade.selectGenderList$;
    this.religionList$ = this.sharedFacade.selectReligionList$;
    this.loading$ = this.studentFacade.loading$;
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.params['id'];
    if (this.studentId) {
      this.profileImageFacade.loadCachedPhotoUrl(this.studentId);
      this.profileImageFacade.getPhotoUrl$(this.studentId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(url => this.photoUrl = url);

      this.studentFacade.getStudentByProperties({
        queryProperties: [{ name: 'id', value: this.studentId }],
        nestedProperties: [
          {
            name: 'studentClasses',
            innerNestedProperties: [
              {
                name: 'class',
                innerNestedProperties: [
                  { name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }
                ]
              },
              { name: 'session' },
              {
                name: 'fees',
                innerNestedProperties: [
                  { name: 'schoolTermSession', innerNestedProperties: [{ name: 'session' }] },
                  { name: 'feeLines', innerNestedProperties: [{ name: 'feeType' }, { name: 'feeSetup' }] }
                ]
              }
            ]
          },
          { name: 'family' },
          { name: 'residentialState' },
          { name: 'nationality' },
          { name: 'stateOfOrigin' },
          { name: 'originLGA' }
        ]
      });
    }

    this.student$.pipe(takeUntil(this.unsubscribe$)).subscribe(student => {
      if (student) {
        this.entityInitials = `${student.firstName?.charAt(0) ?? ''}${student.lastName?.charAt(0) ?? ''}`.toUpperCase() || 'U';
        this.computeFeeGroups(student);
      }
    });

    this.profileImageFacade.uploading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(uploading => this.photoUploading = uploading);

    this.profileImageFacade.deleting$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(deleting => this.photoDeleting = deleting);

    this.sharedFacade.getGenderList();
    this.sharedFacade.getReligionList();
  }

  private computeFeeGroups(student: StudentListInterface) {
    const groupMap = new Map<string, FeeGroup>();

    for (const sc of (student.studentClasses ?? [])) {
      const fees = (sc.fees ?? []) as FeeListInterface[];
      const className = getClassLabel(sc.class) || sc.class?.name || '—';

      for (const fee of fees) {
        const ts = fee.schoolTermSession;
        if (!ts) continue;

        const sessionName = ts.session?.name ?? ts.sessionId;
        const termLabel = ts.termString ?? `Term ${ts.term}`;
        const sortKey = `${sessionName}_${termLabel}`;

        if (!groupMap.has(sortKey)) {
          groupMap.set(sortKey, { sessionName, termLabel, sortKey, fees: [], total: 0, paid: 0, balance: 0 });
        }

        const group = groupMap.get(sortKey)!;
        const total = this.getFeeTotal(fee);
        const paid = this.getFeePaid(fee);
        group.fees.push({ fee, className });
        group.total += total;
        group.paid += paid;
        group.balance += total - paid;
      }
    }

    this.feeGroups = Array.from(groupMap.values())
      .sort((a, b) => b.sessionName.localeCompare(a.sessionName) || a.termLabel.localeCompare(b.termLabel));
  }

  deletePhoto() {
    if (!this.studentId) return;
    this.profileImageFacade.deleteProfileImage('Student', this.studentId);
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.studentId) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.globalLoadingFacade.globalErrorShow('Only JPEG, PNG, or WebP images are allowed', 3000);
      input.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.globalLoadingFacade.globalErrorShow('Image must be smaller than 5MB', 3000);
      input.value = '';
      return;
    }

    this.profileImageFacade.uploadProfileImage('Student', this.studentId, file);
    input.value = '';
  }

  getLabel(list: DropdownListInterface[] | null, value: number | undefined): string {
    if (value === undefined || value === null) return '—';
    return list?.find(item => +item.value === value)?.name ?? '—';
  }

  getClassName(sc: StudentClassListInterface): string {
    const programmeType = sc.class?.classLevel?.programmeType?.name ?? '';
    const level = sc.class?.classLevel?.level ?? '';
    const name = sc.class?.name ?? sc.classId;
    return [programmeType, level, name].filter(Boolean).join(' ');
  }

  getFeeTotal(fee: FeeListInterface): number {
    return fee.feeLines?.reduce((s, fl) => s + (fl.amount || 0), 0) ?? 0;
  }

  getFeePaid(fee: FeeListInterface): number {
    return fee.feeLines?.reduce((s, fl) => s + (fl.settledAmount || 0), 0) ?? 0;
  }

  getFeeBalance(fee: FeeListInterface): number {
    return this.getFeeTotal(fee) - this.getFeePaid(fee);
  }

  getStatusLabel(status: PaymentStatusEnum): string {
    const map: Record<number, string> = { 0: 'Pending', 1: 'Partially Paid', 2: 'Paid', 3: 'Overpaid' };
    return map[status] ?? 'Unknown';
  }

  getStatusClass(status: PaymentStatusEnum): string {
    const map: Record<number, string> = {
      0: 'bg-yellow-100 text-yellow-700',
      1: 'bg-blue-100 text-blue-700',
      2: 'bg-green-100 text-green-700',
      3: 'bg-purple-100 text-purple-700',
    };
    return map[status] ?? 'bg-gray-100 text-gray-600';
  }

  goBack(): void { this.location.back(); }

  navigateToEdit() {
    this.router.navigate(['/app/student/edit', this.studentId]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
