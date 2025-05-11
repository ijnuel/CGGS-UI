import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as SchoolConfigurationAction from './school-configuration.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  SchoolConfigurationListInterface,
} from '../../types';

export const schoolConfigurationFeatureKey = 'schoolConfiguration';

export interface SchoolConfigurationState {
  schoolConfigurationList: PaginatedResponseInterface<SchoolConfigurationListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  schoolConfigurationById: SchoolConfigurationListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: SchoolConfigurationState = {
  schoolConfigurationList: null,
  pageQuery: null,
  schoolConfigurationById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(SchoolConfigurationAction.getSchoolConfigurationList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(SchoolConfigurationAction.getSchoolConfigurationListSuccess, (state, action) => {
    return {
      ...state,
      schoolConfigurationList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SchoolConfigurationAction.getSchoolConfigurationListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getSchoolConfigurationList = (state: SchoolConfigurationState) => state.schoolConfigurationList;

export const getSchoolConfigurationById = (state: SchoolConfigurationState) => state.schoolConfigurationById;

export const getLoading = (state: SchoolConfigurationState) => state.loading;

export const getError = (state: SchoolConfigurationState) => state.error;

export const selectSchoolConfigurationState =
  createFeatureSelector<SchoolConfigurationState>(schoolConfigurationFeatureKey);
