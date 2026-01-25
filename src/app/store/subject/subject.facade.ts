import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  SubjectListInterface,
  SubjectFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as SubjectAction from './subject.actions';
import {
  selectSubjectList,
  selectSubjectAll,
  selectSubjectByProperties,
  selectSubjectById,
  selectExists,
  selectCount,
  selectSubjectLoading,
  selectSubjectError,
  selectSubjectCreateSuccess,
  selectSubjectUpdateSuccess,
} from './subject.selector';
import { SubjectState } from './subject.reducer';

@Injectable({
  providedIn: 'root',
})
export class SubjectFacade {
  subjectList$: Observable<PaginatedResponseInterface<SubjectListInterface[]> | null>;
  subjectAll$: Observable<SubjectListInterface[] | null>;
  subjectByProperties$: Observable<SubjectListInterface[] | null>;
  subjectById$: Observable<SubjectListInterface | null>;
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

  constructor(private store: Store<{ subject: SubjectState }>) {
    this.subjectList$ = this.store.select(selectSubjectList);
    this.subjectAll$ = this.store.select(selectSubjectAll);
    this.subjectByProperties$ = this.store.select(selectSubjectByProperties);
    this.subjectById$ = this.store.select(selectSubjectById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectSubjectLoading);
    this.error$ = this.store.select(selectSubjectError);
    this.createSuccess$ = this.store.select(selectSubjectCreateSuccess);
    this.updateSuccess$ = this.store.select(selectSubjectUpdateSuccess);
  }

  getSubjectList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(SubjectAction.getSubjectList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getSubjectAll(query?: QueryInterface): void {
    this.store.dispatch(SubjectAction.getSubjectAll({ query }));
  }

  getSubjectById(subjectId: string): void {
    this.store.dispatch(SubjectAction.getSubjectById({ subjectId }));
  }

  getSubjectByProperties(properties: Partial<SubjectFormInterface>): void {
    this.store.dispatch(SubjectAction.getSubjectByProperties({ properties }));
  }

  subjectExists(properties: Partial<SubjectFormInterface>): void {
    this.store.dispatch(SubjectAction.subjectExists({ properties }));
  }

  subjectCount(): void {
    this.store.dispatch(SubjectAction.subjectCount());
  }

  createSubject(subject: SubjectFormInterface): void {
    this.store.dispatch(SubjectAction.createSubject({ payload: subject }));
  }

  updateSubject(subject: SubjectFormInterface): void {
    this.store.dispatch(SubjectAction.updateSubject({ payload: subject }));
  }

  deleteSubject(subjectId: string): void {
    this.store.dispatch(SubjectAction.deleteSubject({ subjectId }));
  }

  createManySubjects(subjects: SubjectFormInterface[]): void {
    this.store.dispatch(SubjectAction.createManySubjects({ payload: subjects }));
  }

  updateManySubjects(subjects: SubjectFormInterface[]): void {
    this.store.dispatch(SubjectAction.updateManySubjects({ payload: subjects }));
  }

  deleteManySubjects(subjectIds: string[]): void {
    this.store.dispatch(SubjectAction.deleteManySubjects({ subjectIds }));
  }
}
