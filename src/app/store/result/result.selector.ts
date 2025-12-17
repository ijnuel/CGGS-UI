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

export const selectGeneratingStudentResult = createSelector(
  selectResultState,
  (state) => state.generatingStudentResult
);

export const selectGeneratedStudentResult = createSelector(
  selectResultState,
  (state) => state.generatedStudentResult
);

export const selectGenerateStudentResultError = createSelector(
  selectResultState,
  (state) => state.generateStudentResultError
);

export const selectGeneratingBroadSheet = createSelector(
  selectResultState,
  (state) => state.generatingBroadSheet
);

export const selectGeneratedBroadSheet = createSelector(
  selectResultState,
  (state) => state.generatedBroadSheet
);

export const selectGenerateBroadSheetError = createSelector(
  selectResultState,
  (state) => state.generateBroadSheetError
);

export const selectGeneratingClassResult = createSelector(
  selectResultState,
  (state) => state.generatingClassResult
);

export const selectGeneratedClassResult = createSelector(
  selectResultState,
  (state) => state.generatedClassResult
);

export const selectGenerateClassResultError = createSelector(
  selectResultState,
  (state) => state.generateClassResultError
);