import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  SessionListInterface,
  SessionFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as SessionAction from './session.actions';
import {
  selectSessionList,
  selectSessionAll,
  selectSessionByProperties,
  selectSessionById,
  selectExists,
  selectCount,
  selectSessionLoading,
  selectSessionError,
  selectSessionCreateSuccess,
  selectSessionUpdateSuccess,
} from './session.selector';
import { SessionState } from './session.reducer';

@Injectable({
  providedIn: 'root',
})
export class SessionFacade {
  sessionList$: Observable<PaginatedResponseInterface<SessionListInterface[]> | null>;
  sessionAll$: Observable<SessionListInterface[] | null>;
  sessionByProperties$: Observable<SessionListInterface[] | null>;
  sessionById$: Observable<SessionListInterface | null>;
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

  constructor(private store: Store<{ session: SessionState }>) {
    this.sessionList$ = this.store.select(selectSessionList);
    this.sessionAll$ = this.store.select(selectSessionAll);
    this.sessionByProperties$ = this.store.select(selectSessionByProperties);
    this.sessionById$ = this.store.select(selectSessionById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectSessionLoading);
    this.error$ = this.store.select(selectSessionError);
    this.createSuccess$ = this.store.select(selectSessionCreateSuccess);
    this.updateSuccess$ = this.store.select(selectSessionUpdateSuccess);
  }

  getSessionList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(SessionAction.getSessionList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getSessionAll(): void {
    this.store.dispatch(SessionAction.getSessionAll());
  }

  getSessionById(sessionId: string): void {
    this.store.dispatch(SessionAction.getSessionById({ sessionId }));
  }

  getSessionByProperties(properties: Partial<SessionFormInterface>): void {
    this.store.dispatch(SessionAction.getSessionByProperties({ properties }));
  }

  sessionExists(properties: Partial<SessionFormInterface>): void {
    this.store.dispatch(SessionAction.sessionExists({ properties }));
  }

  sessionCount(): void {
    this.store.dispatch(SessionAction.sessionCount());
  }

  createSession(session: SessionFormInterface): void {
    this.store.dispatch(SessionAction.createSession({ payload: session }));
  }

  updateSession(session: SessionFormInterface): void {
    this.store.dispatch(SessionAction.updateSession({ payload: session }));
  }

  deleteSession(sessionId: string): void {
    this.store.dispatch(SessionAction.deleteSession({ sessionId }));
  }

  createManySessions(sessions: SessionFormInterface[]): void {
    this.store.dispatch(SessionAction.createManySessions({ payload: sessions }));
  }

  updateManySessions(sessions: SessionFormInterface[]): void {
    this.store.dispatch(SessionAction.updateManySessions({ payload: sessions }));
  }

  deleteManySessions(sessionIds: string[]): void {
    this.store.dispatch(SessionAction.deleteManySessions({ sessionIds }));
  }
}
