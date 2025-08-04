import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ClassSubjectListInterface,
  ClassSubjectFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
// If QueryProperty type is defined, import it here
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
  selectClassSubjectCreateSuccess,
  selectClassSubjectUpdateSuccess,
  selectAddSubjectToClassResult,
  selectDataImportTemplate,
} from './class-subject.selector';
import { ClassSubjectState } from './class-subject.reducer';

@Injectable({
  providedIn: 'root',
})
export class ClassSubjectFacade {
  classSubjectList$: Observable<PaginatedResponseInterface<ClassSubjectListInterface[]> | null>;
  classSubjectAll$: Observable<ClassSubjectListInterface[] | null>;
  classSubjectByProperties$: Observable<ClassSubjectListInterface | null>;
  classSubjectById$: Observable<ClassSubjectListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  addSubjectToClassResult$: Observable<string | null>;
  dataImportTemplate$: Observable<any | null>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  // Add new observables if needed for new endpoints

  constructor(private store: Store<{ classSubject: ClassSubjectState }>) {
    this.classSubjectList$ = this.store.select(selectClassSubjectList);
    this.classSubjectAll$ = this.store.select(selectClassSubjectAll);
    this.classSubjectByProperties$ = this.store.select(selectClassSubjectByProperties);
    this.classSubjectById$ = this.store.select(selectClassSubjectById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectClassSubjectLoading);
    this.error$ = this.store.select(selectClassSubjectError);
    this.createSuccess$ = this.store.select(selectClassSubjectCreateSuccess);
    this.updateSuccess$ = this.store.select(selectClassSubjectUpdateSuccess);
    this.addSubjectToClassResult$ = this.store.select(selectAddSubjectToClassResult);
    this.dataImportTemplate$ = this.store.select(selectDataImportTemplate);
  }

  getClassSubjectList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    const { start, recordsPerPage, searchText, queryProperties } = pageQuery as any;
    this.store.dispatch(ClassSubjectAction.getClassSubjectList({
      start,
      recordsPerPage,
      searchText,
      queryProperties: queryProperties ? JSON.stringify(queryProperties) : undefined
    }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getClassSubjectAll(queryProperties?: any): void {
    if (queryProperties) {
      this.store.dispatch(ClassSubjectAction.getClassSubjectAll({ queryProperties: JSON.stringify(queryProperties) }));
    } else {
      this.store.dispatch(ClassSubjectAction.getClassSubjectAll({}));
    }
  }

  getClassSubjectById(classSubjectId: string): void {
    this.store.dispatch(ClassSubjectAction.getClassSubjectById({ classSubjectId }));
  }

  getClassSubjectByProperties(properties: Partial<ClassSubjectFormInterface>): void {
    const queryPropertiesString = JSON.stringify(
      Object.entries(properties).map(([Name, Value]) => ({ Name, Value }))
    );
    this.store.dispatch(ClassSubjectAction.getClassSubjectByProperties({ queryPropertiesString }));
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

  // Add Subject To Class
  addSubjectToClass(payload: any): void {
    this.store.dispatch(ClassSubjectAction.addSubjectToClass({ payload }));
  }

  getClassSubjectDataImportTemplate(): void {
    this.store.dispatch(ClassSubjectAction.getClassSubjectDataImportTemplate());
  }
}
