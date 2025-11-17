import { createReducer, on } from '@ngrx/store';
import { StudentAssessmentScoreInterface } from '../../types/result';
import * as ResultActions from './result.actions';

export const resultFeatureKey = 'result';

export interface ResultState {
  resultMarkSheet: StudentAssessmentScoreInterface[] | null;
  loading: boolean;
  error: string | null;
  generatingStudentResult: boolean;
  generatedStudentResult: Blob | null;
  generateStudentResultError: string | null;
  generatingClassResult: boolean;
  generatedClassResult: Blob | null;
  generateClassResultError: string | null;
}

export const initialState: ResultState = {
  resultMarkSheet: null,
  loading: false,
  error: null,
  generatingStudentResult: false,
  generatedStudentResult: null,
  generateStudentResultError: null,
  generatingClassResult: false,
  generatedClassResult: null,
  generateClassResultError: null,
};

export const resultReducer = createReducer(
  initialState,
  
  // Get Result MarkSheet
  on(ResultActions.getResultMarkSheet, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(ResultActions.getResultMarkSheetSuccess, (state, { payload }) => ({
    ...state,
    resultMarkSheet: payload.entity,
    loading: false,
    error: null,
  })),
  
  on(ResultActions.getResultMarkSheetFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Update Result MarkSheet
  on(ResultActions.updateResultMarkSheet, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(ResultActions.updateResultMarkSheetSuccess, (state, { payload }) => ({
    ...state,
    resultMarkSheet: payload.entity,
    loading: false,
    error: null,
  })),
  
  on(ResultActions.updateResultMarkSheetFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Generate Student Result
  on(ResultActions.generateStudentResult, (state) => ({
    ...state,
    generatingStudentResult: true,
    generateStudentResultError: null,
  })),

  on(ResultActions.generateStudentResultSuccess, (state, { payload }) => ({
    ...state,
    generatingStudentResult: false,
    generatedStudentResult: payload,
    generateStudentResultError: null,
  })),

  on(ResultActions.generateStudentResultFail, (state, { error }) => ({
    ...state,
    generatingStudentResult: false,
    generateStudentResultError: error,
  })),

  on(ResultActions.clearGeneratedStudentResult, (state) => ({
    ...state,
    generatedStudentResult: null,
  })),

  // Generate Class Result
  on(ResultActions.generateClassResult, (state) => ({
    ...state,
    generatingClassResult: true,
    generateClassResultError: null,
  })),

  on(ResultActions.generateClassResultSuccess, (state, { payload }) => ({
    ...state,
    generatingClassResult: false,
    generatedClassResult: payload,
    generateClassResultError: null,
  })),

  on(ResultActions.generateClassResultFail, (state, { error }) => ({
    ...state,
    generatingClassResult: false,
    generateClassResultError: error,
  })),

  on(ResultActions.clearGeneratedClassResult, (state) => ({
    ...state,
    generatedClassResult: null,
  }))
); 