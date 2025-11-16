import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as StudentClassActions from './student-class.actions';
import * as StudentClassSelector from './student-class.selector';
import { PageQueryInterface, StudentClassFormInterface } from '../../types';

@Injectable()
export class StudentClassFacade {
  studentClassList$ = this.store.pipe(
    select(StudentClassSelector.selectStudentClassList)
  );

  studentClassById$ = this.store.pipe(
    select(StudentClassSelector.selectStudentClassById)
  );

  loading$ = this.store.pipe(select(StudentClassSelector.selectLoading));

  error$ = this.store.pipe(select(StudentClassSelector.selectError));

  createSuccess$ = this.store.pipe(select(StudentClassSelector.selectCreateSuccess));

  updateSuccess$ = this.store.pipe(select(StudentClassSelector.selectUpdateSuccess));

  deleteSuccess$ = this.store.pipe(select(StudentClassSelector.selectDeleteSuccess));

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

  deleteStudentClass(id: string) {
    this.store.dispatch(StudentClassActions.deleteStudentClass({ id }));
  }
}
