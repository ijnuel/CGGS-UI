import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ClassSubjectListInterface,
  ClassSubjectFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as ClassSubjectAction from './class-subject.actions';
import {
  selectClassSubjectList,
  selectClassSubjectAll,
  selectClassSubjectByProperties,
  selectClassSubjectById,
  selectExists,
  selectCount,
  selectClassSubjectLoading,
  selectClassSubjectError,
} from './class-subject.selector';
import { ClassSubjectState } from './class-subject.reducer';

@Injectable({
  providedIn: 'root',
})
export class ClassSubjectFacade {
  classSubjectList$: Observable<PaginatedResponseInterface<ClassSubjectListInterface[]> | null>;
  classSubjectAll$: Observable<ClassSubjectListInterface[] | null>;
  classSubjectByProperties$: Observable<ClassSubjectListInterface[] | null>;
  classSubjectById$: Observable<ClassSubjectListInterface | null>;
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

  constructor(private store: Store<{ classSubject: ClassSubjectState }>) {
    this.classSubjectList$ = this.store.select(selectClassSubjectList);
    this.classSubjectAll$ = this.store.select(selectClassSubjectAll);
    this.classSubjectByProperties$ = this.store.select(selectClassSubjectByProperties);
    this.classSubjectById$ = this.store.select(selectClassSubjectById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectClassSubjectLoading);
    this.error$ = this.store.select(selectClassSubjectError);
  }

  getClassSubjectList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(ClassSubjectAction.getClassSubjectList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getClassSubjectAll(): void {
    this.store.dispatch(ClassSubjectAction.getClassSubjectAll());
  }

  getClassSubjectById(classSubjectId: string): void {
    this.store.dispatch(ClassSubjectAction.getClassSubjectById({ classSubjectId }));
  }

  getClassSubjectByProperties(properties: Partial<ClassSubjectFormInterface>): void {
    this.store.dispatch(ClassSubjectAction.getClassSubjectByProperties({ properties }));
  }

  classSubjectExists(properties: Partial<ClassSubjectFormInterface>): void {
    this.store.dispatch(ClassSubjectAction.classSubjectExists({ properties }));
  }

  classSubjectCount(): void {
    this.store.dispatch(ClassSubjectAction.classSubjectCount());
  }

  createClassSubject(classSubject: ClassSubjectFormInterface): void {
    this.store.dispatch(ClassSubjectAction.createClassSubject({ payload: classSubject }));
  }

  updateClassSubject(classSubject: ClassSubjectFormInterface): void {
    this.store.dispatch(ClassSubjectAction.updateClassSubject({ payload: classSubject }));
  }

  deleteClassSubject(classSubjectId: string): void {
    this.store.dispatch(ClassSubjectAction.deleteClassSubject({ classSubjectId }));
  }

  createManyClassSubjects(classSubjects: ClassSubjectFormInterface[]): void {
    this.store.dispatch(ClassSubjectAction.createManyClassSubjects({ payload: classSubjects }));
  }

  updateManyClassSubjects(classSubjects: ClassSubjectFormInterface[]): void {
    this.store.dispatch(ClassSubjectAction.updateManyClassSubjects({ payload: classSubjects }));
  }

  deleteManyClassSubjects(classSubjectIds: string[]): void {
    this.store.dispatch(ClassSubjectAction.deleteManyClassSubjects({ classSubjectIds }));
  }
}
