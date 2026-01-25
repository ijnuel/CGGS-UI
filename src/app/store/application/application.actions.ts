import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
  ApplicationListInterface,
  ApplicationFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getApplicationAll = createAction('[Application] Get All', props<{ query?: QueryInterface }>());

export const getApplicationAllSuccess = createAction(
  '[Application/API] Get All Success',
  props<{
    payload: GenericResponseInterface<ApplicationListInterface[]>;
  }>()
);

export const getApplicationAllFail = createAction(
  '[Application/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getApplicationList = createAction(
  '[Application] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getApplicationListSuccess = createAction(
  '[Application/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<ApplicationListInterface[]>>;
  }>()
);

export const getApplicationListFail = createAction(
  '[Application/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getApplicationById = createAction(
  '[Application] Get By Id',
  props<{ applicationId: string }>()
);

export const getApplicationByIdSuccess = createAction(
  '[Application/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<ApplicationListInterface>;
  }>()
);

export const getApplicationByIdFail = createAction(
  '[Application/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getApplicationByProperties = createAction(
  '[Application] Get By Properties',
  props<{ properties: Partial<ApplicationFormInterface> }>()
);

export const getApplicationByPropertiesSuccess = createAction(
  '[Application/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<ApplicationListInterface[]>;
  }>()
);

export const getApplicationByPropertiesFail = createAction(
  '[Application/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const applicationExists = createAction(
  '[Application] Exists',
  props<{ properties: Partial<ApplicationFormInterface> }>()
);

export const applicationExistsSuccess = createAction(
  '[Application/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const applicationExistsFail = createAction(
  '[Application/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const applicationCount = createAction('[Application] Count');

export const applicationCountSuccess = createAction(
  '[Application/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const applicationCountFail = createAction(
  '[Application/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createApplication = createAction(
  '[Application] Create',
  props<{ payload: ApplicationFormInterface }>()
);

export const createApplicationSuccess = createAction(
  '[Application/API] Create Success',
  props<{
    payload: GenericResponseInterface<ApplicationListInterface>;
  }>()
);

export const createApplicationFail = createAction(
  '[Application/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateApplication = createAction(
  '[Application] Update',
  props<{ payload: ApplicationFormInterface }>()
);

export const updateApplicationSuccess = createAction(
  '[Application/API] Update Success',
  props<{
    payload: GenericResponseInterface<ApplicationListInterface>;
  }>()
);

export const updateApplicationFail = createAction(
  '[Application/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteApplication = createAction(
  '[Application] Delete',
  props<{ applicationId: string }>()
);

export const deleteApplicationSuccess = createAction(
  '[Application/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteApplicationFail = createAction(
  '[Application/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyApplications = createAction(
  '[Application] Create Many',
  props<{ payload: ApplicationFormInterface[] }>()
);

export const createManyApplicationsSuccess = createAction(
  '[Application/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<ApplicationListInterface[]>;
  }>()
);

export const createManyApplicationsFail = createAction(
  '[Application/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyApplications = createAction(
  '[Application] Update Many',
  props<{ payload: ApplicationFormInterface[] }>()
);

export const updateManyApplicationsSuccess = createAction(
  '[Application/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<ApplicationListInterface[]>;
  }>()
);

export const updateManyApplicationsFail = createAction(
  '[Application/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyApplications = createAction(
  '[Application] Delete Many',
  props<{ applicationIds: string[] }>()
);

export const deleteManyApplicationsSuccess = createAction(
  '[Application/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyApplicationsFail = createAction(
  '[Application/API] Delete Many Fail',
  props<{ error: string }>()
);
