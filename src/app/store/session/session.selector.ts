import { createSelector } from '@ngrx/store';
import {
  getSessionList,
  getSessionAll,
  getSessionByProperties,
  getSessionById,
  getExists,
  getCount,
  getLoading,
  getError,
  SessionState,
} from './session.reducer';

export const selectSessionState = (state: { session: SessionState }) =>
  state.session;

export const selectSessionList = createSelector(
  selectSessionState,
  getSessionList
);

export const selectSessionAll = createSelector(
  selectSessionState,
  getSessionAll
);

export const selectSessionByProperties = createSelector(
  selectSessionState,
  getSessionByProperties
);

export const selectSessionById = createSelector(
  selectSessionState,
  getSessionById
);

export const selectExists = createSelector(
  selectSessionState,
  getExists
);

export const selectCount = createSelector(
  selectSessionState,
  getCount
);

export const selectSessionLoading = createSelector(
  selectSessionState,
  getLoading
);

export const selectSessionError = createSelector(
  selectSessionState,
  getError
);

export const selectSessionCreateSuccess = createSelector(
    selectSessionState,
    (state) => state.createSuccess
);

export const selectSessionUpdateSuccess = createSelector(
    selectSessionState,
    (state) => state.updateSuccess
);