import { createSelector } from '@ngrx/store';
import {
  getCountryList,
  getCountryAll,
  getCountryByProperties,
  getCountryById,
  getExists,
  getCount,
  getLoading,
  getError,
  CountryState,
} from './country.reducer';

export const selectCountryState = (state: { country: CountryState }) =>
  state.country;

export const selectCountryList = createSelector(
  selectCountryState,
  getCountryList
);

export const selectCountryAll = createSelector(
  selectCountryState,
  getCountryAll
);

export const selectCountryByProperties = createSelector(
  selectCountryState,
  getCountryByProperties
);

export const selectCountryById = createSelector(
  selectCountryState,
  getCountryById
);

export const selectExists = createSelector(
  selectCountryState,
  getExists
);

export const selectCount = createSelector(
  selectCountryState,
  getCount
);

export const selectCountryLoading = createSelector(
  selectCountryState,
  getLoading
);

export const selectCountryError = createSelector(
  selectCountryState,
  getError
);

export const selectCountryCreateSuccess = createSelector(
    selectCountryState,
    (state) => state.createSuccess
);

export const selectCountryUpdateSuccess = createSelector(
    selectCountryState,
    (state) => state.updateSuccess
);