import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as StudentClassActions from './student-class.actions';
import * as StudentClassSelector from './student-class.selector';
import { PageQueryInterface, StudentClassFormInterface } from '../../types';

@Injectable()
export class StudentClassFacade {
  selectStudentClassList$ = this.store.pipe(
    select(StudentClassSelector.selectStudentClassList)
  );

  selectStudentClassById$ = this.store.pipe(
    select(StudentClassSelector.selectStudentClassById)
  );

  selectedLoading$ = this.store.pipe(select(StudentClassSelector.selectLoading));

  selectedError$ = this.store.pipe(select(StudentClassSelector.selectError));

  constructor(private readonly store: Store) {}

  getStudentClassList(pageQuery: PageQueryInterface) {
    this.store.dispatch(StudentClassActions.getStudentClassList({ pageQuery }));
  }

  getStudentClassById(studentClassId: string) {
    this.store.dispatch(StudentClassActions.getStudentClassById({ studentClassId }));
  }

  createStudentClass(payload: StudentClassFormInterface) {
    this.store.dispatch(StudentClassActions.createStudentClass({ payload }));
  }

  updateStudentClass(payload: StudentClassFormInterface) {
    this.store.dispatch(StudentClassActions.editStudentClass({ payload }));
  }
}
