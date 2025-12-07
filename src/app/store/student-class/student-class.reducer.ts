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
  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
}

export const initialState: StudentClassState = {
  studentClassList: null,
  pageQuery: null,
  studentClassById: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

export const reducer = createReducer(
  initialState,
  on(StudentClassAction.getStudentClassList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
      createSuccess: false,
      updateSuccess: false,
      deleteSuccess: false,
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
  }),
  on(StudentClassAction.createStudentClass, (state) => {
    return {
      ...state,
      loading: true,
      createSuccess: false,
    };
  }),
  on(StudentClassAction.createStudentClassSuccess, (state) => {
    return {
      ...state,
      loading: false,
      createSuccess: true,
    };
  }),
  on(StudentClassAction.createStudentClassFail, (state, action) => {
    return {
      ...state,
      loading: false,
      createSuccess: false,
      error: action.error,
    };
  }),
  on(StudentClassAction.editStudentClass, (state) => {
    return {
      ...state,
      loading: true,
      updateSuccess: false,
    };
  }),
  on(StudentClassAction.editStudentClassSuccess, (state) => {
    return {
      ...state,
      loading: false,
      updateSuccess: true,
    };
  }),
  on(StudentClassAction.editStudentClassFail, (state, action) => {
    return {
      ...state,
      loading: false,
      updateSuccess: false,
      error: action.error,
    };
  }),
  on(StudentClassAction.deleteStudentClass, (state) => {
    return {
      ...state,
      loading: true,
      deleteSuccess: false,
    };
  }),
  on(StudentClassAction.deleteStudentClassSuccess, (state) => {
    return {
      ...state,
      loading: false,
      deleteSuccess: true,
    };
  }),
  on(StudentClassAction.deleteStudentClassFail, (state, action) => {
    return {
      ...state,
      loading: false,
      deleteSuccess: false,
      error: action.error,
    };
  })
);

export const getStudentClassList = (state: StudentClassState) => state.studentClassList;

export const getStudentClassById = (state: StudentClassState) => state.studentClassById;

export const getLoading = (state: StudentClassState) => state.loading;

export const getError = (state: StudentClassState) => state.error;

export const getCreateSuccess = (state: StudentClassState) => state.createSuccess;

export const getUpdateSuccess = (state: StudentClassState) => state.updateSuccess;

export const getDeleteSuccess = (state: StudentClassState) => state.deleteSuccess;

export const selectStudentClassState =
  createFeatureSelector<StudentClassState>(studentClassFeatureKey);
