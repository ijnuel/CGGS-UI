import { createSelector } from '@ngrx/store';
import * as fromApplication from './application.reducer';
import * as fromApp from '../app.reducer';

export const selectApplicationState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromApplication.applicationFeatureKey]
);

export const selectApplicationList = createSelector(
  fromApplication.selectApplicationState,
  fromApplication.getApplicationList
);

export const selectApplicationById = createSelector(
  fromApplication.selectApplicationState,
  fromApplication.getApplicationById
);

export const selectLoading = createSelector(
  fromApplication.selectApplicationState,
  fromApplication.getLoading
);

export const selectError = createSelector(
  fromApplication.selectApplicationState,
  fromApplication.getError
);
