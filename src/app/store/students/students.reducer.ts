import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as StudentsAction from './students.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentsListInterface,
} from '../../types';

export const studentsFeatureKey = 'students';

export interface StudentsState {
  studentsList: PaginatedResponseInterface<StudentsListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  studentById: StudentsListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: StudentsState = {
  studentsList: null,
  pageQuery: null,
  studentById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentsAction.getStudentsList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(StudentsAction.getStudentsListSuccess, (state, action) => {
    return {
      ...state,
      studentsList: action.payload?.entity,
      loading: false,
    };
  }),
  on(StudentsAction.getStudentsListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getStudentList = (state: StudentsState) => state.studentsList;

export const getStudentById = (state: StudentsState) => state.studentById;

export const getLoading = (state: StudentsState) => state.loading;

export const getError = (state: StudentsState) => state.error;

export const selectStudentState =
  createFeatureSelector<StudentsState>(studentsFeatureKey);
