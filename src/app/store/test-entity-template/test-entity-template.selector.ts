import { createSelector } from '@ngrx/store';
import {
  getTestEntityTemplateList,
  getTestEntityTemplateAll,
  getTestEntityTemplateByProperties,
  getTestEntityTemplateById,
  getExists,
  getCount,
  getLoading,
  getError,
  TestEntityTemplateState,
} from './test-entity-template.reducer';

export const selectTestEntityTemplateState = (state: { testEntityTemplate: TestEntityTemplateState }) =>
  state.testEntityTemplate;

export const selectTestEntityTemplateList = createSelector(
  selectTestEntityTemplateState,
  getTestEntityTemplateList
);

export const selectTestEntityTemplateAll = createSelector(
  selectTestEntityTemplateState,
  getTestEntityTemplateAll
);

export const selectTestEntityTemplateByProperties = createSelector(
  selectTestEntityTemplateState,
  getTestEntityTemplateByProperties
);

export const selectTestEntityTemplateById = createSelector(
  selectTestEntityTemplateState,
  getTestEntityTemplateById
);

export const selectExists = createSelector(
  selectTestEntityTemplateState,
  getExists
);

export const selectCount = createSelector(
  selectTestEntityTemplateState,
  getCount
);

export const selectTestEntityTemplateLoading = createSelector(
  selectTestEntityTemplateState,
  getLoading
);

export const selectTestEntityTemplateError = createSelector(
  selectTestEntityTemplateState,
  getError
);

export const selectTestEntityTemplateCreateSuccess = createSelector(
  selectTestEntityTemplateState,
  (state) => state.createSuccess
);

export const selectTestEntityTemplateUpdateSuccess = createSelector(
  selectTestEntityTemplateState,
  (state) => state.updateSuccess
);
