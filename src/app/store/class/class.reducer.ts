import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ClassAction from './class.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassListInterface,
} from '../../types';

export const classFeatureKey = 'class';

export interface ClassState {
  classList: PaginatedResponseInterface<ClassListInterface[]> | null;
  classAll: ClassListInterface[] | null;
  classByProperties: ClassListInterface[] | null;
  classById: ClassListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: ClassState = {
  classList: null,
  classAll: null,
  classByProperties: null,
  classById: null,
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
  on(ClassAction.getClassAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.getClassAllSuccess, (state, { payload }) => ({
    ...state,
    classAll: payload.entity,
    loading: false,
  })),
  on(ClassAction.getClassAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(ClassAction.getClassList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(ClassAction.getClassListSuccess, (state, { payload }) => ({
    ...state,
    classList: payload.entity,
    loading: false,
  })),
  on(ClassAction.getClassListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(ClassAction.getClassById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.getClassByIdSuccess, (state, { payload }) => ({
    ...state,
    classById: payload.entity,
    loading: false,
  })),
  on(ClassAction.getClassByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(ClassAction.getClassByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.getClassByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    classByProperties: payload.entity,
    loading: false,
  })),
  on(ClassAction.getClassByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(ClassAction.classExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.classExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(ClassAction.classExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(ClassAction.classCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.classCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(ClassAction.classCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(ClassAction.createClass, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(ClassAction.createClassSuccess, (state, { payload }) => ({
    ...state,
    classList: state.classList
      ? {
          ...state.classList,
          data: [...state.classList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(ClassAction.createClassFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(ClassAction.updateClass, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(ClassAction.updateClassSuccess, (state, { payload }) => ({
    ...state,
    classList: state.classList
      ? {
          ...state.classList,
          data: state.classList.data.map((item: ClassListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    classById:
      state.classById?.id === payload.entity.id
        ? payload.entity
        : state.classById,
    loading: false,
    updateSuccess: true,
  })),
  on(ClassAction.updateClassFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(ClassAction.deleteClass, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.deleteClassSuccess, (state) => ({
    ...state,
    classById: null,
    classList: state.classList
      ? {
          ...state.classList,
          data: state.classList.data.filter((item) => item.id !== state.classById?.id),
        }
      : null,
    loading: false,
  })),
  on(ClassAction.deleteClassFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(ClassAction.createManyClasss, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.createManyClasssSuccess, (state, { payload }) => ({
    ...state,
    classList: state.classList
      ? {
          ...state.classList,
          data: [...state.classList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ClassAction.createManyClasssFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(ClassAction.updateManyClasss, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.updateManyClasssSuccess, (state, { payload }) => ({
    ...state,
    classList: state.classList
      ? {
          ...state.classList,
          data: state.classList.data.map((item: ClassListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(ClassAction.updateManyClasssFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(ClassAction.deleteManyClasss, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassAction.deleteManyClasssSuccess, (state) => ({
    ...state,
    classList: null,
    loading: false,
  })),
  on(ClassAction.deleteManyClasssFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectClassState = createFeatureSelector<ClassState>(
  classFeatureKey
);

export const getClassList = (state: ClassState) => state.classList;
export const getClassAll = (state: ClassState) => state.classAll;
export const getClassByProperties = (state: ClassState) =>
  state.classByProperties;
export const getClassById = (state: ClassState) => state.classById;
export const getExists = (state: ClassState) => state.exists;
export const getCount = (state: ClassState) => state.count;
export const getLoading = (state: ClassState) => state.loading;
export const getError = (state: ClassState) => state.error;
export const getCreateSuccess = (state: ClassState) => state.createSuccess;
export const getUpdateSuccess = (state: ClassState) => state.updateSuccess;
