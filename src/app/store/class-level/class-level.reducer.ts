import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ClassLevelAction from './class-level.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassLevelListInterface,
} from '../../types';

export const classLevelFeatureKey = 'classLevel';

export interface ClassLevelState {
  classLevelList: PaginatedResponseInterface<ClassLevelListInterface[]> | null;
  classLevelAll: ClassLevelListInterface[] | null;
  classLevelByProperties: ClassLevelListInterface[] | null;
  classLevelById: ClassLevelListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ClassLevelState = {
  classLevelList: null,
  classLevelAll: null,
  classLevelByProperties: null,
  classLevelById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(ClassLevelAction.getClassLevelAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.getClassLevelAllSuccess, (state, { payload }) => ({
    ...state,
    classLevelAll: payload.entity,
    loading: false,
  })),
  on(ClassLevelAction.getClassLevelAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(ClassLevelAction.getClassLevelList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.getClassLevelListSuccess, (state, { payload }) => ({
    ...state,
    classLevelList: payload.entity,
    loading: false,
  })),
  on(ClassLevelAction.getClassLevelListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(ClassLevelAction.getClassLevelById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.getClassLevelByIdSuccess, (state, { payload }) => ({
    ...state,
    classLevelById: payload.entity,
    loading: false,
  })),
  on(ClassLevelAction.getClassLevelByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(ClassLevelAction.getClassLevelByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.getClassLevelByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    classLevelByProperties: payload.entity,
    loading: false,
  })),
  on(ClassLevelAction.getClassLevelByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(ClassLevelAction.classLevelExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.classLevelExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(ClassLevelAction.classLevelExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(ClassLevelAction.classLevelCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.classLevelCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(ClassLevelAction.classLevelCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(ClassLevelAction.createClassLevel, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.createClassLevelSuccess, (state, { payload }) => ({
    ...state,
    classLevelList: state.classLevelList
      ? {
          ...state.classLevelList,
          data: [...state.classLevelList.data, payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ClassLevelAction.createClassLevelFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(ClassLevelAction.updateClassLevel, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.updateClassLevelSuccess, (state, { payload }) => ({
    ...state,
    classLevelList: state.classLevelList
      ? {
          ...state.classLevelList,
          data: state.classLevelList.data.map((item: ClassLevelListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    classLevelById:
      state.classLevelById?.id === payload.entity.id
        ? payload.entity
        : state.classLevelById,
    loading: false,
  })),
  on(ClassLevelAction.updateClassLevelFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(ClassLevelAction.deleteClassLevel, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.deleteClassLevelSuccess, (state) => ({
    ...state,
    classLevelById: null,
    classLevelList: state.classLevelList
      ? {
          ...state.classLevelList,
          data: state.classLevelList.data.filter((item) => item.id !== state.classLevelById?.id),
        }
      : null,
    loading: false,
  })),
  on(ClassLevelAction.deleteClassLevelFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(ClassLevelAction.createManyClassLevels, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.createManyClassLevelsSuccess, (state, { payload }) => ({
    ...state,
    classLevelList: state.classLevelList
      ? {
          ...state.classLevelList,
          data: [...state.classLevelList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(ClassLevelAction.createManyClassLevelsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(ClassLevelAction.updateManyClassLevels, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.updateManyClassLevelsSuccess, (state, { payload }) => ({
    ...state,
    classLevelList: state.classLevelList
      ? {
          ...state.classLevelList,
          data: state.classLevelList.data.map((item: ClassLevelListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(ClassLevelAction.updateManyClassLevelsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(ClassLevelAction.deleteManyClassLevels, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClassLevelAction.deleteManyClassLevelsSuccess, (state) => ({
    ...state,
    classLevelList: null,
    loading: false,
  })),
  on(ClassLevelAction.deleteManyClassLevelsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectClassLevelState = createFeatureSelector<ClassLevelState>(
  classLevelFeatureKey
);

export const getClassLevelList = (state: ClassLevelState) => state.classLevelList;
export const getClassLevelAll = (state: ClassLevelState) => state.classLevelAll;
export const getClassLevelByProperties = (state: ClassLevelState) =>
  state.classLevelByProperties;
export const getClassLevelById = (state: ClassLevelState) => state.classLevelById;
export const getExists = (state: ClassLevelState) => state.exists;
export const getCount = (state: ClassLevelState) => state.count;
export const getLoading = (state: ClassLevelState) => state.loading;
export const getError = (state: ClassLevelState) => state.error;
