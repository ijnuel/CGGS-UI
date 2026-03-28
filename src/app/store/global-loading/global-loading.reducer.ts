import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as LoadingActions from './global-loading.actions';

export const globalLoadingFeatureKey = 'globalLoading';

export interface GlobalLoadingState {
  loading: boolean;
  message: string | null | undefined;
  errorMessage: string | null | undefined;
  errorDuration: number;
  successMessage: string | null | undefined;
  successDuration: number;
}

export const initialState: GlobalLoadingState = {
  loading: false,
  message: null,
  errorMessage: null,
  errorDuration: 3000,
  successMessage: null,
  successDuration: 3000,
};

export const reducer = createReducer(
  initialState,
  on(LoadingActions.globalLoadingShow, (state, action) => {
    return {
      ...state,
      loading: true,
      message: action.message,
    };
  }),
  on(LoadingActions.globalLoadingHide, (state) => {
    return {
      ...state,
      loading: false,
      message: null,
    };
  }),
  on(LoadingActions.globalErrorShow, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
      errorDuration: action.messageDuration,
    };
  }),
  on(LoadingActions.globalSuccessShow, (state, action) => {
    return {
      ...state,
      successMessage: action.message,
      successDuration: action.messageDuration,
    };
  }),
  on(LoadingActions.globalErrorClear, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(LoadingActions.globalSuccessClear, (state) => ({
    ...state,
    successMessage: null,
  }))
);

const getLoading = (state: GlobalLoadingState) => state.loading;
const getErrorMessage = (state: GlobalLoadingState) => state.errorMessage;
const getSuccessMessage = (state: GlobalLoadingState) => state.successMessage;
export const selectGlobalLoadingState =
  createFeatureSelector<GlobalLoadingState>(globalLoadingFeatureKey);

export const selectGlobalLoading = createSelector(
  selectGlobalLoadingState,
  getLoading
);

export const selectGlobalError = createSelector(
  selectGlobalLoadingState,
  getErrorMessage
);

export const selectGlobalSuccess = createSelector(
  selectGlobalLoadingState,
  getSuccessMessage
);
