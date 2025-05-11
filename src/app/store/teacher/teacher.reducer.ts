import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as TeacherAction from './teacher.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  TeacherListInterface,
} from '../../types';

export const teacherFeatureKey = 'teacher';

export interface TeacherState {
  teacherList: PaginatedResponseInterface<TeacherListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  teacherById: TeacherListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TeacherState = {
  teacherList: null,
  pageQuery: null,
  teacherById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TeacherAction.getTeacherList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(TeacherAction.getTeacherListSuccess, (state, action) => {
    return {
      ...state,
      teacherList: action.payload?.entity,
      loading: false,
    };
  }),
  on(TeacherAction.getTeacherListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getTeacherList = (state: TeacherState) => state.teacherList;

export const getTeacherById = (state: TeacherState) => state.teacherById;

export const getLoading = (state: TeacherState) => state.loading;

export const getError = (state: TeacherState) => state.error;

export const selectTeacherState =
  createFeatureSelector<TeacherState>(teacherFeatureKey);
