import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  FamilyListInterface,
  FamilyFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getFamilyAll = createAction('[Family] Get All');

export const getFamilyAllSuccess = createAction(
  '[Family/API] Get All Success',
  props<{
    payload: GenericResponseInterface<FamilyListInterface[]>;
  }>()
);

export const getFamilyAllFail = createAction(
  '[Family/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getFamilyList = createAction(
  '[Family] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getFamilyListSuccess = createAction(
  '[Family/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<FamilyListInterface[]>>;
  }>()
);

export const getFamilyListFail = createAction(
  '[Family/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getFamilyById = createAction(
  '[Family] Get By Id',
  props<{ familyId: string }>()
);

export const getFamilyByIdSuccess = createAction(
  '[Family/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<FamilyListInterface>;
  }>()
);

export const getFamilyByIdFail = createAction(
  '[Family/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getFamilyByProperties = createAction(
  '[Family] Get By Properties',
  props<{ properties: Partial<FamilyFormInterface> }>()
);

export const getFamilyByPropertiesSuccess = createAction(
  '[Family/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<FamilyListInterface[]>;
  }>()
);

export const getFamilyByPropertiesFail = createAction(
  '[Family/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const familyExists = createAction(
  '[Family] Exists',
  props<{ properties: Partial<FamilyFormInterface> }>()
);

export const familyExistsSuccess = createAction(
  '[Family/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const familyExistsFail = createAction(
  '[Family/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const familyCount = createAction('[Family] Count');

export const familyCountSuccess = createAction(
  '[Family/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const familyCountFail = createAction(
  '[Family/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createFamily = createAction(
  '[Family] Create',
  props<{ payload: FamilyFormInterface }>()
);

export const createFamilySuccess = createAction(
  '[Family/API] Create Success',
  props<{
    payload: GenericResponseInterface<FamilyListInterface>;
  }>()
);

export const createFamilyFail = createAction(
  '[Family/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateFamily = createAction(
  '[Family] Update',
  props<{ payload: FamilyFormInterface }>()
);

export const updateFamilySuccess = createAction(
  '[Family/API] Update Success',
  props<{
    payload: GenericResponseInterface<FamilyListInterface>;
  }>()
);

export const updateFamilyFail = createAction(
  '[Family/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteFamily = createAction(
  '[Family] Delete',
  props<{ familyId: string }>()
);

export const deleteFamilySuccess = createAction(
  '[Family/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteFamilyFail = createAction(
  '[Family/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyFamilys = createAction(
  '[Family] Create Many',
  props<{ payload: FamilyFormInterface[] }>()
);

export const createManyFamilysSuccess = createAction(
  '[Family/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<FamilyListInterface[]>;
  }>()
);

export const createManyFamilysFail = createAction(
  '[Family/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyFamilys = createAction(
  '[Family] Update Many',
  props<{ payload: FamilyFormInterface[] }>()
);

export const updateManyFamilysSuccess = createAction(
  '[Family/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<FamilyListInterface[]>;
  }>()
);

export const updateManyFamilysFail = createAction(
  '[Family/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyFamilys = createAction(
  '[Family] Delete Many',
  props<{ familyIds: string[] }>()
);

export const deleteManyFamilysSuccess = createAction(
  '[Family/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyFamilysFail = createAction(
  '[Family/API] Delete Many Fail',
  props<{ error: string }>()
);
