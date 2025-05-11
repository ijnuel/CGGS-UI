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
  pageQuery: PageQueryInterface | null;
  classById: ClassListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ClassState = {
  classList: null,
  pageQuery: null,
  classById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ClassAction.getClassList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(ClassAction.getClassListSuccess, (state, action) => {
    return {
      ...state,
      classList: action.payload?.entity,
      loading: false,
    };
  }),
  on(ClassAction.getClassListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getClassList = (state: ClassState) => state.classList;

export const getClassById = (state: ClassState) => state.classById;

export const getLoading = (state: ClassState) => state.loading;

export const getError = (state: ClassState) => state.error;

export const selectClassState =
  createFeatureSelector<ClassState>(classFeatureKey);
