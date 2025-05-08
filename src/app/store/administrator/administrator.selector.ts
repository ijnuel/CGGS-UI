import { createSelector } from '@ngrx/store';
import * as fromAdministrator from './administrator.reducer';
import * as fromApp from '../app.reducer';

export const selectAdministratorState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromAdministrator.administratorFeatureKey]
);

export const selectAdministratorList = createSelector(
  fromAdministrator.selectAdministratorState,
  fromAdministrator.getAdministratorList
);

export const selectAdministratorById = createSelector(
  fromAdministrator.selectAdministratorState,
  fromAdministrator.getAdministratorById
);

export const selectLoading = createSelector(
  fromAdministrator.selectAdministratorState,
  fromAdministrator.getLoading
);

export const selectError = createSelector(
  fromAdministrator.selectAdministratorState,
  fromAdministrator.getError
);
