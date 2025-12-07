import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ClassSubjectAssessmentAction from './class-subject-assessment.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassSubjectAssessmentListInterface,
} from '../../types';

export const classSubjectAssessmentFeatureKey = 'classSubjectAssessment';

export interface ClassSubjectAssessmentState {
  classSubjectAssessmentList: PaginatedResponseInterface<ClassSubjectAssessmentListInterface[]> | null;
  classSubjectAssessmentAll: ClassSubjectAssessmentListInterface[] | null;
  classSubjectAssessmentByProperties: ClassSubjectAssessmentListInterface[] | null;
  classSubjectAssessmentById: ClassSubjectAssessmentListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: ClassSubjectAssessmentState = {
  classSubjectAssessmentList: null,
  classSubjectAssessmentAll: null,
  classSubjectAssessmentByProperties: null,
  classSubjectAssessmentById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentAll, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentAllSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAssessmentAll: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentListSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAssessmentList: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentById, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentByIdSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAssessmentById: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  })),
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAssessmentByProperties: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.getClassSubjectAssessmentByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(ClassSubjectAssessmentAction.classSubjectAssessmentExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAssessmentAction.classSubjectAssessmentExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.classSubjectAssessmentExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(ClassSubjectAssessmentAction.classSubjectAssessmentCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAssessmentAction.classSubjectAssessmentCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.classSubjectAssessmentCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(ClassSubjectAssessmentAction.createClassSubjectAssessment, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(ClassSubjectAssessmentAction.createClassSubjectAssessmentSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAssessmentList: state.classSubjectAssessmentList
      ? {
          ...state.classSubjectAssessmentList,
          data: [...state.classSubjectAssessmentList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(ClassSubjectAssessmentAction.createClassSubjectAssessmentFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(ClassSubjectAssessmentAction.updateClassSubjectAssessment, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(ClassSubjectAssessmentAction.updateClassSubjectAssessmentSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAssessmentList: state.classSubjectAssessmentList
      ? {
          ...state.classSubjectAssessmentList,
          data: state.classSubjectAssessmentList.data.map((item: ClassSubjectAssessmentListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    classSubjectAssessmentById:
      state.classSubjectAssessmentById?.id === payload.entity.id
        ? payload.entity
        : state.classSubjectAssessmentById,
    loading: false,
    updateSuccess: true,
  })),
  on(ClassSubjectAssessmentAction.updateClassSubjectAssessmentFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(ClassSubjectAssessmentAction.deleteClassSubjectAssessment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAssessmentAction.deleteClassSubjectAssessmentSuccess, (state) => ({
    ...state,
    classSubjectAssessmentById: null,
    classSubjectAssessmentList: state.classSubjectAssessmentList
      ? {
          ...state.classSubjectAssessmentList,
          data: state.classSubjectAssessmentList.data.filter((item) => item.id !== state.classSubjectAssessmentById?.id),
        }
      : null,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.deleteClassSubjectAssessmentFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(ClassSubjectAssessmentAction.createManyClassSubjectAssessments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAssessmentAction.createManyClassSubjectAssessmentsSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAssessmentList: state.classSubjectAssessmentList
      ? {
          ...state.classSubjectAssessmentList,
          data: [...state.classSubjectAssessmentList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.createManyClassSubjectAssessmentsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(ClassSubjectAssessmentAction.updateManyClassSubjectAssessments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAssessmentAction.updateManyClassSubjectAssessmentsSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAssessmentList: state.classSubjectAssessmentList
      ? {
          ...state.classSubjectAssessmentList,
          data: state.classSubjectAssessmentList.data.map((item: ClassSubjectAssessmentListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.updateManyClassSubjectAssessmentsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(ClassSubjectAssessmentAction.deleteManyClassSubjectAssessments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAssessmentAction.deleteManyClassSubjectAssessmentsSuccess, (state) => ({
    ...state,
    classSubjectAssessmentList: null,
    loading: false,
  })),
  on(ClassSubjectAssessmentAction.deleteManyClassSubjectAssessmentsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectClassSubjectAssessmentState = createFeatureSelector<ClassSubjectAssessmentState>(
  classSubjectAssessmentFeatureKey
);

export const getClassSubjectAssessmentList = (state: ClassSubjectAssessmentState) => state.classSubjectAssessmentList;
export const getClassSubjectAssessmentAll = (state: ClassSubjectAssessmentState) => state.classSubjectAssessmentAll;
export const getClassSubjectAssessmentByProperties = (state: ClassSubjectAssessmentState) =>
  state.classSubjectAssessmentByProperties;
export const getClassSubjectAssessmentById = (state: ClassSubjectAssessmentState) => state.classSubjectAssessmentById;
export const getExists = (state: ClassSubjectAssessmentState) => state.exists;
export const getCount = (state: ClassSubjectAssessmentState) => state.count;
export const getLoading = (state: ClassSubjectAssessmentState) => state.loading;
export const getError = (state: ClassSubjectAssessmentState) => state.error;
export const getCreateSuccess = (state: ClassSubjectAssessmentState) => state.createSuccess;
export const getUpdateSuccess = (state: ClassSubjectAssessmentState) => state.updateSuccess;
