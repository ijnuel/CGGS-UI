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
  countryAll: CountryListInterface[] | null;
  countryByProperties: CountryListInterface[] | null;
  countryById: CountryListInterface | null;
  exists: boolean | null;
  count: number | null;
  pageQuery: PageQueryInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
}

export const initialState: CountryState = {
  countryList: null,
  countryAll: null,
  countryByProperties: null,
  countryById: null,
  exists: null,
  count: null,
  pageQuery: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
};

export const reducer = createReducer(
  initialState,
  // Get All
  on(CountryAction.getCountryAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.getCountryAllSuccess, (state, { payload }) => ({
    ...state,
    countryAll: payload.entity,
    loading: false,
  })),
  on(CountryAction.getCountryAllFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get List
  on(CountryAction.getCountryList, (state, { pageQuery }) => ({
    ...state,
    pageQuery,
    loading: true,
    error: null,
  })),
  on(CountryAction.getCountryListSuccess, (state, { payload }) => ({
    ...state,
    countryList: payload.entity,
    loading: false,
  })),
  on(CountryAction.getCountryListFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Id
  on(CountryAction.getCountryById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.getCountryByIdSuccess, (state, { payload }) => ({
    ...state,
    countryById: payload.entity,
    loading: false,
  })),
  on(CountryAction.getCountryByIdFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get By Properties
  on(CountryAction.getCountryByProperties, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.getCountryByPropertiesSuccess, (state, { payload }) => ({
    ...state,
    countryByProperties: payload.entity,
    loading: false,
  })),
  on(CountryAction.getCountryByPropertiesFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Exists
  on(CountryAction.countryExists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.countryExistsSuccess, (state, { payload }) => ({
    ...state,
    exists: payload.entity,
    loading: false,
  })),
  on(CountryAction.countryExistsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Count
  on(CountryAction.countryCount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.countryCountSuccess, (state, { payload }) => ({
    ...state,
    count: payload.entity,
    loading: false,
  })),
  on(CountryAction.countryCountFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(CountryAction.createCountry, (state) => ({
    ...state,
    loading: true,
    error: null,
    createSuccess: false,
  })),
  on(CountryAction.createCountrySuccess, (state, { payload }) => ({
    ...state,
    countryList: state.countryList
      ? {
          ...state.countryList,
          data: [...state.countryList.data, payload.entity],
        }
      : null,
    loading: false,
    createSuccess: true,
  })),
  on(CountryAction.createCountryFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    createSuccess: false,
  })),

  // Update
  on(CountryAction.updateCountry, (state) => ({
    ...state,
    loading: true,
    error: null,
    updateSuccess: false,
  })),
  on(CountryAction.updateCountrySuccess, (state, { payload }) => ({
    ...state,
    countryList: state.countryList
      ? {
          ...state.countryList,
          data: state.countryList.data.map((item: CountryListInterface) =>
            item.id === payload.entity.id ? payload.entity : item
          ),
        }
      : null,
    countryById:
      state.countryById?.id === payload.entity.id
        ? payload.entity
        : state.countryById,
    loading: false,
    updateSuccess: true,
  })),
  on(CountryAction.updateCountryFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    updateSuccess: false,
  })),

  // Delete
  on(CountryAction.deleteCountry, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.deleteCountrySuccess, (state) => ({
    ...state,
    countryById: null,
    countryList: state.countryList
      ? {
          ...state.countryList,
          data: state.countryList.data.filter((item) => item.id !== state.countryById?.id),
        }
      : null,
    loading: false,
  })),
  on(CountryAction.deleteCountryFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Many
  on(CountryAction.createManyCountrys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.createManyCountrysSuccess, (state, { payload }) => ({
    ...state,
    countryList: state.countryList
      ? {
          ...state.countryList,
          data: [...state.countryList.data, ...payload.entity],
        }
      : null,
    loading: false,
  })),
  on(CountryAction.createManyCountrysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Many
  on(CountryAction.updateManyCountrys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.updateManyCountrysSuccess, (state, { payload }) => ({
    ...state,
    countryList: state.countryList
      ? {
          ...state.countryList,
          data: state.countryList.data.map((item: CountryListInterface) => {
            const updatedItem = payload.entity.find((updated) => updated.id === item.id);
            return updatedItem || item;
          }),
        }
      : null,
    loading: false,
  })),
  on(CountryAction.updateManyCountrysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Many
  on(CountryAction.deleteManyCountrys, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryAction.deleteManyCountrysSuccess, (state) => ({
    ...state,
    countryList: null,
    loading: false,
  })),
  on(CountryAction.deleteManyCountrysFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectCountryState = createFeatureSelector<CountryState>(
  countryFeatureKey
);

export const getCountryList = (state: CountryState) => state.countryList;
export const getCountryAll = (state: CountryState) => state.countryAll;
export const getCountryByProperties = (state: CountryState) =>
  state.countryByProperties;
export const getCountryById = (state: CountryState) => state.countryById;
export const getExists = (state: CountryState) => state.exists;
export const getCount = (state: CountryState) => state.count;
export const getLoading = (state: CountryState) => state.loading;
export const getError = (state: CountryState) => state.error;
export const getCreateSuccess = (state: CountryState) => state.createSuccess;
export const getUpdateSuccess = (state: CountryState) => state.updateSuccess;
