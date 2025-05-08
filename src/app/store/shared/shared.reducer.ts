import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as SharedAction from './shared.actions';
import { DropdownListInterface } from '../../types';

export const sharedFeatureKey = 'shared';

export interface SharedState {
  genderList: DropdownListInterface[] | null;
  religionList: DropdownListInterface[] | null;
  countryList: DropdownListInterface[] | null;
  stateList: DropdownListInterface[] | null;
  lgaList: DropdownListInterface[] | null;
  loading: boolean;
  error: string | null;
}

export const initialState: SharedState = {
  genderList: null,
  religionList: null,
  countryList: null,
  stateList: null,
  lgaList: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(SharedAction.getGenderList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getReligionList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getCountryList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getStateList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getLgaList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getGenderListSuccess, (state, action) => {
    return {
      ...state,
      genderList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getGenderListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  }),
  on(SharedAction.getReligionListSuccess, (state, action) => {
    return {
      ...state,
      religionList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getReligionListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  }),
  on(SharedAction.getCountryListSuccess, (state, action) => {
    return {
      ...state,
      countryList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getCountryListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  }),
  on(SharedAction.getStateListSuccess, (state, action) => {
    return {
      ...state,
      stateList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getStateListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  }),
  on(SharedAction.getLgaListSuccess, (state, action) => {
    return {
      ...state,
      lgaList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getLgaListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getGenderList = (state: SharedState) => state.genderList;

export const getReligionList = (state: SharedState) => state.religionList;

export const getCountryList = (state: SharedState) => state.countryList;

export const getStateList = (state: SharedState) => state.stateList;

export const getLgaList = (state: SharedState) => state.lgaList;

export const getLoading = (state: SharedState) => state.loading;

export const getError = (state: SharedState) => state.error;

export const selectSharedState =
  createFeatureSelector<SharedState>(sharedFeatureKey);
