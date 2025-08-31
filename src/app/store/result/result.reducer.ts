import { createReducer, on } from '@ngrx/store';
import { StudentAssessmentScoreInterface } from '../../types/result';
import * as ResultActions from './result.actions';

export const resultFeatureKey = 'result';

export interface ResultState {
  resultMarkSheet: StudentAssessmentScoreInterface[] | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ResultState = {
  resultMarkSheet: null,
  loading: false,
  error: null,
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
  }))
); 