import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as StudentsActions from './students.actions';
import * as StudentsSelector from './students.selector';
import { PageQueryInterface, StudentFormInterface } from '../../types';

@Injectable()
export class StudentsFacade {
  selectStudentsList$ = this.store.pipe(
    select(StudentsSelector.selectStudentsList)
  );

  selectStudentById$ = this.store.pipe(
    select(StudentsSelector.selectStudentById)
  );

  selectedLoading$ = this.store.pipe(select(StudentsSelector.selectLoading));

  selectedError$ = this.store.pipe(select(StudentsSelector.selectError));

  constructor(private readonly store: Store) {}

  getStudentsList(pageQuery: PageQueryInterface) {
    this.store.dispatch(StudentsActions.getStudentsList({ pageQuery }));
  }

  getStudentById(studentId: string) {
    this.store.dispatch(StudentsActions.getStudentById({ studentId }));
  }

  createStudent(payload: StudentFormInterface) {
    this.store.dispatch(StudentsActions.createStudent({ payload }));
  }

  updateStudent(payload: StudentFormInterface) {
    this.store.dispatch(StudentsActions.editStudent({ payload }));
  }
}
