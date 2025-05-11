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
  pageQuery: PageQueryInterface | null;
  classLevelById: ClassLevelListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ClassLevelState = {
  classLevelList: null,
  pageQuery: null,
  classLevelById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ClassLevelAction.getClassLevelList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(ClassLevelAction.getClassLevelListSuccess, (state, action) => {
    return {
      ...state,
      classLevelList: action.payload?.entity,
      loading: false,
    };
  }),
  on(ClassLevelAction.getClassLevelListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getClassLevelList = (state: ClassLevelState) => state.classLevelList;

export const getClassLevelById = (state: ClassLevelState) => state.classLevelById;

export const getLoading = (state: ClassLevelState) => state.loading;

export const getError = (state: ClassLevelState) => state.error;

export const selectClassLevelState =
  createFeatureSelector<ClassLevelState>(classLevelFeatureKey);
