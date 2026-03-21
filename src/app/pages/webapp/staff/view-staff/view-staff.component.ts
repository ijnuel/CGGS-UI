import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaffFacade } from '../../../../store/staff/staff.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { StaffListInterface, DropdownListInterface, ClassSubjectListInterface } from '../../../../types';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss'],
})
export class ViewStaffComponent implements OnInit {
  staff$: Observable<StaffListInterface | null>;
  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  loading$: Observable<boolean>;

  private staffId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffFacade: StaffFacade,
    private sharedFacade: SharedFacade
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
    this.sharedFacade.getGenderList();
    this.sharedFacade.getReligionList();
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

  navigateToEdit() {
    this.router.navigate(['/app/staff/edit', this.staffId]);
  }
}
