import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ApplicationAction from './application.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ApplicationListInterface,
} from '../../types';

export const applicationFeatureKey = 'application';

export interface ApplicationState {
  applicationList: PaginatedResponseInterface<ApplicationListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  applicationById: ApplicationListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ApplicationState = {
  applicationList: null,
  pageQuery: null,
  applicationById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ApplicationAction.getApplicationList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(ApplicationAction.getApplicationListSuccess, (state, action) => {
    return {
      ...state,
      applicationList: action.payload?.entity,
      loading: false,
    };
  }),
  on(ApplicationAction.getApplicationListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getApplicationList = (state: ApplicationState) => state.applicationList;

export const getApplicationById = (state: ApplicationState) => state.applicationById;

export const getLoading = (state: ApplicationState) => state.loading;

export const getError = (state: ApplicationState) => state.error;

export const selectApplicationState =
  createFeatureSelector<ApplicationState>(applicationFeatureKey);
