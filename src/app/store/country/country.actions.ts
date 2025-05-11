import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  CountryListInterface,
  CountryFormInterface,
} from '../../types';

export const getCountryList = createAction(
  '[Country] Get Country List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getCountryListSuccess = createAction(
  '[Country/API] Get Country List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<CountryListInterface[]>
    >;
  }>()
);

export const getCountryListFail = createAction(
  '[Country/API] Get Country List Fail',
  props<{ error: string }>()
);

export const getCountryById = createAction(
  '[Country] Get Country By Id',
  props<{ countryId: string }>()
);

export const getCountryByIdSuccess = createAction(
  '[Country/API] Get Country By Id Success',
  props<{
    payload: GenericResponseInterface<CountryListInterface>;
  }>()
);

export const getCountryByIdFail = createAction(
  '[Country/API] Get Country By Id Fail',
  props<{ error: string }>()
);

export const createCountry = createAction(
  '[Country] Create Country',
  props<{ payload: CountryFormInterface }>()
);

export const createCountrySuccess = createAction(
  '[Country/API] Create Country Success',
  props<{ message: string; country: CountryListInterface }>()
);

export const createCountryFail = createAction(
  '[Country/API] Create Country Fail',
  props<{ error: string }>()
);

export const editCountry = createAction(
  '[Country] Edit Country',
  props<{ payload: CountryFormInterface }>()
);

export const editCountrySuccess = createAction(
  '[Country/API] Edit Country Success',
  props<{ message: string; country: CountryListInterface }>()
);

export const editCountryFail = createAction(
  '[Country/API] Edit Country Fail',
  props<{ error: string }>()
);
