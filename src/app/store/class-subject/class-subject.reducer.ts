import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ClassSubjectAction from './class-subject.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassSubjectListInterface,
} from '../../types';

export const classSubjectFeatureKey = 'classSubject';

export interface ClassSubjectState {
  classSubjectList: PaginatedResponseInterface<ClassSubjectListInterface[]> | null;
  classSubjectAll: ClassSubjectListInterface[] | null;
  classSubjectByProperties: ClassSubjectListInterface[] | null;
  classSubjectById: ClassSubjectListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ClassSubjectState = {
  classSubjectList: null,
  classSubjectAll: null,
  classSubjectByProperties: null,
  classSubjectById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(ClassSubjectAction.getClassSubjectAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.getClassSubjectAllSuccess, (state, { payload }) => ({
    ...state,
    classSubjectAll: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAction.getClassSubjectAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(ClassSubjectAction.getClassSubjectList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.getClassSubjectListSuccess, (state, { payload }) => ({
    ...state,
    classSubjectList: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAction.getClassSubjectListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(ClassSubjectAction.getClassSubjectById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.getClassSubjectByIdSuccess, (state, { payload }) => ({
    ...state,
    classSubjectById: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAction.getClassSubjectByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(ClassSubjectAction.getClassSubjectByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.getClassSubjectByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    classSubjectByProperties: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAction.getClassSubjectByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(ClassSubjectAction.classSubjectExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.classSubjectExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAction.classSubjectExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(ClassSubjectAction.classSubjectCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.classSubjectCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(ClassSubjectAction.classSubjectCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(ClassSubjectAction.createClassSubject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.createClassSubjectSuccess, (state, { payload }) => ({
    ...state,
    classSubjectList: state.classSubjectList
      ? {
          ...state.classSubjectList,
          data: [...state.classSubjectList.data, payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ClassSubjectAction.createClassSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(ClassSubjectAction.updateClassSubject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.updateClassSubjectSuccess, (state, { payload }) => ({
    ...state,
    classSubjectList: state.classSubjectList
      ? {
          ...state.classSubjectList,
          data: state.classSubjectList.data.map((item: ClassSubjectListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    classSubjectById:
      state.classSubjectById?.id === payload.entity.id
        ? payload.entity
        : state.classSubjectById,
    loading: false,
  })),
  on(ClassSubjectAction.updateClassSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(ClassSubjectAction.deleteClassSubject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.deleteClassSubjectSuccess, (state) => ({
    ...state,
    classSubjectById: null,
    classSubjectList: state.classSubjectList
      ? {
          ...state.classSubjectList,
          data: state.classSubjectList.data.filter((item) => item.id !== state.classSubjectById?.id),
        }
      : null,
    loading: false,
  })),
  on(ClassSubjectAction.deleteClassSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(ClassSubjectAction.createManyClassSubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.createManyClassSubjectsSuccess, (state, { payload }) => ({
    ...state,
    classSubjectList: state.classSubjectList
      ? {
          ...state.classSubjectList,
          data: [...state.classSubjectList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ClassSubjectAction.createManyClassSubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(ClassSubjectAction.updateManyClassSubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.updateManyClassSubjectsSuccess, (state, { payload }) => ({
    ...state,
    classSubjectList: state.classSubjectList
      ? {
          ...state.classSubjectList,
          data: state.classSubjectList.data.map((item: ClassSubjectListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(ClassSubjectAction.updateManyClassSubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(ClassSubjectAction.deleteManyClassSubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassSubjectAction.deleteManyClassSubjectsSuccess, (state) => ({
    ...state,
    classSubjectList: null,
    loading: false,
  })),
  on(ClassSubjectAction.deleteManyClassSubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectClassSubjectState = createFeatureSelector<ClassSubjectState>(
  classSubjectFeatureKey
);

export const getClassSubjectList = (state: ClassSubjectState) => state.classSubjectList;
export const getClassSubjectAll = (state: ClassSubjectState) => state.classSubjectAll;
export const getClassSubjectByProperties = (state: ClassSubjectState) =>
  state.classSubjectByProperties;
export const getClassSubjectById = (state: ClassSubjectState) => state.classSubjectById;
export const getExists = (state: ClassSubjectState) => state.exists;
export const getCount = (state: ClassSubjectState) => state.count;
export const getLoading = (state: ClassSubjectState) => state.loading;
export const getError = (state: ClassSubjectState) => state.error;
