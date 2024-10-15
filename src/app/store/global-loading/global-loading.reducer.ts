import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as LoadingActions from './global-loading.actions';

export const globalLoadingFeatureKey = 'global-loading';

export interface GlobalLoadingState {
  loading: boolean;
  message: string | null | undefined;
}

export const initialState: GlobalLoadingState = {
  loading: false,
  message: null,
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
  })
);

const getLoading = (state: GlobalLoadingState) => state.loading;

export const selectGlobalLoadingState =
  createFeatureSelector<GlobalLoadingState>(globalLoadingFeatureKey);

export const selectGlobalLoading = createSelector(
  selectGlobalLoadingState,
  getLoading
);
