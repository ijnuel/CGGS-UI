import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as StudentClassAction from './student-class.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentClassListInterface,
} from '../../types';

export const studentClassFeatureKey = 'studentClass';

export interface StudentClassState {
  studentClassList: PaginatedResponseInterface<StudentClassListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  studentClassById: StudentClassListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: StudentClassState = {
  studentClassList: null,
  pageQuery: null,
  studentClassById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentClassAction.getStudentClassList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(StudentClassAction.getStudentClassListSuccess, (state, action) => {
    return {
      ...state,
      studentClassList: action.payload?.entity,
      loading: false,
    };
  }),
  on(StudentClassAction.getStudentClassListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getStudentClassList = (state: StudentClassState) => state.studentClassList;

export const getStudentClassById = (state: StudentClassState) => state.studentClassById;

export const getLoading = (state: StudentClassState) => state.loading;

export const getError = (state: StudentClassState) => state.error;

export const selectStudentClassState =
  createFeatureSelector<StudentClassState>(studentClassFeatureKey);
