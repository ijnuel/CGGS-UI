import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
  SubjectListInterface,
  SubjectFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getSubjectAll = createAction('[Subject] Get All', props<{ query?: QueryInterface }>());

export const getSubjectAllSuccess = createAction(
  '[Subject/API] Get All Success',
  props<{
    payload: GenericResponseInterface<SubjectListInterface[]>;
  }>()
);

export const getSubjectAllFail = createAction(
  '[Subject/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getSubjectList = createAction(
  '[Subject] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getSubjectListSuccess = createAction(
  '[Subject/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<SubjectListInterface[]>>;
  }>()
);

export const getSubjectListFail = createAction(
  '[Subject/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getSubjectById = createAction(
  '[Subject] Get By Id',
  props<{ subjectId: string }>()
);

export const getSubjectByIdSuccess = createAction(
  '[Subject/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<SubjectListInterface>;
  }>()
);

export const getSubjectByIdFail = createAction(
  '[Subject/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getSubjectByProperties = createAction(
  '[Subject] Get By Properties',
  props<{ properties: Partial<SubjectFormInterface> }>()
);

export const getSubjectByPropertiesSuccess = createAction(
  '[Subject/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<SubjectListInterface[]>;
  }>()
);

export const getSubjectByPropertiesFail = createAction(
  '[Subject/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const subjectExists = createAction(
  '[Subject] Exists',
  props<{ properties: Partial<SubjectFormInterface> }>()
);

export const subjectExistsSuccess = createAction(
  '[Subject/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const subjectExistsFail = createAction(
  '[Subject/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const subjectCount = createAction('[Subject] Count');

export const subjectCountSuccess = createAction(
  '[Subject/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const subjectCountFail = createAction(
  '[Subject/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createSubject = createAction(
  '[Subject] Create',
  props<{ payload: SubjectFormInterface }>()
);

export const createSubjectSuccess = createAction(
  '[Subject/API] Create Success',
  props<{
    payload: GenericResponseInterface<SubjectListInterface>;
  }>()
);

export const createSubjectFail = createAction(
  '[Subject/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateSubject = createAction(
  '[Subject] Update',
  props<{ payload: SubjectFormInterface }>()
);

export const updateSubjectSuccess = createAction(
  '[Subject/API] Update Success',
  props<{
    payload: GenericResponseInterface<SubjectListInterface>;
  }>()
);

export const updateSubjectFail = createAction(
  '[Subject/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteSubject = createAction(
  '[Subject] Delete',
  props<{ subjectId: string }>()
);

export const deleteSubjectSuccess = createAction(
  '[Subject/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteSubjectFail = createAction(
  '[Subject/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManySubjects = createAction(
  '[Subject] Create Many',
  props<{ payload: SubjectFormInterface[] }>()
);

export const createManySubjectsSuccess = createAction(
  '[Subject/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<SubjectListInterface[]>;
  }>()
);

export const createManySubjectsFail = createAction(
  '[Subject/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManySubjects = createAction(
  '[Subject] Update Many',
  props<{ payload: SubjectFormInterface[] }>()
);

export const updateManySubjectsSuccess = createAction(
  '[Subject/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<SubjectListInterface[]>;
  }>()
);

export const updateManySubjectsFail = createAction(
  '[Subject/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManySubjects = createAction(
  '[Subject] Delete Many',
  props<{ subjectIds: string[] }>()
);

export const deleteManySubjectsSuccess = createAction(
  '[Subject/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManySubjectsFail = createAction(
  '[Subject/API] Delete Many Fail',
  props<{ error: string }>()
);
