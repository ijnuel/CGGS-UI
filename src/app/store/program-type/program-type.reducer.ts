import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ProgramTypeAction from './program-type.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ProgramTypeListInterface,
} from '../../types';

export const programTypeFeatureKey = 'programType';

export interface ProgramTypeState {
  programTypeList: PaginatedResponseInterface<ProgramTypeListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  programTypeById: ProgramTypeListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProgramTypeState = {
  programTypeList: null,
  pageQuery: null,
  programTypeById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ProgramTypeAction.getProgramTypeList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(ProgramTypeAction.getProgramTypeListSuccess, (state, action) => {
    return {
      ...state,
      programTypeList: action.payload?.entity,
      loading: false,
    };
  }),
  on(ProgramTypeAction.getProgramTypeListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getProgramTypeList = (state: ProgramTypeState) => state.programTypeList;

export const getProgramTypeById = (state: ProgramTypeState) => state.programTypeById;

export const getLoading = (state: ProgramTypeState) => state.loading;

export const getError = (state: ProgramTypeState) => state.error;

export const selectProgramTypeState =
  createFeatureSelector<ProgramTypeState>(programTypeFeatureKey);
