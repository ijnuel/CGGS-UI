import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  SchoolConfigurationListInterface,
  SchoolConfigurationFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getSchoolConfigurationAll = createAction('[SchoolConfiguration] Get All');

export const getSchoolConfigurationAllSuccess = createAction(
  '[SchoolConfiguration/API] Get All Success',
  props<{
    payload: GenericResponseInterface<SchoolConfigurationListInterface[]>;
  }>()
);

export const getSchoolConfigurationAllFail = createAction(
  '[SchoolConfiguration/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getSchoolConfigurationList = createAction(
  '[SchoolConfiguration] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getSchoolConfigurationListSuccess = createAction(
  '[SchoolConfiguration/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<SchoolConfigurationListInterface[]>>;
  }>()
);

export const getSchoolConfigurationListFail = createAction(
  '[SchoolConfiguration/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getSchoolConfigurationById = createAction(
  '[SchoolConfiguration] Get By Id',
  props<{ schoolConfigurationId: string }>()
);

export const getSchoolConfigurationByIdSuccess = createAction(
  '[SchoolConfiguration/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<SchoolConfigurationListInterface>;
  }>()
);

export const getSchoolConfigurationByIdFail = createAction(
  '[SchoolConfiguration/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getSchoolConfigurationByProperties = createAction(
  '[SchoolConfiguration] Get By Properties',
  props<{ properties: Partial<SchoolConfigurationFormInterface> }>()
);

export const getSchoolConfigurationByPropertiesSuccess = createAction(
  '[SchoolConfiguration/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<SchoolConfigurationListInterface[]>;
  }>()
);

export const getSchoolConfigurationByPropertiesFail = createAction(
  '[SchoolConfiguration/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const schoolConfigurationExists = createAction(
  '[SchoolConfiguration] Exists',
  props<{ properties: Partial<SchoolConfigurationFormInterface> }>()
);

export const schoolConfigurationExistsSuccess = createAction(
  '[SchoolConfiguration/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const schoolConfigurationExistsFail = createAction(
  '[SchoolConfiguration/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const schoolConfigurationCount = createAction('[SchoolConfiguration] Count');

export const schoolConfigurationCountSuccess = createAction(
  '[SchoolConfiguration/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const schoolConfigurationCountFail = createAction(
  '[SchoolConfiguration/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createSchoolConfiguration = createAction(
  '[SchoolConfiguration] Create',
  props<{ payload: SchoolConfigurationFormInterface }>()
);

export const createSchoolConfigurationSuccess = createAction(
  '[SchoolConfiguration/API] Create Success',
  props<{
    payload: GenericResponseInterface<SchoolConfigurationListInterface>;
  }>()
);

export const createSchoolConfigurationFail = createAction(
  '[SchoolConfiguration/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateSchoolConfiguration = createAction(
  '[SchoolConfiguration] Update',
  props<{ payload: SchoolConfigurationFormInterface }>()
);

export const updateSchoolConfigurationSuccess = createAction(
  '[SchoolConfiguration/API] Update Success',
  props<{
    payload: GenericResponseInterface<SchoolConfigurationListInterface>;
  }>()
);

export const updateSchoolConfigurationFail = createAction(
  '[SchoolConfiguration/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteSchoolConfiguration = createAction(
  '[SchoolConfiguration] Delete',
  props<{ schoolConfigurationId: string }>()
);

export const deleteSchoolConfigurationSuccess = createAction(
  '[SchoolConfiguration/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteSchoolConfigurationFail = createAction(
  '[SchoolConfiguration/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManySchoolConfigurations = createAction(
  '[SchoolConfiguration] Create Many',
  props<{ payload: SchoolConfigurationFormInterface[] }>()
);

export const createManySchoolConfigurationsSuccess = createAction(
  '[SchoolConfiguration/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<SchoolConfigurationListInterface[]>;
  }>()
);

export const createManySchoolConfigurationsFail = createAction(
  '[SchoolConfiguration/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManySchoolConfigurations = createAction(
  '[SchoolConfiguration] Update Many',
  props<{ payload: SchoolConfigurationFormInterface[] }>()
);

export const updateManySchoolConfigurationsSuccess = createAction(
  '[SchoolConfiguration/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<SchoolConfigurationListInterface[]>;
  }>()
);

export const updateManySchoolConfigurationsFail = createAction(
  '[SchoolConfiguration/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManySchoolConfigurations = createAction(
  '[SchoolConfiguration] Delete Many',
  props<{ schoolConfigurationIds: string[] }>()
);

export const deleteManySchoolConfigurationsSuccess = createAction(
  '[SchoolConfiguration/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManySchoolConfigurationsFail = createAction(
  '[SchoolConfiguration/API] Delete Many Fail',
  props<{ error: string }>()
);
