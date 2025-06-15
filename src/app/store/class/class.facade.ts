import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ClassListInterface,
  ClassFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as ClassAction from './class.actions';
import {
  selectClassList,
  selectClassAll,
  selectClassByProperties,
  selectClassById,
  selectExists,
  selectCount,
  selectClassLoading,
  selectClassError,
} from './class.selector';
import { ClassState } from './class.reducer';

@Injectable({
  providedIn: 'root',
})
export class ClassFacade {
  classList$: Observable<PaginatedResponseInterface<ClassListInterface[]> | null>;
  classAll$: Observable<ClassListInterface[] | null>;
  classByProperties$: Observable<ClassListInterface[] | null>;
  classById$: Observable<ClassListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ class: ClassState }>) {
    this.classList$ = this.store.select(selectClassList);
    this.classAll$ = this.store.select(selectClassAll);
    this.classByProperties$ = this.store.select(selectClassByProperties);
    this.classById$ = this.store.select(selectClassById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectClassLoading);
    this.error$ = this.store.select(selectClassError);
  }

  getClassList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(ClassAction.getClassList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getClassAll(): void {
    this.store.dispatch(ClassAction.getClassAll());
  }

  getClassById(classId: string): void {
    this.store.dispatch(ClassAction.getClassById({ classId }));
  }

  getClassByProperties(properties: Partial<ClassFormInterface>): void {
    this.store.dispatch(ClassAction.getClassByProperties({ properties }));
  }

  classExists(properties: Partial<ClassFormInterface>): void {
    this.store.dispatch(ClassAction.classExists({ properties }));
  }

  classCount(): void {
    this.store.dispatch(ClassAction.classCount());
  }

  createClass(classDto: ClassFormInterface): void {
    this.store.dispatch(ClassAction.createClass({ payload: classDto }));
  }

  updateClass(classDto: ClassFormInterface): void {
    this.store.dispatch(ClassAction.updateClass({ payload: classDto }));
  }

  deleteClass(classId: string): void {
    this.store.dispatch(ClassAction.deleteClass({ classId }));
  }

  createManyClasss(classs: ClassFormInterface[]): void {
    this.store.dispatch(ClassAction.createManyClasss({ payload: classs }));
  }

  updateManyClasss(classs: ClassFormInterface[]): void {
    this.store.dispatch(ClassAction.updateManyClasss({ payload: classs }));
  }

  deleteManyClasss(classIds: string[]): void {
    this.store.dispatch(ClassAction.deleteManyClasss({ classIds }));
  }
}
