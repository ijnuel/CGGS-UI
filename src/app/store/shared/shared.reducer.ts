import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as SharedAction from './shared.actions';
import { DropdownListInterface } from '../../types';

export const sharedFeatureKey = 'shared';

export interface SharedState {
  genderList: DropdownListInterface[] | null;
  termList: DropdownListInterface[] | null;
  religionList: DropdownListInterface[] | null;
  countryList: DropdownListInterface[] | null;
  stateList: DropdownListInterface[] | null;
  lgaList: DropdownListInterface[] | null;
  loading: boolean;
  error: string | null;
  userTypeList: DropdownListInterface[] | null;
  subjectTypeList: DropdownListInterface[] | null;
  skillGradeList: DropdownListInterface[] | null;
}

export const initialState: SharedState = {
  genderList: null,
  termList: null,
  religionList: null,
  countryList: null,
  stateList: null,
  lgaList: null,
  loading: false,
  error: null,
  userTypeList: null,
  subjectTypeList: null,
  skillGradeList: null,
};

export const reducer = createReducer(
  initialState,
  on(SharedAction.getGenderList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getTermList, (state) => {
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
  on(SharedAction.getTermListSuccess, (state, action) => {
    return {
      ...state,
      termList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getTermListFail, (state, action) => {
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
  }),
  on(SharedAction.getUserTypeList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getSubjectTypeList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getSkillGradeList, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(SharedAction.getUserTypeListSuccess, (state, action) => {
    return {
      ...state,
      userTypeList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getUserTypeListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  }),
  on(SharedAction.getSubjectTypeListSuccess, (state, action) => {
    return {
      ...state,
      subjectTypeList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getSubjectTypeListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  }),
  on(SharedAction.getSkillGradeListSuccess, (state, action) => {
    return {
      ...state,
      skillGradeList: action.payload?.entity,
      loading: false,
    };
  }),
  on(SharedAction.getSkillGradeListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getGenderList = (state: SharedState) => state.genderList;

export const getTermList = (state: SharedState) => state.termList;

export const getReligionList = (state: SharedState) => state.religionList;

export const getCountryList = (state: SharedState) => state.countryList;

export const getStateList = (state: SharedState) => state.stateList;

export const getLgaList = (state: SharedState) => state.lgaList;

export const getLoading = (state: SharedState) => state.loading;

export const getError = (state: SharedState) => state.error;

export const getUserTypeList = (state: SharedState) => state.userTypeList;
export const getSubjectTypeList = (state: SharedState) => state.subjectTypeList;
export const getSkillGradeList = (state: SharedState) => state.skillGradeList;

export const selectSharedState =
  createFeatureSelector<SharedState>(sharedFeatureKey);
