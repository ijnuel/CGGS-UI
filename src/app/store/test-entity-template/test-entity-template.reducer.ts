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
  testEntityTemplateAll: TestEntityTemplateListInterface[] | null;
  testEntityTemplateByProperties: TestEntityTemplateListInterface[] | null;
  testEntityTemplateById: TestEntityTemplateListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TestEntityTemplateState = {
  testEntityTemplateList: null,
  testEntityTemplateAll: null,
  testEntityTemplateByProperties: null,
  testEntityTemplateById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(TestEntityTemplateAction.getTestEntityTemplateAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.getTestEntityTemplateAllSuccess, (state, { payload }) => ({
    ...state,
    testEntityTemplateAll: payload.entity,
    loading: false,
  })),
  on(TestEntityTemplateAction.getTestEntityTemplateAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(TestEntityTemplateAction.getTestEntityTemplateList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.getTestEntityTemplateListSuccess, (state, { payload }) => ({
    ...state,
    testEntityTemplateList: payload.entity,
    loading: false,
  })),
  on(TestEntityTemplateAction.getTestEntityTemplateListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(TestEntityTemplateAction.getTestEntityTemplateById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.getTestEntityTemplateByIdSuccess, (state, { payload }) => ({
    ...state,
    testEntityTemplateById: payload.entity,
    loading: false,
  })),
  on(TestEntityTemplateAction.getTestEntityTemplateByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(TestEntityTemplateAction.getTestEntityTemplateByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.getTestEntityTemplateByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    testEntityTemplateByProperties: payload.entity,
    loading: false,
  })),
  on(TestEntityTemplateAction.getTestEntityTemplateByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(TestEntityTemplateAction.testEntityTemplateExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.testEntityTemplateExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(TestEntityTemplateAction.testEntityTemplateExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(TestEntityTemplateAction.testEntityTemplateCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.testEntityTemplateCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(TestEntityTemplateAction.testEntityTemplateCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(TestEntityTemplateAction.createTestEntityTemplate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.createTestEntityTemplateSuccess, (state, { payload }) => ({
    ...state,
    testEntityTemplateList: state.testEntityTemplateList
      ? {
          ...state.testEntityTemplateList,
          data: [...state.testEntityTemplateList.data, payload.entity],
        }
      : null,
    loading: false,
  })),
  on(TestEntityTemplateAction.createTestEntityTemplateFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(TestEntityTemplateAction.updateTestEntityTemplate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.updateTestEntityTemplateSuccess, (state, { payload }) => ({
    ...state,
    testEntityTemplateList: state.testEntityTemplateList
      ? {
          ...state.testEntityTemplateList,
          data: state.testEntityTemplateList.data.map((item: TestEntityTemplateListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    testEntityTemplateById:
      state.testEntityTemplateById?.id === payload.entity.id
        ? payload.entity
        : state.testEntityTemplateById,
    loading: false,
  })),
  on(TestEntityTemplateAction.updateTestEntityTemplateFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(TestEntityTemplateAction.deleteTestEntityTemplate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.deleteTestEntityTemplateSuccess, (state) => ({
    ...state,
    testEntityTemplateById: null,
    testEntityTemplateList: state.testEntityTemplateList
      ? {
          ...state.testEntityTemplateList,
          data: state.testEntityTemplateList.data.filter((item) => item.id !== state.testEntityTemplateById?.id),
        }
      : null,
    loading: false,
  })),
  on(TestEntityTemplateAction.deleteTestEntityTemplateFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(TestEntityTemplateAction.createManyTestEntityTemplates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.createManyTestEntityTemplatesSuccess, (state, { payload }) => ({
    ...state,
    testEntityTemplateList: state.testEntityTemplateList
      ? {
          ...state.testEntityTemplateList,
          data: [...state.testEntityTemplateList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(TestEntityTemplateAction.createManyTestEntityTemplatesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(TestEntityTemplateAction.updateManyTestEntityTemplates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.updateManyTestEntityTemplatesSuccess, (state, { payload }) => ({
    ...state,
    testEntityTemplateList: state.testEntityTemplateList
      ? {
          ...state.testEntityTemplateList,
          data: state.testEntityTemplateList.data.map((item: TestEntityTemplateListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(TestEntityTemplateAction.updateManyTestEntityTemplatesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(TestEntityTemplateAction.deleteManyTestEntityTemplates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TestEntityTemplateAction.deleteManyTestEntityTemplatesSuccess, (state) => ({
    ...state,
    testEntityTemplateList: null,
    loading: false,
  })),
  on(TestEntityTemplateAction.deleteManyTestEntityTemplatesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectTestEntityTemplateState = createFeatureSelector<TestEntityTemplateState>(
  testEntityTemplateFeatureKey
);

export const getTestEntityTemplateList = (state: TestEntityTemplateState) => state.testEntityTemplateList;
export const getTestEntityTemplateAll = (state: TestEntityTemplateState) => state.testEntityTemplateAll;
export const getTestEntityTemplateByProperties = (state: TestEntityTemplateState) =>
  state.testEntityTemplateByProperties;
export const getTestEntityTemplateById = (state: TestEntityTemplateState) => state.testEntityTemplateById;
export const getExists = (state: TestEntityTemplateState) => state.exists;
export const getCount = (state: TestEntityTemplateState) => state.count;
export const getLoading = (state: TestEntityTemplateState) => state.loading;
export const getError = (state: TestEntityTemplateState) => state.error;
