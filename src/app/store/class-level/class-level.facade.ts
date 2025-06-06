import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ClassLevelActions from './class-level.actions';
import * as ClassLevelSelector from './class-level.selector';
import { PageQueryInterface, ClassLevelFormInterface } from '../../types';

@Injectable()
export class ClassLevelFacade {
  selectClassLevelList$ = this.store.pipe(
    select(ClassLevelSelector.selectClassLevelList)
  );

  selectClassLevelById$ = this.store.pipe(
    select(ClassLevelSelector.selectClassLevelById)
  );

  selectedLoading$ = this.store.pipe(select(ClassLevelSelector.selectLoading));

  selectedError$ = this.store.pipe(select(ClassLevelSelector.selectError));

  constructor(private readonly store: Store) {}

  getClassLevelList(pageQuery: PageQueryInterface) {
    this.store.dispatch(ClassLevelActions.getClassLevelList({ pageQuery }));
  }

  getClassLevelById(classLevelId: string) {
    this.store.dispatch(ClassLevelActions.getClassLevelById({ classLevelId }));
  }

  createClassLevel(payload: ClassLevelFormInterface): Observable<void> {
    this.store.dispatch(ClassLevelActions.createClassLevel({ payload }));
    return new Observable<void>(observer => {
        observer.next();
        observer.complete();
    });
  }

  updateClassLevel(payload: ClassLevelFormInterface) {
    this.store.dispatch(ClassLevelActions.editClassLevel({ payload }));
  }
}
