import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  SchoolTermSessionListInterface,
  SchoolTermSessionFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as SchoolTermSessionAction from './school-term-session.actions';
import {
  selectSchoolTermSessionList,
  selectSchoolTermSessionAll,
  selectSchoolTermSessionByProperties,
  selectSchoolTermSessionById,
  selectExists,
  selectCount,
  selectSchoolTermSessionLoading,
  selectSchoolTermSessionError,
  selectSchoolTermSessionCreateSuccess,
  selectSchoolTermSessionUpdateSuccess,
} from './school-term-session.selector';
import { SchoolTermSessionState } from './school-term-session.reducer';

@Injectable({
  providedIn: 'root',
})
export class SchoolTermSessionFacade {
  schoolTermSessionList$: Observable<PaginatedResponseInterface<SchoolTermSessionListInterface[]> | null>;
  schoolTermSessionAll$: Observable<SchoolTermSessionListInterface[] | null>;
  schoolTermSessionByProperties$: Observable<SchoolTermSessionListInterface[] | null>;
  schoolTermSessionById$: Observable<SchoolTermSessionListInterface | null>;
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

  constructor(private store: Store<{ schoolTermSession: SchoolTermSessionState }>) {
    this.schoolTermSessionList$ = this.store.select(selectSchoolTermSessionList);
    this.schoolTermSessionAll$ = this.store.select(selectSchoolTermSessionAll);
    this.schoolTermSessionByProperties$ = this.store.select(selectSchoolTermSessionByProperties);
    this.schoolTermSessionById$ = this.store.select(selectSchoolTermSessionById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectSchoolTermSessionLoading);
    this.error$ = this.store.select(selectSchoolTermSessionError);
    this.createSuccess$ = this.store.select(selectSchoolTermSessionCreateSuccess);
    this.updateSuccess$ = this.store.select(selectSchoolTermSessionUpdateSuccess);
  }

  getSchoolTermSessionList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(SchoolTermSessionAction.getSchoolTermSessionList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getSchoolTermSessionAll(query?: QueryInterface): void {
    this.store.dispatch(SchoolTermSessionAction.getSchoolTermSessionAll({ query }));
  }

  getSchoolTermSessionById(schoolTermSessionId: string): void {
    this.store.dispatch(SchoolTermSessionAction.getSchoolTermSessionById({ schoolTermSessionId }));
  }

  getSchoolTermSessionByProperties(properties: Partial<SchoolTermSessionFormInterface>): void {
    this.store.dispatch(SchoolTermSessionAction.getSchoolTermSessionByProperties({ properties }));
  }

  schoolTermSessionExists(properties: Partial<SchoolTermSessionFormInterface>): void {
    this.store.dispatch(SchoolTermSessionAction.schoolTermSessionExists({ properties }));
  }

  schoolTermSessionCount(): void {
    this.store.dispatch(SchoolTermSessionAction.schoolTermSessionCount());
  }

  createSchoolTermSession(schoolTermSession: SchoolTermSessionFormInterface): void {
    this.store.dispatch(SchoolTermSessionAction.createSchoolTermSession({ payload: schoolTermSession }));
  }

  updateSchoolTermSession(schoolTermSession: SchoolTermSessionFormInterface): void {
    this.store.dispatch(SchoolTermSessionAction.updateSchoolTermSession({ payload: schoolTermSession }));
  }

  deleteSchoolTermSession(schoolTermSessionId: string): void {
    this.store.dispatch(SchoolTermSessionAction.deleteSchoolTermSession({ schoolTermSessionId }));
  }

  createManySchoolTermSessions(schoolTermSessions: SchoolTermSessionFormInterface[]): void {
    this.store.dispatch(SchoolTermSessionAction.createManySchoolTermSessions({ payload: schoolTermSessions }));
  }

  updateManySchoolTermSessions(schoolTermSessions: SchoolTermSessionFormInterface[]): void {
    this.store.dispatch(SchoolTermSessionAction.updateManySchoolTermSessions({ payload: schoolTermSessions }));
  }

  deleteManySchoolTermSessions(schoolTermSessionIds: string[]): void {
    this.store.dispatch(SchoolTermSessionAction.deleteManySchoolTermSessions({ schoolTermSessionIds }));
  }
}
