import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentFacade } from '../../../../store/student/student.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { StudentListInterface, DropdownListInterface, StudentClassListInterface } from '../../../../types';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  student$: Observable<StudentListInterface | null>;
  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  loading$: Observable<boolean>;

  private studentId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentFacade: StudentFacade,
    private sharedFacade: SharedFacade
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
              { name: 'session' }
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
    this.sharedFacade.getGenderList();
    this.sharedFacade.getReligionList();
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

  navigateToEdit() {
    this.router.navigate(['/app/student/edit', this.studentId]);
  }
}
