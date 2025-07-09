import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  StaffListInterface,
  StaffFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getStaffAll = createAction('[Staff] Get All');

export const getStaffAllSuccess = createAction(
  '[Staff/API] Get All Success',
  props<{
    payload: GenericResponseInterface<StaffListInterface[]>;
  }>()
);

export const getStaffAllFail = createAction(
  '[Staff/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getStaffList = createAction(
  '[Staff] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getStaffListSuccess = createAction(
  '[Staff/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<StaffListInterface[]>>;
  }>()
);

export const getStaffListFail = createAction(
  '[Staff/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getStaffById = createAction(
  '[Staff] Get By Id',
  props<{ staffId: string }>()
);

export const getStaffByIdSuccess = createAction(
  '[Staff/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<StaffListInterface>;
  }>()
);

export const getStaffByIdFail = createAction(
  '[Staff/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getStaffByProperties = createAction(
  '[Staff] Get By Properties',
  props<{ properties: Partial<StaffFormInterface> }>()
);

export const getStaffByPropertiesSuccess = createAction(
  '[Staff/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<StaffListInterface[]>;
  }>()
);

export const getStaffByPropertiesFail = createAction(
  '[Staff/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const staffExists = createAction(
  '[Staff] Exists',
  props<{ properties: Partial<StaffFormInterface> }>()
);

export const staffExistsSuccess = createAction(
  '[Staff/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const staffExistsFail = createAction(
  '[Staff/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const staffCount = createAction('[Staff] Count');

export const staffCountSuccess = createAction(
  '[Staff/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const staffCountFail = createAction(
  '[Staff/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createStaff = createAction(
  '[Staff] Create',
  props<{ payload: StaffFormInterface }>()
);

export const createStaffSuccess = createAction(
  '[Staff/API] Create Success',
  props<{
    payload: GenericResponseInterface<StaffListInterface>;
  }>()
);

export const createStaffFail = createAction(
  '[Staff/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateStaff = createAction(
  '[Staff] Update',
  props<{ payload: StaffFormInterface }>()
);

export const updateStaffSuccess = createAction(
  '[Staff/API] Update Success',
  props<{
    payload: GenericResponseInterface<StaffListInterface>;
  }>()
);

export const updateStaffFail = createAction(
  '[Staff/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteStaff = createAction(
  '[Staff] Delete',
  props<{ staffId: string }>()
);

export const deleteStaffSuccess = createAction(
  '[Staff/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteStaffFail = createAction(
  '[Staff/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyStaffs = createAction(
  '[Staff] Create Many',
  props<{ payload: StaffFormInterface[] }>()
);

export const createManyStaffsSuccess = createAction(
  '[Staff/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<StaffListInterface[]>;
  }>()
);

export const createManyStaffsFail = createAction(
  '[Staff/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyStaffs = createAction(
  '[Staff] Update Many',
  props<{ payload: StaffFormInterface[] }>()
);

export const updateManyStaffsSuccess = createAction(
  '[Staff/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<StaffListInterface[]>;
  }>()
);

export const updateManyStaffsFail = createAction(
  '[Staff/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyStaffs = createAction(
  '[Staff] Delete Many',
  props<{ staffIds: string[] }>()
);

export const deleteManyStaffsSuccess = createAction(
  '[Staff/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyStaffsFail = createAction(
  '[Staff/API] Delete Many Fail',
  props<{ error: string }>()
);
