import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as CountryAction from './country.actions';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  CountryListInterface,
} from '../../types';

export const countryFeatureKey = 'country';

export interface CountryState {
  countryList: PaginatedResponseInterface<CountryListInterface[]> | null;
  pageQuery: PageQueryInterface | null;
  countryById: CountryListInterface | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CountryState = {
  countryList: null,
  pageQuery: null,
  countryById: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(CountryAction.getCountryList, (state, { pageQuery }) => {
    return {
      ...state,
      pageQuery,
      loading: true,
    };
  }),
  on(CountryAction.getCountryListSuccess, (state, action) => {
    return {
      ...state,
      countryList: action.payload?.entity,
      loading: false,
    };
  }),
  on(CountryAction.getCountryListFail, (state, action) => {
    return {
      ...initialState,
      loading: false,
      error: action.error,
    };
  })
);

export const getCountryList = (state: CountryState) => state.countryList;

export const getCountryById = (state: CountryState) => state.countryById;

export const getLoading = (state: CountryState) => state.loading;

export const getError = (state: CountryState) => state.error;

export const selectCountryState =
  createFeatureSelector<CountryState>(countryFeatureKey);
