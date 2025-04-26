import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as TestEntityTemplateAction from './test-entity-template.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  TestEntityTemplateListInterface,
} from '../../types';

export const testEntityTemplateFeatureKey = 'testEntityTemplate';

export interface TestEntityTemplateState {
  testEntityTemplateList: PaginatedResponseInterface<TestEntityTemplateListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  testEntityTemplateById: TestEntityTemplateListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TestEntityTemplateState = {
  testEntityTemplateList: null,
  pageQuery: null,
  testEntityTemplateById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TestEntityTemplateAction.getTestEntityTemplateList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(TestEntityTemplateAction.getTestEntityTemplateListSuccess, (state, action) => {
    return {
      ...state,
      testEntityTemplateList: action.payload?.entity,
      loading: false,
    };
  }),
  on(TestEntityTemplateAction.getTestEntityTemplateListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getTestEntityTemplateList = (state: TestEntityTemplateState) => state.testEntityTemplateList;

export const getTestEntityTemplateById = (state: TestEntityTemplateState) => state.testEntityTemplateById;

export const getLoading = (state: TestEntityTemplateState) => state.loading;

export const getError = (state: TestEntityTemplateState) => state.error;

export const selectTestEntityTemplateState =
  createFeatureSelector<TestEntityTemplateState>(testEntityTemplateFeatureKey);
