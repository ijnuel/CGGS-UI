import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  LocalGovernmentAreaListInterface,
  LocalGovernmentAreaFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getLocalGovernmentAreaAll = createAction('[LocalGovernmentArea] Get All');

export const getLocalGovernmentAreaAllSuccess = createAction(
  '[LocalGovernmentArea/API] Get All Success',
  props<{
    payload: GenericResponseInterface<LocalGovernmentAreaListInterface[]>;
  }>()
);

export const getLocalGovernmentAreaAllFail = createAction(
  '[LocalGovernmentArea/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getLocalGovernmentAreaList = createAction(
  '[LocalGovernmentArea] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getLocalGovernmentAreaListSuccess = createAction(
  '[LocalGovernmentArea/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<LocalGovernmentAreaListInterface[]>>;
  }>()
);

export const getLocalGovernmentAreaListFail = createAction(
  '[LocalGovernmentArea/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getLocalGovernmentAreaById = createAction(
  '[LocalGovernmentArea] Get By Id',
  props<{ localGovernmentAreaId: string }>()
);

export const getLocalGovernmentAreaByIdSuccess = createAction(
  '[LocalGovernmentArea/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<LocalGovernmentAreaListInterface>;
  }>()
);

export const getLocalGovernmentAreaByIdFail = createAction(
  '[LocalGovernmentArea/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getLocalGovernmentAreaByProperties = createAction(
  '[LocalGovernmentArea] Get By Properties',
  props<{ properties: Partial<LocalGovernmentAreaFormInterface> }>()
);

export const getLocalGovernmentAreaByPropertiesSuccess = createAction(
  '[LocalGovernmentArea/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<LocalGovernmentAreaListInterface[]>;
  }>()
);

export const getLocalGovernmentAreaByPropertiesFail = createAction(
  '[LocalGovernmentArea/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const localGovernmentAreaExists = createAction(
  '[LocalGovernmentArea] Exists',
  props<{ properties: Partial<LocalGovernmentAreaFormInterface> }>()
);

export const localGovernmentAreaExistsSuccess = createAction(
  '[LocalGovernmentArea/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const localGovernmentAreaExistsFail = createAction(
  '[LocalGovernmentArea/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const localGovernmentAreaCount = createAction('[LocalGovernmentArea] Count');

export const localGovernmentAreaCountSuccess = createAction(
  '[LocalGovernmentArea/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const localGovernmentAreaCountFail = createAction(
  '[LocalGovernmentArea/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createLocalGovernmentArea = createAction(
  '[LocalGovernmentArea] Create',
  props<{ payload: LocalGovernmentAreaFormInterface }>()
);

export const createLocalGovernmentAreaSuccess = createAction(
  '[LocalGovernmentArea/API] Create Success',
  props<{
    payload: GenericResponseInterface<LocalGovernmentAreaListInterface>;
  }>()
);

export const createLocalGovernmentAreaFail = createAction(
  '[LocalGovernmentArea/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateLocalGovernmentArea = createAction(
  '[LocalGovernmentArea] Update',
  props<{ payload: LocalGovernmentAreaFormInterface }>()
);

export const updateLocalGovernmentAreaSuccess = createAction(
  '[LocalGovernmentArea/API] Update Success',
  props<{
    payload: GenericResponseInterface<LocalGovernmentAreaListInterface>;
  }>()
);

export const updateLocalGovernmentAreaFail = createAction(
  '[LocalGovernmentArea/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteLocalGovernmentArea = createAction(
  '[LocalGovernmentArea] Delete',
  props<{ localGovernmentAreaId: string }>()
);

export const deleteLocalGovernmentAreaSuccess = createAction(
  '[LocalGovernmentArea/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteLocalGovernmentAreaFail = createAction(
  '[LocalGovernmentArea/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyLocalGovernmentAreas = createAction(
  '[LocalGovernmentArea] Create Many',
  props<{ payload: LocalGovernmentAreaFormInterface[] }>()
);

export const createManyLocalGovernmentAreasSuccess = createAction(
  '[LocalGovernmentArea/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<LocalGovernmentAreaListInterface[]>;
  }>()
);

export const createManyLocalGovernmentAreasFail = createAction(
  '[LocalGovernmentArea/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyLocalGovernmentAreas = createAction(
  '[LocalGovernmentArea] Update Many',
  props<{ payload: LocalGovernmentAreaFormInterface[] }>()
);

export const updateManyLocalGovernmentAreasSuccess = createAction(
  '[LocalGovernmentArea/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<LocalGovernmentAreaListInterface[]>;
  }>()
);

export const updateManyLocalGovernmentAreasFail = createAction(
  '[LocalGovernmentArea/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyLocalGovernmentAreas = createAction(
  '[LocalGovernmentArea] Delete Many',
  props<{ localGovernmentAreaIds: string[] }>()
);

export const deleteManyLocalGovernmentAreasSuccess = createAction(
  '[LocalGovernmentArea/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyLocalGovernmentAreasFail = createAction(
  '[LocalGovernmentArea/API] Delete Many Fail',
  props<{ error: string }>()
);
