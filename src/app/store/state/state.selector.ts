import { createSelector } from '@ngrx/store';
import * as fromState from './state.reducer';
import * as fromApp from '../app.reducer';

export const selectStateState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromState.stateFeatureKey]
);

export const selectStateList = createSelector(
  fromState.selectStateState,
  fromState.getStateList
);

export const selectStateById = createSelector(
  fromState.selectStateState,
  fromState.getStateById
);

export const selectLoading = createSelector(
  fromState.selectStateState,
  fromState.getLoading
);

export const selectError = createSelector(
  fromState.selectStateState,
  fromState.getError
);
