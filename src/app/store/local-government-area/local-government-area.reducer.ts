import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as LocalGovernmentAreaAction from './local-government-area.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  LocalGovernmentAreaListInterface,
} from '../../types';

export const localGovernmentAreaFeatureKey = 'localGovernmentArea';

export interface LocalGovernmentAreaState {
  localGovernmentAreaList: PaginatedResponseInterface<LocalGovernmentAreaListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  localGovernmentAreaById: LocalGovernmentAreaListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: LocalGovernmentAreaState = {
  localGovernmentAreaList: null,
  pageQuery: null,
  localGovernmentAreaById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaListSuccess, (state, action) => {
    return {
      ...state,
      localGovernmentAreaList: action.payload?.entity,
      loading: false,
    };
  }),
  on(LocalGovernmentAreaAction.getLocalGovernmentAreaListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getLocalGovernmentAreaList = (state: LocalGovernmentAreaState) => state.localGovernmentAreaList;

export const getLocalGovernmentAreaById = (state: LocalGovernmentAreaState) => state.localGovernmentAreaById;

export const getLoading = (state: LocalGovernmentAreaState) => state.loading;

export const getError = (state: LocalGovernmentAreaState) => state.error;

export const selectLocalGovernmentAreaState =
  createFeatureSelector<LocalGovernmentAreaState>(localGovernmentAreaFeatureKey);
