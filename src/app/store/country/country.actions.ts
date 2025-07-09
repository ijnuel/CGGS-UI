import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  CountryListInterface,
  CountryFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getCountryAll = createAction('[Country] Get All');

export const getCountryAllSuccess = createAction(
  '[Country/API] Get All Success',
  props<{
    payload: GenericResponseInterface<CountryListInterface[]>;
  }>()
);

export const getCountryAllFail = createAction(
  '[Country/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getCountryList = createAction(
  '[Country] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getCountryListSuccess = createAction(
  '[Country/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<CountryListInterface[]>>;
  }>()
);

export const getCountryListFail = createAction(
  '[Country/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getCountryById = createAction(
  '[Country] Get By Id',
  props<{ countryId: string }>()
);

export const getCountryByIdSuccess = createAction(
  '[Country/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<CountryListInterface>;
  }>()
);

export const getCountryByIdFail = createAction(
  '[Country/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getCountryByProperties = createAction(
  '[Country] Get By Properties',
  props<{ properties: Partial<CountryFormInterface> }>()
);

export const getCountryByPropertiesSuccess = createAction(
  '[Country/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<CountryListInterface[]>;
  }>()
);

export const getCountryByPropertiesFail = createAction(
  '[Country/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const countryExists = createAction(
  '[Country] Exists',
  props<{ properties: Partial<CountryFormInterface> }>()
);

export const countryExistsSuccess = createAction(
  '[Country/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const countryExistsFail = createAction(
  '[Country/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const countryCount = createAction('[Country] Count');

export const countryCountSuccess = createAction(
  '[Country/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const countryCountFail = createAction(
  '[Country/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createCountry = createAction(
  '[Country] Create',
  props<{ payload: CountryFormInterface }>()
);

export const createCountrySuccess = createAction(
  '[Country/API] Create Success',
  props<{
    payload: GenericResponseInterface<CountryListInterface>;
  }>()
);

export const createCountryFail = createAction(
  '[Country/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateCountry = createAction(
  '[Country] Update',
  props<{ payload: CountryFormInterface }>()
);

export const updateCountrySuccess = createAction(
  '[Country/API] Update Success',
  props<{
    payload: GenericResponseInterface<CountryListInterface>;
  }>()
);

export const updateCountryFail = createAction(
  '[Country/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteCountry = createAction(
  '[Country] Delete',
  props<{ countryId: string }>()
);

export const deleteCountrySuccess = createAction(
  '[Country/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteCountryFail = createAction(
  '[Country/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyCountrys = createAction(
  '[Country] Create Many',
  props<{ payload: CountryFormInterface[] }>()
);

export const createManyCountrysSuccess = createAction(
  '[Country/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<CountryListInterface[]>;
  }>()
);

export const createManyCountrysFail = createAction(
  '[Country/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyCountrys = createAction(
  '[Country] Update Many',
  props<{ payload: CountryFormInterface[] }>()
);

export const updateManyCountrysSuccess = createAction(
  '[Country/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<CountryListInterface[]>;
  }>()
);

export const updateManyCountrysFail = createAction(
  '[Country/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyCountrys = createAction(
  '[Country] Delete Many',
  props<{ countryIds: string[] }>()
);

export const deleteManyCountrysSuccess = createAction(
  '[Country/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyCountrysFail = createAction(
  '[Country/API] Delete Many Fail',
  props<{ error: string }>()
);
