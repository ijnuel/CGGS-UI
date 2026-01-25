import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
  ClassLevelListInterface,
  ClassLevelFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getClassLevelAll = createAction('[ClassLevel] Get All', props<{ query?: QueryInterface }>());

export const getClassLevelAllSuccess = createAction(
  '[ClassLevel/API] Get All Success',
  props<{
    payload: GenericResponseInterface<ClassLevelListInterface[]>;
  }>()
);

export const getClassLevelAllFail = createAction(
  '[ClassLevel/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getClassLevelList = createAction(
  '[ClassLevel] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getClassLevelListSuccess = createAction(
  '[ClassLevel/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<ClassLevelListInterface[]>>;
  }>()
);

export const getClassLevelListFail = createAction(
  '[ClassLevel/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getClassLevelById = createAction(
  '[ClassLevel] Get By Id',
  props<{ classLevelId: string }>()
);

export const getClassLevelByIdSuccess = createAction(
  '[ClassLevel/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<ClassLevelListInterface>;
  }>()
);

export const getClassLevelByIdFail = createAction(
  '[ClassLevel/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getClassLevelByProperties = createAction(
  '[ClassLevel] Get By Properties',
  props<{ properties: Partial<ClassLevelFormInterface> }>()
);

export const getClassLevelByPropertiesSuccess = createAction(
  '[ClassLevel/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<ClassLevelListInterface[]>;
  }>()
);

export const getClassLevelByPropertiesFail = createAction(
  '[ClassLevel/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const classLevelExists = createAction(
  '[ClassLevel] Exists',
  props<{ properties: Partial<ClassLevelFormInterface> }>()
);

export const classLevelExistsSuccess = createAction(
  '[ClassLevel/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const classLevelExistsFail = createAction(
  '[ClassLevel/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const classLevelCount = createAction('[ClassLevel] Count');

export const classLevelCountSuccess = createAction(
  '[ClassLevel/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const classLevelCountFail = createAction(
  '[ClassLevel/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createClassLevel = createAction(
  '[ClassLevel] Create',
  props<{ payload: ClassLevelFormInterface }>()
);

export const createClassLevelSuccess = createAction(
  '[ClassLevel/API] Create Success',
  props<{
    payload: GenericResponseInterface<ClassLevelListInterface>;
  }>()
);

export const createClassLevelFail = createAction(
  '[ClassLevel/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateClassLevel = createAction(
  '[ClassLevel] Update',
  props<{ payload: ClassLevelFormInterface }>()
);

export const updateClassLevelSuccess = createAction(
  '[ClassLevel/API] Update Success',
  props<{
    payload: GenericResponseInterface<ClassLevelListInterface>;
  }>()
);

export const updateClassLevelFail = createAction(
  '[ClassLevel/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteClassLevel = createAction(
  '[ClassLevel] Delete',
  props<{ classLevelId: string }>()
);

export const deleteClassLevelSuccess = createAction(
  '[ClassLevel/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteClassLevelFail = createAction(
  '[ClassLevel/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyClassLevels = createAction(
  '[ClassLevel] Create Many',
  props<{ payload: ClassLevelFormInterface[] }>()
);

export const createManyClassLevelsSuccess = createAction(
  '[ClassLevel/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<ClassLevelListInterface[]>;
  }>()
);

export const createManyClassLevelsFail = createAction(
  '[ClassLevel/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyClassLevels = createAction(
  '[ClassLevel] Update Many',
  props<{ payload: ClassLevelFormInterface[] }>()
);

export const updateManyClassLevelsSuccess = createAction(
  '[ClassLevel/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<ClassLevelListInterface[]>;
  }>()
);

export const updateManyClassLevelsFail = createAction(
  '[ClassLevel/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyClassLevels = createAction(
  '[ClassLevel] Delete Many',
  props<{ classLevelIds: string[] }>()
);

export const deleteManyClassLevelsSuccess = createAction(
  '[ClassLevel/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyClassLevelsFail = createAction(
  '[ClassLevel/API] Delete Many Fail',
  props<{ error: string }>()
);
