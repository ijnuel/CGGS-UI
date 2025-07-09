import { createSelector } from '@ngrx/store';
import {
  getAdministratorList,
  getAdministratorAll,
  getAdministratorByProperties,
  getAdministratorById,
  getExists,
  getCount,
  getLoading,
  getError,
  AdministratorState,
} from './administrator.reducer';

export const selectAdministratorState = (state: { administrator: AdministratorState }) =>
  state.administrator;

export const selectAdministratorList = createSelector(
  selectAdministratorState,
  getAdministratorList
);

export const selectAdministratorAll = createSelector(
  selectAdministratorState,
  getAdministratorAll
);

export const selectAdministratorByProperties = createSelector(
  selectAdministratorState,
  getAdministratorByProperties
);

export const selectAdministratorById = createSelector(
  selectAdministratorState,
  getAdministratorById
);

export const selectExists = createSelector(
  selectAdministratorState,
  getExists
);

export const selectCount = createSelector(
  selectAdministratorState,
  getCount
);

export const selectAdministratorLoading = createSelector(
  selectAdministratorState,
  getLoading
);

export const selectAdministratorError = createSelector(
  selectAdministratorState,
  getError
);

export const selectAdministratorCreateSuccess = createSelector(
    selectAdministratorState,
    (state) => state.createSuccess
);

export const selectAdministratorUpdateSuccess = createSelector(
    selectAdministratorState,
    (state) => state.updateSuccess
);