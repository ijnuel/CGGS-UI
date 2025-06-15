import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassSubjectAssessmentListInterface,
  ClassSubjectAssessmentFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getClassSubjectAssessmentAll = createAction('[ClassSubjectAssessment] Get All');

export const getClassSubjectAssessmentAllSuccess = createAction(
  '[ClassSubjectAssessment/API] Get All Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectAssessmentListInterface[]>;
  }>()
);

export const getClassSubjectAssessmentAllFail = createAction(
  '[ClassSubjectAssessment/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getClassSubjectAssessmentList = createAction(
  '[ClassSubjectAssessment] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getClassSubjectAssessmentListSuccess = createAction(
  '[ClassSubjectAssessment/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<ClassSubjectAssessmentListInterface[]>>;
  }>()
);

export const getClassSubjectAssessmentListFail = createAction(
  '[ClassSubjectAssessment/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getClassSubjectAssessmentById = createAction(
  '[ClassSubjectAssessment] Get By Id',
  props<{ classSubjectAssessmentId: string }>()
);

export const getClassSubjectAssessmentByIdSuccess = createAction(
  '[ClassSubjectAssessment/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectAssessmentListInterface>;
  }>()
);

export const getClassSubjectAssessmentByIdFail = createAction(
  '[ClassSubjectAssessment/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getClassSubjectAssessmentByProperties = createAction(
  '[ClassSubjectAssessment] Get By Properties',
  props<{ properties: Partial<ClassSubjectAssessmentFormInterface> }>()
);

export const getClassSubjectAssessmentByPropertiesSuccess = createAction(
  '[ClassSubjectAssessment/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectAssessmentListInterface[]>;
  }>()
);

export const getClassSubjectAssessmentByPropertiesFail = createAction(
  '[ClassSubjectAssessment/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const classSubjectAssessmentExists = createAction(
  '[ClassSubjectAssessment] Exists',
  props<{ properties: Partial<ClassSubjectAssessmentFormInterface> }>()
);

export const classSubjectAssessmentExistsSuccess = createAction(
  '[ClassSubjectAssessment/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const classSubjectAssessmentExistsFail = createAction(
  '[ClassSubjectAssessment/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const classSubjectAssessmentCount = createAction('[ClassSubjectAssessment] Count');

export const classSubjectAssessmentCountSuccess = createAction(
  '[ClassSubjectAssessment/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const classSubjectAssessmentCountFail = createAction(
  '[ClassSubjectAssessment/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createClassSubjectAssessment = createAction(
  '[ClassSubjectAssessment] Create',
  props<{ payload: ClassSubjectAssessmentFormInterface }>()
);

export const createClassSubjectAssessmentSuccess = createAction(
  '[ClassSubjectAssessment/API] Create Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectAssessmentListInterface>;
  }>()
);

export const createClassSubjectAssessmentFail = createAction(
  '[ClassSubjectAssessment/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateClassSubjectAssessment = createAction(
  '[ClassSubjectAssessment] Update',
  props<{ payload: ClassSubjectAssessmentFormInterface }>()
);

export const updateClassSubjectAssessmentSuccess = createAction(
  '[ClassSubjectAssessment/API] Update Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectAssessmentListInterface>;
  }>()
);

export const updateClassSubjectAssessmentFail = createAction(
  '[ClassSubjectAssessment/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteClassSubjectAssessment = createAction(
  '[ClassSubjectAssessment] Delete',
  props<{ classSubjectAssessmentId: string }>()
);

export const deleteClassSubjectAssessmentSuccess = createAction(
  '[ClassSubjectAssessment/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteClassSubjectAssessmentFail = createAction(
  '[ClassSubjectAssessment/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyClassSubjectAssessments = createAction(
  '[ClassSubjectAssessment] Create Many',
  props<{ payload: ClassSubjectAssessmentFormInterface[] }>()
);

export const createManyClassSubjectAssessmentsSuccess = createAction(
  '[ClassSubjectAssessment/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectAssessmentListInterface[]>;
  }>()
);

export const createManyClassSubjectAssessmentsFail = createAction(
  '[ClassSubjectAssessment/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyClassSubjectAssessments = createAction(
  '[ClassSubjectAssessment] Update Many',
  props<{ payload: ClassSubjectAssessmentFormInterface[] }>()
);

export const updateManyClassSubjectAssessmentsSuccess = createAction(
  '[ClassSubjectAssessment/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<ClassSubjectAssessmentListInterface[]>;
  }>()
);

export const updateManyClassSubjectAssessmentsFail = createAction(
  '[ClassSubjectAssessment/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyClassSubjectAssessments = createAction(
  '[ClassSubjectAssessment] Delete Many',
  props<{ classSubjectAssessmentIds: string[] }>()
);

export const deleteManyClassSubjectAssessmentsSuccess = createAction(
  '[ClassSubjectAssessment/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyClassSubjectAssessmentsFail = createAction(
  '[ClassSubjectAssessment/API] Delete Many Fail',
  props<{ error: string }>()
);
