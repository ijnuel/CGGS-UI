import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as TeacherActions from './teacher.actions';
import * as TeacherSelector from './teacher.selector';
import { PageQueryInterface, TeacherFormInterface } from '../../types';

@Injectable()
export class TeacherFacade {
  selectTeacherList$ = this.store.pipe(
    select(TeacherSelector.selectTeacherList)
  );

  selectTeacherById$ = this.store.pipe(
    select(TeacherSelector.selectTeacherById)
  );

  selectedLoading$ = this.store.pipe(select(TeacherSelector.selectLoading));

  selectedError$ = this.store.pipe(select(TeacherSelector.selectError));

  constructor(private readonly store: Store) {}

  getTeacherList(pageQuery: PageQueryInterface) {
    this.store.dispatch(TeacherActions.getTeacherList({ pageQuery }));
  }

  getTeacherById(teacherId: string) {
    this.store.dispatch(TeacherActions.getTeacherById({ teacherId }));
  }

  createTeacher(payload: TeacherFormInterface) {
    this.store.dispatch(TeacherActions.createTeacher({ payload }));
  }

  updateTeacher(payload: TeacherFormInterface) {
    this.store.dispatch(TeacherActions.editTeacher({ payload }));
  }
}
