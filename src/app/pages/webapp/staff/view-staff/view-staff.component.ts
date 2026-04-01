import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StaffFacade } from '../../../../store/staff/staff.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { ProfileImageFacade } from '../../../../store/profile-image/profile-image.facade';
import { RoleFacade } from '../../../../store/role/role.facade';
import { StaffListInterface, DropdownListInterface, ClassSubjectListInterface, RoleWithPermissionsInterface } from '../../../../types';
import { RoleDialogComponent, RoleDialogData } from '../../../../shared/role-dialog/role-dialog.component';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss'],
})
export class ViewStaffComponent implements OnInit, OnDestroy {
  staff$: Observable<StaffListInterface | null>;
  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  loading$: Observable<boolean>;

  photoUrl: string | null = null;
  photoUploading = false;
  photoDeleting = false;
  entityInitials = 'U';
  userRoles: RoleWithPermissionsInterface[] = [];
  rolesLoading = true;

  private staffId = '';
  private userId = '';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private staffFacade: StaffFacade,
    private sharedFacade: SharedFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
    private profileImageFacade: ProfileImageFacade,
    private roleFacade: RoleFacade,
  ) {
    this.staff$ = this.staffFacade.staffByProperties$.pipe(
      map(staff => staff?.[0] ?? null)
    );
    this.genderList$ = this.sharedFacade.selectGenderList$;
    this.religionList$ = this.sharedFacade.selectReligionList$;
    this.loading$ = this.staffFacade.loading$;
  }

  ngOnInit() {
    this.staffId = this.route.snapshot.params['id'];
    if (this.staffId) {
      this.profileImageFacade.loadCachedPhotoUrl(this.staffId);
      this.profileImageFacade.getPhotoUrl$(this.staffId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(url => this.photoUrl = url);

      this.staffFacade.getStaffByProperties({
        queryProperties: [{ name: 'id', value: this.staffId }],
        nestedProperties: [
          {
            name: 'classSubjects',
            innerNestedProperties: [
              {
                name: 'class',
                innerNestedProperties: [
                  { name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }
                ]
              },
              { name: 'subject' }
            ]
          },
          { name: 'residentialState' },
          { name: 'nationality' },
          { name: 'stateOfOrigin' },
          { name: 'originLGA' }
        ]
      });
    }

    this.staff$.pipe(takeUntil(this.unsubscribe$)).subscribe(staff => {
      if (staff) {
        this.entityInitials = `${staff.firstName?.charAt(0) ?? ''}${staff.lastName?.charAt(0) ?? ''}`.toUpperCase() || 'U';
        if (staff.userId) {
          this.userId = staff.userId;
          this.loadUserRoles();
        }
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

  deletePhoto() {
    if (!this.staffId) return;
    this.profileImageFacade.deleteProfileImage('Staff', this.staffId);
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.staffId) return;

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

    this.profileImageFacade.uploadProfileImage('Staff', this.staffId, file);
    input.value = '';
  }

  getLabel(list: DropdownListInterface[] | null, value: number | undefined): string {
    if (value === undefined || value === null) return '—';
    return list?.find(item => +item.value === value)?.name ?? '—';
  }

  getClassName(cs: ClassSubjectListInterface): string {
    const programmeType = cs.class?.classLevel?.programmeType?.name ?? '';
    const level = cs.class?.classLevel?.level ?? '';
    const name = cs.class?.name ?? cs.classId;
    return [programmeType, level, name].filter(Boolean).join(' ');
  }

  goBack(): void { this.location.back(); }

  navigateToEdit() {
    this.router.navigate(['/app/staff/edit', this.staffId]);
  }

  loadUserRoles() {
    if (!this.userId) return;
    this.rolesLoading = true;
    this.roleFacade.getRoleAll();
    this.roleFacade.getUserRoles(this.userId);

    combineLatest([this.roleFacade.roleAll$, this.roleFacade.userRoles$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([allRoles, userRoleNames]) => {
        if (allRoles && userRoleNames) {
          const nameSet = new Set(userRoleNames);
          this.userRoles = allRoles.filter(r => nameSet.has(r.name));
          this.rolesLoading = false;
        }
      });
  }

  openAssignRoleDialog() {
    this.staff$.pipe(takeUntil(this.unsubscribe$)).subscribe(staff => {
      if (!staff) return;
      const dialogRef = this.dialog.open(RoleDialogComponent, {
        width: '440px',
        data: {
          title: 'Assign Role',
          userName: `${staff.firstName} ${staff.lastName}`,
          userId: this.userId,
          mode: 'assign',
        } as RoleDialogData,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.roleFacade.assignRole(result);
          setTimeout(() => this.loadUserRoles(), 1000);
        }
      });
    }).unsubscribe();
  }

  openRemoveRoleDialog() {
    this.staff$.pipe(takeUntil(this.unsubscribe$)).subscribe(staff => {
      if (!staff) return;
      const dialogRef = this.dialog.open(RoleDialogComponent, {
        width: '440px',
        data: {
          title: 'Remove Role',
          userName: `${staff.firstName} ${staff.lastName}`,
          userId: this.userId,
          mode: 'remove',
        } as RoleDialogData,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.roleFacade.removeRole(result);
          setTimeout(() => this.loadUserRoles(), 1000);
        }
      });
    }).unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
