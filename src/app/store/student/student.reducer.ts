import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as StudentAction from './student.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentListInterface,
} from '../../types';

export const studentFeatureKey = 'student';

export interface StudentState {
  studentList: PaginatedResponseInterface<StudentListInterface[]> | null;
  studentAll: StudentListInterface[] | null;
  studentsWithoutClass: StudentListInterface[] | null;
  studentByProperties: StudentListInterface[] | null;
  studentById: StudentListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: StudentState = {
  studentList: null,
  studentAll: null,
  studentsWithoutClass: null,
  studentByProperties: null,
  studentById: null,
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
  on(StudentAction.getStudentAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.getStudentAllSuccess, (state, { payload }) => ({
    ...state,
    studentAll: payload.entity,
    loading: false,
  })),
  on(StudentAction.getStudentAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Students Without Class
  on(StudentAction.getStudentsWithoutClass, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.getStudentsWithoutClassSuccess, (state, { payload }) => ({
    ...state,
    studentsWithoutClass: payload.entity,
    loading: false,
  })),
  on(StudentAction.getStudentsWithoutClassFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(StudentAction.getStudentList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(StudentAction.getStudentListSuccess, (state, { payload }) => ({
    ...state,
    studentList: payload.entity,
    loading: false,
  })),
  on(StudentAction.getStudentListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(StudentAction.getStudentById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.getStudentByIdSuccess, (state, { payload }) => ({
    ...state,
    studentById: payload.entity,
    loading: false,
  })),
  on(StudentAction.getStudentByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(StudentAction.getStudentByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.getStudentByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    studentByProperties: payload.entity,
    loading: false,
  })),
  on(StudentAction.getStudentByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(StudentAction.studentExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.studentExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(StudentAction.studentExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(StudentAction.studentCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.studentCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(StudentAction.studentCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(StudentAction.createStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(StudentAction.createStudentSuccess, (state, { payload }) => ({
    ...state,
    studentList: state.studentList
      ? {
          ...state.studentList,
          data: [...state.studentList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(StudentAction.createStudentFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(StudentAction.updateStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(StudentAction.updateStudentSuccess, (state, { payload }) => ({
    ...state,
    studentList: state.studentList
      ? {
          ...state.studentList,
          data: state.studentList.data.map((item: StudentListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    studentById:
      state.studentById?.id === payload.entity.id
        ? payload.entity
        : state.studentById,
    loading: false,
    updateSuccess: true,
  })),
  on(StudentAction.updateStudentFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(StudentAction.deleteStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.deleteStudentSuccess, (state) => ({
    ...state,
    studentById: null,
    studentList: state.studentList
      ? {
          ...state.studentList,
          data: state.studentList.data.filter((item) => item.id !== state.studentById?.id),
        }
      : null,
    loading: false,
  })),
  on(StudentAction.deleteStudentFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(StudentAction.createManyStudents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.createManyStudentsSuccess, (state, { payload }) => ({
    ...state,
    studentList: state.studentList
      ? {
          ...state.studentList,
          data: [...state.studentList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(StudentAction.createManyStudentsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(StudentAction.updateManyStudents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.updateManyStudentsSuccess, (state, { payload }) => ({
    ...state,
    studentList: state.studentList
      ? {
          ...state.studentList,
          data: state.studentList.data.map((item: StudentListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(StudentAction.updateManyStudentsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(StudentAction.deleteManyStudents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentAction.deleteManyStudentsSuccess, (state) => ({
    ...state,
    studentList: null,
    loading: false,
  })),
  on(StudentAction.deleteManyStudentsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectStudentState = createFeatureSelector<StudentState>(
  studentFeatureKey
);

export const getStudentList = (state: StudentState) => state.studentList;
export const getStudentAll = (state: StudentState) => state.studentAll;
export const getStudentsWithoutClass = (state: StudentState) => state.studentsWithoutClass;
export const getStudentByProperties = (state: StudentState) =>
  state.studentByProperties;
export const getStudentById = (state: StudentState) => state.studentById;
export const getExists = (state: StudentState) => state.exists;
export const getCount = (state: StudentState) => state.count;
export const getLoading = (state: StudentState) => state.loading;
export const getError = (state: StudentState) => state.error;
export const getCreateSuccess = (state: StudentState) => state.createSuccess;
export const getUpdateSuccess = (state: StudentState) => state.updateSuccess;
