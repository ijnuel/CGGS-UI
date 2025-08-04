import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TestEntityTemplateState } from './test-entity-template.reducer';

export const selectTestEntityTemplateState = createFeatureSelector<TestEntityTemplateState>('testEntityTemplate');

export const selectTestEntityTemplateAll = createSelector(
  selectTestEntityTemplateState,
  (state) => state.testEntityTemplateAll
);

export const selectTestEntityTemplateList = createSelector(
  selectTestEntityTemplateState,
  (state) => state.testEntityTemplateList
);

export const selectTestEntityTemplateById = createSelector(
  selectTestEntityTemplateState,
  (state) => state.testEntityTemplateById
);

export const selectTestEntityTemplateByProperties = createSelector(
  selectTestEntityTemplateState,
  (state) => state.testEntityTemplateByProperties
);

export const selectTestEntityTemplateExists = createSelector(
  selectTestEntityTemplateState,
  (state) => state.exists
);

export const selectTestEntityTemplateCount = createSelector(
  selectTestEntityTemplateState,
  (state) => state.count
);

export const selectTestEntityTemplateLoading = createSelector(
  selectTestEntityTemplateState,
  (state) => state.loading
);

export const selectTestEntityTemplateError = createSelector(
  selectTestEntityTemplateState,
  (state) => state.error
);

export const selectTestEntityTemplateCreateSuccess = createSelector(
  selectTestEntityTemplateState,
  (state) => state.createSuccess
);

export const selectTestEntityTemplateUpdateSuccess = createSelector(
  selectTestEntityTemplateState,
  (state) => state.updateSuccess
);
