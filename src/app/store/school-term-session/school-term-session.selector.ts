import { createSelector } from '@ngrx/store';
import {
  getSchoolTermSessionList,
  getSchoolTermSessionAll,
  getSchoolTermSessionByProperties,
  getSchoolTermSessionById,
  getExists,
  getCount,
  getLoading,
  getError,
  SchoolTermSessionState,
} from './school-term-session.reducer';

export const selectSchoolTermSessionState = (state: { schoolTermSession: SchoolTermSessionState }) =>
  state.schoolTermSession;

export const selectSchoolTermSessionList = createSelector(
  selectSchoolTermSessionState,
  getSchoolTermSessionList
);

export const selectSchoolTermSessionAll = createSelector(
  selectSchoolTermSessionState,
  getSchoolTermSessionAll
);

export const selectSchoolTermSessionByProperties = createSelector(
  selectSchoolTermSessionState,
  getSchoolTermSessionByProperties
);

export const selectSchoolTermSessionById = createSelector(
  selectSchoolTermSessionState,
  getSchoolTermSessionById
);

export const selectExists = createSelector(
  selectSchoolTermSessionState,
  getExists
);

export const selectCount = createSelector(
  selectSchoolTermSessionState,
  getCount
);

export const selectSchoolTermSessionLoading = createSelector(
  selectSchoolTermSessionState,
  getLoading
);

export const selectSchoolTermSessionError = createSelector(
  selectSchoolTermSessionState,
  getError
);

export const selectSchoolTermSessionCreateSuccess = createSelector(
    selectSchoolTermSessionState,
    (state) => state.createSuccess
);

export const selectSchoolTermSessionUpdateSuccess = createSelector(
    selectSchoolTermSessionState,
    (state) => state.updateSuccess
);