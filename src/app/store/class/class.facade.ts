import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ClassActions from './class.actions';
import * as ClassSelector from './class.selector';
import { PageQueryInterface, ClassFormInterface } from '../../types';

@Injectable()
export class ClassFacade {
  selectClassList$ = this.store.pipe(
    select(ClassSelector.selectClassList)
  );

  selectClassById$ = this.store.pipe(
    select(ClassSelector.selectClassById)
  );

  selectedLoading$ = this.store.pipe(select(ClassSelector.selectLoading));

  selectedError$ = this.store.pipe(select(ClassSelector.selectError));

  constructor(private readonly store: Store) {}

  getClassList(pageQuery: PageQueryInterface) {
    this.store.dispatch(ClassActions.getClassList({ pageQuery }));
  }

  getClassById(classId: string) {
    this.store.dispatch(ClassActions.getClassById({ classId }));
  }

  createClass(payload: ClassFormInterface) {
    this.store.dispatch(ClassActions.createClass({ payload }));
  }

  updateClass(payload: ClassFormInterface) {
    this.store.dispatch(ClassActions.editClass({ payload }));
  }
}
