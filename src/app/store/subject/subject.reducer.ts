import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as SubjectAction from './subject.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  SubjectListInterface,
} from '../../types';

export const subjectFeatureKey = 'subject';

export interface SubjectState {
  subjectList: PaginatedResponseInterface<SubjectListInterface[]> | null;
  subjectAll: SubjectListInterface[] | null;
  subjectByProperties: SubjectListInterface[] | null;
  subjectById: SubjectListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: SubjectState = {
  subjectList: null,
  subjectAll: null,
  subjectByProperties: null,
  subjectById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(SubjectAction.getSubjectAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.getSubjectAllSuccess, (state, { payload }) => ({
    ...state,
    subjectAll: payload.entity,
    loading: false,
  })),
  on(SubjectAction.getSubjectAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(SubjectAction.getSubjectList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(SubjectAction.getSubjectListSuccess, (state, { payload }) => ({
    ...state,
    subjectList: payload.entity,
    loading: false,
  })),
  on(SubjectAction.getSubjectListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(SubjectAction.getSubjectById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.getSubjectByIdSuccess, (state, { payload }) => ({
    ...state,
    subjectById: payload.entity,
    loading: false,
  })),
  on(SubjectAction.getSubjectByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(SubjectAction.getSubjectByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.getSubjectByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    subjectByProperties: payload.entity,
    loading: false,
  })),
  on(SubjectAction.getSubjectByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(SubjectAction.subjectExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.subjectExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(SubjectAction.subjectExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(SubjectAction.subjectCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.subjectCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(SubjectAction.subjectCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(SubjectAction.createSubject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.createSubjectSuccess, (state, { payload }) => ({
    ...state,
    subjectList: state.subjectList
      ? {
          ...state.subjectList,
          data: [...state.subjectList.data, payload.entity],
        }
      : null,
    loading: false,
  })),
  on(SubjectAction.createSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(SubjectAction.updateSubject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.updateSubjectSuccess, (state, { payload }) => ({
    ...state,
    subjectList: state.subjectList
      ? {
          ...state.subjectList,
          data: state.subjectList.data.map((item: SubjectListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    subjectById:
      state.subjectById?.id === payload.entity.id
        ? payload.entity
        : state.subjectById,
    loading: false,
  })),
  on(SubjectAction.updateSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(SubjectAction.deleteSubject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.deleteSubjectSuccess, (state) => ({
    ...state,
    subjectById: null,
    subjectList: state.subjectList
      ? {
          ...state.subjectList,
          data: state.subjectList.data.filter((item) => item.id !== state.subjectById?.id),
        }
      : null,
    loading: false,
  })),
  on(SubjectAction.deleteSubjectFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(SubjectAction.createManySubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.createManySubjectsSuccess, (state, { payload }) => ({
    ...state,
    subjectList: state.subjectList
      ? {
          ...state.subjectList,
          data: [...state.subjectList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(SubjectAction.createManySubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(SubjectAction.updateManySubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.updateManySubjectsSuccess, (state, { payload }) => ({
    ...state,
    subjectList: state.subjectList
      ? {
          ...state.subjectList,
          data: state.subjectList.data.map((item: SubjectListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(SubjectAction.updateManySubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(SubjectAction.deleteManySubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectAction.deleteManySubjectsSuccess, (state) => ({
    ...state,
    subjectList: null,
    loading: false,
  })),
  on(SubjectAction.deleteManySubjectsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectSubjectState = createFeatureSelector<SubjectState>(
  subjectFeatureKey
);

export const getSubjectList = (state: SubjectState) => state.subjectList;
export const getSubjectAll = (state: SubjectState) => state.subjectAll;
export const getSubjectByProperties = (state: SubjectState) =>
  state.subjectByProperties;
export const getSubjectById = (state: SubjectState) => state.subjectById;
export const getExists = (state: SubjectState) => state.exists;
export const getCount = (state: SubjectState) => state.count;
export const getLoading = (state: SubjectState) => state.loading;
export const getError = (state: SubjectState) => state.error;
