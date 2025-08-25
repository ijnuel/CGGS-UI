import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResultState, resultFeatureKey } from './result.reducer';

export const selectResultState = createFeatureSelector<ResultState>(resultFeatureKey);

export const selectResultMarkSheet = createSelector(
  selectResultState,
  (state) => state.resultMarkSheet
);

export const selectResultLoading = createSelector(
  selectResultState,
  (state) => state.loading
);

export const selectResultError = createSelector(
  selectResultState,
  (state) => state.error
); 