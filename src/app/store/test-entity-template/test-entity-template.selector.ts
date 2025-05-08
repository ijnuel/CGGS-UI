import { createSelector } from '@ngrx/store';
import * as fromTestEntityTemplate from './test-entity-template.reducer';
import * as fromApp from '../app.reducer';

export const selectTestEntityTemplateState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromTestEntityTemplate.testEntityTemplateFeatureKey]
);

export const selectTestEntityTemplateList = createSelector(
  fromTestEntityTemplate.selectTestEntityTemplateState,
  fromTestEntityTemplate.getTestEntityTemplateList
);

export const selectTestEntityTemplateById = createSelector(
  fromTestEntityTemplate.selectTestEntityTemplateState,
  fromTestEntityTemplate.getTestEntityTemplateById
);

export const selectLoading = createSelector(
  fromTestEntityTemplate.selectTestEntityTemplateState,
  fromTestEntityTemplate.getLoading
);

export const selectError = createSelector(
  fromTestEntityTemplate.selectTestEntityTemplateState,
  fromTestEntityTemplate.getError
);
