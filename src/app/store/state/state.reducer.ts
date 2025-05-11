import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as StateAction from './state.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StateListInterface,
} from '../../types';

export const stateFeatureKey = 'state';

export interface StateState {
  stateList: PaginatedResponseInterface<StateListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  stateById: StateListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: StateState = {
  stateList: null,
  pageQuery: null,
  stateById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StateAction.getStateList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(StateAction.getStateListSuccess, (state, action) => {
    return {
      ...state,
      stateList: action.payload?.entity,
      loading: false,
    };
  }),
  on(StateAction.getStateListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getStateList = (state: StateState) => state.stateList;

export const getStateById = (state: StateState) => state.stateById;

export const getLoading = (state: StateState) => state.loading;

export const getError = (state: StateState) => state.error;

export const selectStateState =
  createFeatureSelector<StateState>(stateFeatureKey);
