import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
  SchoolTermSessionListInterface,
  SchoolTermSessionFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getSchoolTermSessionAll = createAction('[SchoolTermSession] Get All', props<{ query?: QueryInterface }>());

export const getSchoolTermSessionAllSuccess = createAction(
  '[SchoolTermSession/API] Get All Success',
  props<{
    payload: GenericResponseInterface<SchoolTermSessionListInterface[]>;
  }>()
);

export const getSchoolTermSessionAllFail = createAction(
  '[SchoolTermSession/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getSchoolTermSessionList = createAction(
  '[SchoolTermSession] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getSchoolTermSessionListSuccess = createAction(
  '[SchoolTermSession/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<SchoolTermSessionListInterface[]>>;
  }>()
);

export const getSchoolTermSessionListFail = createAction(
  '[SchoolTermSession/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getSchoolTermSessionById = createAction(
  '[SchoolTermSession] Get By Id',
  props<{ schoolTermSessionId: string }>()
);

export const getSchoolTermSessionByIdSuccess = createAction(
  '[SchoolTermSession/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<SchoolTermSessionListInterface>;
  }>()
);

export const getSchoolTermSessionByIdFail = createAction(
  '[SchoolTermSession/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getSchoolTermSessionByProperties = createAction(
  '[SchoolTermSession] Get By Properties',
  props<{ properties: Partial<SchoolTermSessionFormInterface> }>()
);

export const getSchoolTermSessionByPropertiesSuccess = createAction(
  '[SchoolTermSession/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<SchoolTermSessionListInterface[]>;
  }>()
);

export const getSchoolTermSessionByPropertiesFail = createAction(
  '[SchoolTermSession/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const schoolTermSessionExists = createAction(
  '[SchoolTermSession] Exists',
  props<{ properties: Partial<SchoolTermSessionFormInterface> }>()
);

export const schoolTermSessionExistsSuccess = createAction(
  '[SchoolTermSession/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const schoolTermSessionExistsFail = createAction(
  '[SchoolTermSession/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const schoolTermSessionCount = createAction('[SchoolTermSession] Count');

export const schoolTermSessionCountSuccess = createAction(
  '[SchoolTermSession/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const schoolTermSessionCountFail = createAction(
  '[SchoolTermSession/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createSchoolTermSession = createAction(
  '[SchoolTermSession] Create',
  props<{ payload: SchoolTermSessionFormInterface }>()
);

export const createSchoolTermSessionSuccess = createAction(
  '[SchoolTermSession/API] Create Success',
  props<{
    payload: GenericResponseInterface<SchoolTermSessionListInterface>;
  }>()
);

export const createSchoolTermSessionFail = createAction(
  '[SchoolTermSession/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateSchoolTermSession = createAction(
  '[SchoolTermSession] Update',
  props<{ payload: SchoolTermSessionFormInterface }>()
);

export const updateSchoolTermSessionSuccess = createAction(
  '[SchoolTermSession/API] Update Success',
  props<{
    payload: GenericResponseInterface<SchoolTermSessionListInterface>;
  }>()
);

export const updateSchoolTermSessionFail = createAction(
  '[SchoolTermSession/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteSchoolTermSession = createAction(
  '[SchoolTermSession] Delete',
  props<{ schoolTermSessionId: string }>()
);

export const deleteSchoolTermSessionSuccess = createAction(
  '[SchoolTermSession/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteSchoolTermSessionFail = createAction(
  '[SchoolTermSession/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManySchoolTermSessions = createAction(
  '[SchoolTermSession] Create Many',
  props<{ payload: SchoolTermSessionFormInterface[] }>()
);

export const createManySchoolTermSessionsSuccess = createAction(
  '[SchoolTermSession/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<SchoolTermSessionListInterface[]>;
  }>()
);

export const createManySchoolTermSessionsFail = createAction(
  '[SchoolTermSession/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManySchoolTermSessions = createAction(
  '[SchoolTermSession] Update Many',
  props<{ payload: SchoolTermSessionFormInterface[] }>()
);

export const updateManySchoolTermSessionsSuccess = createAction(
  '[SchoolTermSession/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<SchoolTermSessionListInterface[]>;
  }>()
);

export const updateManySchoolTermSessionsFail = createAction(
  '[SchoolTermSession/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManySchoolTermSessions = createAction(
  '[SchoolTermSession] Delete Many',
  props<{ schoolTermSessionIds: string[] }>()
);

export const deleteManySchoolTermSessionsSuccess = createAction(
  '[SchoolTermSession/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManySchoolTermSessionsFail = createAction(
  '[SchoolTermSession/API] Delete Many Fail',
  props<{ error: string }>()
);
