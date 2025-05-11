import { createSelector } from '@ngrx/store';
import * as fromSession from './session.reducer';
import * as fromApp from '../app.reducer';

export const selectSessionState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromSession.sessionFeatureKey]
);

export const selectSessionList = createSelector(
  fromSession.selectSessionState,
  fromSession.getSessionList
);

export const selectSessionById = createSelector(
  fromSession.selectSessionState,
  fromSession.getSessionById
);

export const selectLoading = createSelector(
  fromSession.selectSessionState,
  fromSession.getLoading
);

export const selectError = createSelector(
  fromSession.selectSessionState,
  fromSession.getError
);
