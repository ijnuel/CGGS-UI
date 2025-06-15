import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassSubjectListInterface,
  ClassSubjectFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getClassSubjectAll = createAction('[ClassSubject] Get All');

export const getClassSubjectAllSuccess = createAction(
  '[ClassSubject/API] Get All Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectListInterface[]>;
  }>()
);

export const getClassSubjectAllFail = createAction(
  '[ClassSubject/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getClassSubjectList = createAction(
  '[ClassSubject] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getClassSubjectListSuccess = createAction(
  '[ClassSubject/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<ClassSubjectListInterface[]>>;
  }>()
);

export const getClassSubjectListFail = createAction(
  '[ClassSubject/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getClassSubjectById = createAction(
  '[ClassSubject] Get By Id',
  props<{ classSubjectId: string }>()
);

export const getClassSubjectByIdSuccess = createAction(
  '[ClassSubject/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectListInterface>;
  }>()
);

export const getClassSubjectByIdFail = createAction(
  '[ClassSubject/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getClassSubjectByProperties = createAction(
  '[ClassSubject] Get By Properties',
  props<{ properties: Partial<ClassSubjectFormInterface> }>()
);

export const getClassSubjectByPropertiesSuccess = createAction(
  '[ClassSubject/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectListInterface[]>;
  }>()
);

export const getClassSubjectByPropertiesFail = createAction(
  '[ClassSubject/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const classSubjectExists = createAction(
  '[ClassSubject] Exists',
  props<{ properties: Partial<ClassSubjectFormInterface> }>()
);

export const classSubjectExistsSuccess = createAction(
  '[ClassSubject/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const classSubjectExistsFail = createAction(
  '[ClassSubject/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const classSubjectCount = createAction('[ClassSubject] Count');

export const classSubjectCountSuccess = createAction(
  '[ClassSubject/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const classSubjectCountFail = createAction(
  '[ClassSubject/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createClassSubject = createAction(
  '[ClassSubject] Create',
  props<{ payload: ClassSubjectFormInterface }>()
);

export const createClassSubjectSuccess = createAction(
  '[ClassSubject/API] Create Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectListInterface>;
  }>()
);

export const createClassSubjectFail = createAction(
  '[ClassSubject/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateClassSubject = createAction(
  '[ClassSubject] Update',
  props<{ payload: ClassSubjectFormInterface }>()
);

export const updateClassSubjectSuccess = createAction(
  '[ClassSubject/API] Update Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectListInterface>;
  }>()
);

export const updateClassSubjectFail = createAction(
  '[ClassSubject/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteClassSubject = createAction(
  '[ClassSubject] Delete',
  props<{ classSubjectId: string }>()
);

export const deleteClassSubjectSuccess = createAction(
  '[ClassSubject/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteClassSubjectFail = createAction(
  '[ClassSubject/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyClassSubjects = createAction(
  '[ClassSubject] Create Many',
  props<{ payload: ClassSubjectFormInterface[] }>()
);

export const createManyClassSubjectsSuccess = createAction(
  '[ClassSubject/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectListInterface[]>;
  }>()
);

export const createManyClassSubjectsFail = createAction(
  '[ClassSubject/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyClassSubjects = createAction(
  '[ClassSubject] Update Many',
  props<{ payload: ClassSubjectFormInterface[] }>()
);

export const updateManyClassSubjectsSuccess = createAction(
  '[ClassSubject/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectListInterface[]>;
  }>()
);

export const updateManyClassSubjectsFail = createAction(
  '[ClassSubject/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyClassSubjects = createAction(
  '[ClassSubject] Delete Many',
  props<{ classSubjectIds: string[] }>()
);

export const deleteManyClassSubjectsSuccess = createAction(
  '[ClassSubject/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyClassSubjectsFail = createAction(
  '[ClassSubject/API] Delete Many Fail',
  props<{ error: string }>()
);
