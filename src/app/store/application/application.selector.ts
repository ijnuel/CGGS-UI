import { createSelector } from '@ngrx/store';
import {
  getApplicationList,
  getApplicationAll,
  getApplicationByProperties,
  getApplicationById,
  getExists,
  getCount,
  getLoading,
  getError,
  ApplicationState,
} from './application.reducer';

export const selectApplicationState = (state: { application: ApplicationState }) =>
  state.application;

export const selectApplicationList = createSelector(
  selectApplicationState,
  getApplicationList
);

export const selectApplicationAll = createSelector(
  selectApplicationState,
  getApplicationAll
);

export const selectApplicationByProperties = createSelector(
  selectApplicationState,
  getApplicationByProperties
);

export const selectApplicationById = createSelector(
  selectApplicationState,
  getApplicationById
);

export const selectExists = createSelector(
  selectApplicationState,
  getExists
);

export const selectCount = createSelector(
  selectApplicationState,
  getCount
);

export const selectApplicationLoading = createSelector(
  selectApplicationState,
  getLoading
);

export const selectApplicationError = createSelector(
  selectApplicationState,
  getError
);

export const selectApplicationCreateSuccess = createSelector(
    selectApplicationState,
    (state) => state.createSuccess
);

export const selectApplicationUpdateSuccess = createSelector(
    selectApplicationState,
    (state) => state.updateSuccess
);