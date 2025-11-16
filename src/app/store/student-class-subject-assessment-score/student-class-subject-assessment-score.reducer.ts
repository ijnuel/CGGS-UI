import { createReducer, on } from '@ngrx/store';
import { StudentClassSubjectAssessmentScoreListInterface } from '../../types/student-class-subject-assessment-score';
import { PaginatedResponseInterface } from '../../types';
import * as StudentClassSubjectAssessmentScoreActions from './student-class-subject-assessment-score.actions';

export const studentClassSubjectAssessmentScoreFeatureKey = 'studentClassSubjectAssessmentScore';

export interface StudentClassSubjectAssessmentScoreState {
  studentClassSubjectAssessmentScoreList: PaginatedResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]> | null;
  studentClassSubjectAssessmentScoreAll: StudentClassSubjectAssessmentScoreListInterface[] | null;
  studentClassSubjectAssessmentScoreByProperties: StudentClassSubjectAssessmentScoreListInterface[] | null;
  studentClassSubjectAssessmentScoreById: StudentClassSubjectAssessmentScoreListInterface | null;
  loading: boolean;
  error: string | null;
  updateManySuccess: boolean;
}

export const initialState: StudentClassSubjectAssessmentScoreState = {
  studentClassSubjectAssessmentScoreList: null,
  studentClassSubjectAssessmentScoreAll: null,
  studentClassSubjectAssessmentScoreByProperties: null,
  studentClassSubjectAssessmentScoreById: null,
  loading: false,
  error: null,
  updateManySuccess: false,
};

export const studentClassSubjectAssessmentScoreReducer = createReducer(
  initialState,
  
  // Get All
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreAllSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreAll: payload.entity,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Get List
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreList, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreListSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreList: payload.entity,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Get By Id
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByIdSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreById: payload.entity,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Get By Properties
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreByProperties: payload.entity,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Exists
  on(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreExistsSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Count
  on(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreCountSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Create
  on(StudentClassSubjectAssessmentScoreActions.createStudentClassSubjectAssessmentScore, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.createStudentClassSubjectAssessmentScoreSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreList: state.studentClassSubjectAssessmentScoreList ? {
      ...state.studentClassSubjectAssessmentScoreList,
      data: [...state.studentClassSubjectAssessmentScoreList.data, payload.entity],
      totalCount: state.studentClassSubjectAssessmentScoreList.totalCount + 1
    } : null,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.createStudentClassSubjectAssessmentScoreFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Update
  on(StudentClassSubjectAssessmentScoreActions.updateStudentClassSubjectAssessmentScore, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.updateStudentClassSubjectAssessmentScoreSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreList: state.studentClassSubjectAssessmentScoreList ? {
      ...state.studentClassSubjectAssessmentScoreList,
      data: state.studentClassSubjectAssessmentScoreList.data.map((item: StudentClassSubjectAssessmentScoreListInterface) =>
        item.id === payload.entity.id ? payload.entity : item
      )
    } : null,
    studentClassSubjectAssessmentScoreById: state.studentClassSubjectAssessmentScoreById?.id === payload.entity.id ? payload.entity : state.studentClassSubjectAssessmentScoreById,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.updateStudentClassSubjectAssessmentScoreFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Delete
  on(StudentClassSubjectAssessmentScoreActions.deleteStudentClassSubjectAssessmentScore, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.deleteStudentClassSubjectAssessmentScoreSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreList: null,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.deleteStudentClassSubjectAssessmentScoreFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Create Many
  on(StudentClassSubjectAssessmentScoreActions.createManyStudentClassSubjectAssessmentScores, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.createManyStudentClassSubjectAssessmentScoresSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreList: state.studentClassSubjectAssessmentScoreList ? {
      ...state.studentClassSubjectAssessmentScoreList,
      data: [...state.studentClassSubjectAssessmentScoreList.data, ...payload.entity],
      totalCount: state.studentClassSubjectAssessmentScoreList.totalCount + payload.entity.length
    } : null,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.createManyStudentClassSubjectAssessmentScoresFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Update Many
  on(StudentClassSubjectAssessmentScoreActions.updateManyStudentClassSubjectAssessmentScores, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateManySuccess: false,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.updateManyStudentClassSubjectAssessmentScoresSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreList: state.studentClassSubjectAssessmentScoreList ? {
      ...state.studentClassSubjectAssessmentScoreList,
      data: state.studentClassSubjectAssessmentScoreList.data.map((item: StudentClassSubjectAssessmentScoreListInterface) => {
        const updatedItem = payload.entity.find((updated: StudentClassSubjectAssessmentScoreListInterface) => updated.id === item.id);
        return updatedItem || item;
      })
    } : null,
    loading: false,
    error: null,
    updateManySuccess: true,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.updateManyStudentClassSubjectAssessmentScoresFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateManySuccess: false,
  })),
  
  // Delete Many
  on(StudentClassSubjectAssessmentScoreActions.deleteManyStudentClassSubjectAssessmentScores, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.deleteManyStudentClassSubjectAssessmentScoresSuccess, (state, { payload }) => ({
    ...state,
    studentClassSubjectAssessmentScoreList: null,
    loading: false,
    error: null,
  })),
  
  on(StudentClassSubjectAssessmentScoreActions.deleteManyStudentClassSubjectAssessmentScoresFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
