import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ClassLevelListInterface,
  ClassLevelFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as ClassLevelAction from './class-level.actions';
import {
  selectClassLevelList,
  selectClassLevelAll,
  selectClassLevelByProperties,
  selectClassLevelById,
  selectExists,
  selectCount,
  selectClassLevelLoading,
  selectClassLevelError,
  selectClassLevelCreateSuccess,
  selectClassLevelUpdateSuccess,
} from './class-level.selector';
import { ClassLevelState } from './class-level.reducer';

@Injectable({
  providedIn: 'root',
})
export class ClassLevelFacade {
  classLevelList$: Observable<PaginatedResponseInterface<ClassLevelListInterface[]> | null>;
  classLevelAll$: Observable<ClassLevelListInterface[] | null>;
  classLevelByProperties$: Observable<ClassLevelListInterface[] | null>;
  classLevelById$: Observable<ClassLevelListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ classLevel: ClassLevelState }>) {
    this.classLevelList$ = this.store.select(selectClassLevelList);
    this.classLevelAll$ = this.store.select(selectClassLevelAll);
    this.classLevelByProperties$ = this.store.select(selectClassLevelByProperties);
    this.classLevelById$ = this.store.select(selectClassLevelById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectClassLevelLoading);
    this.error$ = this.store.select(selectClassLevelError);
    this.createSuccess$ = this.store.select(selectClassLevelCreateSuccess);
    this.updateSuccess$ = this.store.select(selectClassLevelUpdateSuccess);
  }

  getClassLevelList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(ClassLevelAction.getClassLevelList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getClassLevelAll(query?: QueryInterface): void {
    this.store.dispatch(ClassLevelAction.getClassLevelAll({ query }));
  }

  getClassLevelById(classLevelId: string): void {
    this.store.dispatch(ClassLevelAction.getClassLevelById({ classLevelId }));
  }

  getClassLevelByProperties(properties: Partial<ClassLevelFormInterface>): void {
    this.store.dispatch(ClassLevelAction.getClassLevelByProperties({ properties }));
  }

  classLevelExists(properties: Partial<ClassLevelFormInterface>): void {
    this.store.dispatch(ClassLevelAction.classLevelExists({ properties }));
  }

  classLevelCount(): void {
    this.store.dispatch(ClassLevelAction.classLevelCount());
  }

  createClassLevel(classLevel: ClassLevelFormInterface): void {
    this.store.dispatch(ClassLevelAction.createClassLevel({ payload: classLevel }));
  }

  updateClassLevel(classLevel: ClassLevelFormInterface): void {
    this.store.dispatch(ClassLevelAction.updateClassLevel({ payload: classLevel }));
  }

  deleteClassLevel(classLevelId: string): void {
    this.store.dispatch(ClassLevelAction.deleteClassLevel({ classLevelId }));
  }

  createManyClassLevels(classLevels: ClassLevelFormInterface[]): void {
    this.store.dispatch(ClassLevelAction.createManyClassLevels({ payload: classLevels }));
  }

  updateManyClassLevels(classLevels: ClassLevelFormInterface[]): void {
    this.store.dispatch(ClassLevelAction.updateManyClassLevels({ payload: classLevels }));
  }

  deleteManyClassLevels(classLevelIds: string[]): void {
    this.store.dispatch(ClassLevelAction.deleteManyClassLevels({ classLevelIds }));
  }
}
