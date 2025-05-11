import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as SessionActions from './session.actions';
import * as SessionSelector from './session.selector';
import { PageQueryInterface, SessionFormInterface } from '../../types';

@Injectable()
export class SessionFacade {
  selectSessionList$ = this.store.pipe(
    select(SessionSelector.selectSessionList)
  );

  selectSessionById$ = this.store.pipe(
    select(SessionSelector.selectSessionById)
  );

  selectedLoading$ = this.store.pipe(select(SessionSelector.selectLoading));

  selectedError$ = this.store.pipe(select(SessionSelector.selectError));

  constructor(private readonly store: Store) {}

  getSessionList(pageQuery: PageQueryInterface) {
    this.store.dispatch(SessionActions.getSessionList({ pageQuery }));
  }

  getSessionById(sessionId: string) {
    this.store.dispatch(SessionActions.getSessionById({ sessionId }));
  }

  createSession(payload: SessionFormInterface) {
    this.store.dispatch(SessionActions.createSession({ payload }));
  }

  updateSession(payload: SessionFormInterface) {
    this.store.dispatch(SessionActions.editSession({ payload }));
  }
}
