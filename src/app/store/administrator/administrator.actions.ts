import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
  AdministratorListInterface,
  AdministratorFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getAdministratorAll = createAction('[Administrator] Get All', props<{ query?: QueryInterface }>());

export const getAdministratorAllSuccess = createAction(
  '[Administrator/API] Get All Success',
  props<{
    payload: GenericResponseInterface<AdministratorListInterface[]>;
  }>()
);

export const getAdministratorAllFail = createAction(
  '[Administrator/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getAdministratorList = createAction(
  '[Administrator] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getAdministratorListSuccess = createAction(
  '[Administrator/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<AdministratorListInterface[]>>;
  }>()
);

export const getAdministratorListFail = createAction(
  '[Administrator/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getAdministratorById = createAction(
  '[Administrator] Get By Id',
  props<{ administratorId: string }>()
);

export const getAdministratorByIdSuccess = createAction(
  '[Administrator/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<AdministratorListInterface>;
  }>()
);

export const getAdministratorByIdFail = createAction(
  '[Administrator/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getAdministratorByProperties = createAction(
  '[Administrator] Get By Properties',
  props<{ properties: Partial<AdministratorFormInterface> }>()
);

export const getAdministratorByPropertiesSuccess = createAction(
  '[Administrator/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<AdministratorListInterface[]>;
  }>()
);

export const getAdministratorByPropertiesFail = createAction(
  '[Administrator/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const administratorExists = createAction(
  '[Administrator] Exists',
  props<{ properties: Partial<AdministratorFormInterface> }>()
);

export const administratorExistsSuccess = createAction(
  '[Administrator/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const administratorExistsFail = createAction(
  '[Administrator/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const administratorCount = createAction('[Administrator] Count');

export const administratorCountSuccess = createAction(
  '[Administrator/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const administratorCountFail = createAction(
  '[Administrator/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createAdministrator = createAction(
  '[Administrator] Create',
  props<{ payload: AdministratorFormInterface }>()
);

export const createAdministratorSuccess = createAction(
  '[Administrator/API] Create Success',
  props<{
    payload: GenericResponseInterface<AdministratorListInterface>;
  }>()
);

export const createAdministratorFail = createAction(
  '[Administrator/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateAdministrator = createAction(
  '[Administrator] Update',
  props<{ payload: AdministratorFormInterface }>()
);

export const updateAdministratorSuccess = createAction(
  '[Administrator/API] Update Success',
  props<{
    payload: GenericResponseInterface<AdministratorListInterface>;
  }>()
);

export const updateAdministratorFail = createAction(
  '[Administrator/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteAdministrator = createAction(
  '[Administrator] Delete',
  props<{ administratorId: string }>()
);

export const deleteAdministratorSuccess = createAction(
  '[Administrator/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteAdministratorFail = createAction(
  '[Administrator/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyAdministrators = createAction(
  '[Administrator] Create Many',
  props<{ payload: AdministratorFormInterface[] }>()
);

export const createManyAdministratorsSuccess = createAction(
  '[Administrator/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<AdministratorListInterface[]>;
  }>()
);

export const createManyAdministratorsFail = createAction(
  '[Administrator/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyAdministrators = createAction(
  '[Administrator] Update Many',
  props<{ payload: AdministratorFormInterface[] }>()
);

export const updateManyAdministratorsSuccess = createAction(
  '[Administrator/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<AdministratorListInterface[]>;
  }>()
);

export const updateManyAdministratorsFail = createAction(
  '[Administrator/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyAdministrators = createAction(
  '[Administrator] Delete Many',
  props<{ administratorIds: string[] }>()
);

export const deleteManyAdministratorsSuccess = createAction(
  '[Administrator/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyAdministratorsFail = createAction(
  '[Administrator/API] Delete Many Fail',
  props<{ error: string }>()
);
