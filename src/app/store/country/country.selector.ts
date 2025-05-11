import { createSelector } from '@ngrx/store';
import * as fromCountry from './country.reducer';
import * as fromApp from '../app.reducer';

export const selectCountryState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromCountry.countryFeatureKey]
);

export const selectCountryList = createSelector(
  fromCountry.selectCountryState,
  fromCountry.getCountryList
);

export const selectCountryById = createSelector(
  fromCountry.selectCountryState,
  fromCountry.getCountryById
);

export const selectLoading = createSelector(
  fromCountry.selectCountryState,
  fromCountry.getLoading
);

export const selectError = createSelector(
  fromCountry.selectCountryState,
  fromCountry.getError
);
