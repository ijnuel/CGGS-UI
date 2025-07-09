import { createSelector } from '@ngrx/store';
import {
  getStateList,
  getStateAll,
  getStateByProperties,
  getStateById,
  getExists,
  getCount,
  getLoading,
  getError,
  StateState,
} from './state.reducer';

export const selectStateState = (state: { state: StateState }) =>
  state.state;

export const selectStateList = createSelector(
  selectStateState,
  getStateList
);

export const selectStateAll = createSelector(
  selectStateState,
  getStateAll
);

export const selectStateByProperties = createSelector(
  selectStateState,
  getStateByProperties
);

export const selectStateById = createSelector(
  selectStateState,
  getStateById
);

export const selectExists = createSelector(
  selectStateState,
  getExists
);

export const selectCount = createSelector(
  selectStateState,
  getCount
);

export const selectStateLoading = createSelector(
  selectStateState,
  getLoading
);

export const selectStateError = createSelector(
  selectStateState,
  getError
);

export const selectStateCreateSuccess = createSelector(
    selectStateState,
    (state) => state.createSuccess
);

export const selectStateUpdateSuccess = createSelector(
    selectStateState,
    (state) => state.updateSuccess
);