import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
  ClassListInterface,
  ClassFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getClassAll = createAction('[Class] Get All', props<{ query?: QueryInterface }>());

export const getClassAllSuccess = createAction(
  '[Class/API] Get All Success',
  props<{
    payload: GenericResponseInterface<ClassListInterface[]>;
  }>()
);

export const getClassAllFail = createAction(
  '[Class/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getClassList = createAction(
  '[Class] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getClassListSuccess = createAction(
  '[Class/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<ClassListInterface[]>>;
  }>()
);

export const getClassListFail = createAction(
  '[Class/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getClassById = createAction(
  '[Class] Get By Id',
  props<{ classId: string }>()
);

export const getClassByIdSuccess = createAction(
  '[Class/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<ClassListInterface>;
  }>()
);

export const getClassByIdFail = createAction(
  '[Class/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getClassByProperties = createAction(
  '[Class] Get By Properties',
  props<{ properties: Partial<ClassFormInterface> }>()
);

export const getClassByPropertiesSuccess = createAction(
  '[Class/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<ClassListInterface[]>;
  }>()
);

export const getClassByPropertiesFail = createAction(
  '[Class/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const classExists = createAction(
  '[Class] Exists',
  props<{ properties: Partial<ClassFormInterface> }>()
);

export const classExistsSuccess = createAction(
  '[Class/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const classExistsFail = createAction(
  '[Class/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const classCount = createAction('[Class] Count');

export const classCountSuccess = createAction(
  '[Class/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const classCountFail = createAction(
  '[Class/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createClass = createAction(
  '[Class] Create',
  props<{ payload: ClassFormInterface }>()
);

export const createClassSuccess = createAction(
  '[Class/API] Create Success',
  props<{
    payload: GenericResponseInterface<ClassListInterface>;
  }>()
);

export const createClassFail = createAction(
  '[Class/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateClass = createAction(
  '[Class] Update',
  props<{ payload: ClassFormInterface }>()
);

export const updateClassSuccess = createAction(
  '[Class/API] Update Success',
  props<{
    payload: GenericResponseInterface<ClassListInterface>;
  }>()
);

export const updateClassFail = createAction(
  '[Class/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteClass = createAction(
  '[Class] Delete',
  props<{ classId: string }>()
);

export const deleteClassSuccess = createAction(
  '[Class/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteClassFail = createAction(
  '[Class/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyClasss = createAction(
  '[Class] Create Many',
  props<{ payload: ClassFormInterface[] }>()
);

export const createManyClasssSuccess = createAction(
  '[Class/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<ClassListInterface[]>;
  }>()
);

export const createManyClasssFail = createAction(
  '[Class/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyClasss = createAction(
  '[Class] Update Many',
  props<{ payload: ClassFormInterface[] }>()
);

export const updateManyClasssSuccess = createAction(
  '[Class/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<ClassListInterface[]>;
  }>()
);

export const updateManyClasssFail = createAction(
  '[Class/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyClasss = createAction(
  '[Class] Delete Many',
  props<{ classIds: string[] }>()
);

export const deleteManyClasssSuccess = createAction(
  '[Class/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyClasssFail = createAction(
  '[Class/API] Delete Many Fail',
  props<{ error: string }>()
);
