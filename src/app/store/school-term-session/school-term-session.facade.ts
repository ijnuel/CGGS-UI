import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SchoolTermSessionListInterface,
  SchoolTermSessionFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import { SessionListInterface } from '../../types/session';
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
import { SessionFacade } from '../session/session.facade';

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

  constructor(
    private store: Store<{ schoolTermSession: SchoolTermSessionState }>,
    private sessionFacade: SessionFacade,
  ) {
    // Backend's SchoolTermSession endpoints currently return session: null even
    // when nestedProperties: [{name: 'session'}] is sent. Hydrate session in the
    // facade so every consumer (dropdowns, tables) sees the populated object.
    const hydrate = <T extends SchoolTermSessionListInterface | null | undefined>(
      term: T,
      sessionMap: Map<string, SessionListInterface>,
    ): T => {
      if (!term) return term;
      return {
        ...term,
        session: term.session ?? (term.sessionId ? sessionMap.get(term.sessionId) : undefined),
      } as T;
    };
    const sessionMap$ = this.sessionFacade.sessionAll$.pipe(
      map(sessions => new Map<string, SessionListInterface>(
        (sessions ?? []).map(s => [s.id, s])
      ))
    );

    this.schoolTermSessionList$ = combineLatest([
      this.store.select(selectSchoolTermSessionList),
      sessionMap$,
    ]).pipe(
      map(([list, sessionMap]) => {
        if (!list) return list;
        return { ...list, data: list.data.map(t => hydrate(t, sessionMap)) };
      })
    );
    this.schoolTermSessionAll$ = combineLatest([
      this.store.select(selectSchoolTermSessionAll),
      sessionMap$,
    ]).pipe(
      map(([terms, sessionMap]) =>
        terms ? terms.map(t => hydrate(t, sessionMap)) : terms
      )
    );
    this.schoolTermSessionByProperties$ = combineLatest([
      this.store.select(selectSchoolTermSessionByProperties),
      sessionMap$,
    ]).pipe(
      map(([terms, sessionMap]) =>
        terms ? terms.map(t => hydrate(t, sessionMap)) : terms
      )
    );
    this.schoolTermSessionById$ = combineLatest([
      this.store.select(selectSchoolTermSessionById),
      sessionMap$,
    ]).pipe(
      map(([term, sessionMap]) => hydrate(term, sessionMap))
    );
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectSchoolTermSessionLoading);
    this.error$ = this.store.select(selectSchoolTermSessionError);
    this.createSuccess$ = this.store.select(selectSchoolTermSessionCreateSuccess);
    this.updateSuccess$ = this.store.select(selectSchoolTermSessionUpdateSuccess);

    // Ensure sessions are loaded so hydration produces real data.
    this.sessionFacade.getSessionAll();
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

  getSchoolTermSessionByProperties(query: QueryInterface): void {
    this.store.dispatch(SchoolTermSessionAction.getSchoolTermSessionByProperties({ query }));
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

  setSchoolTermSessionAsCurrent(schoolTermSessionId: string): void {
    this.store.dispatch(SchoolTermSessionAction.setSchoolTermSessionAsCurrent({ schoolTermSessionId }));
  }

  cloneSchoolTermSession(sourceSchoolTermSessionId: string, destinationSchoolTermSessionId: string): void {
    this.store.dispatch(SchoolTermSessionAction.cloneSchoolTermSession({ sourceSchoolTermSessionId, destinationSchoolTermSessionId }));
  }
}
