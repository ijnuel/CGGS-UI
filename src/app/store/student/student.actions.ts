import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentListInterface,
  StudentFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getStudentAll = createAction('[Student] Get All');

export const getStudentAllSuccess = createAction(
  '[Student/API] Get All Success',
  props<{
    payload: GenericResponseInterface<StudentListInterface[]>;
  }>()
);

export const getStudentAllFail = createAction(
  '[Student/API] Get All Fail',
  props<{ error: string }>()
);

// Get Students Without Class
export const getStudentsWithoutClass = createAction(
  '[Student] Get Students Without Class',
  props<{ sessionId: string }>()
);

export const getStudentsWithoutClassSuccess = createAction(
  '[Student/API] Get Students Without Class Success',
  props<{
    payload: GenericResponseInterface<StudentListInterface[]>;
  }>()
);

export const getStudentsWithoutClassFail = createAction(
  '[Student/API] Get Students Without Class Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getStudentList = createAction(
  '[Student] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getStudentListSuccess = createAction(
  '[Student/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<StudentListInterface[]>>;
  }>()
);

export const getStudentListFail = createAction(
  '[Student/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getStudentById = createAction(
  '[Student] Get By Id',
  props<{ studentId: string }>()
);

export const getStudentByIdSuccess = createAction(
  '[Student/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<StudentListInterface>;
  }>()
);

export const getStudentByIdFail = createAction(
  '[Student/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getStudentByProperties = createAction(
  '[Student] Get By Properties',
  props<{ properties: Partial<StudentFormInterface> }>()
);

export const getStudentByPropertiesSuccess = createAction(
  '[Student/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<StudentListInterface[]>;
  }>()
);

export const getStudentByPropertiesFail = createAction(
  '[Student/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const studentExists = createAction(
  '[Student] Exists',
  props<{ properties: Partial<StudentFormInterface> }>()
);

export const studentExistsSuccess = createAction(
  '[Student/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const studentExistsFail = createAction(
  '[Student/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const studentCount = createAction('[Student] Count');

export const studentCountSuccess = createAction(
  '[Student/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const studentCountFail = createAction(
  '[Student/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createStudent = createAction(
  '[Student] Create',
  props<{ payload: StudentFormInterface }>()
);

export const createStudentSuccess = createAction(
  '[Student/API] Create Success',
  props<{
    payload: GenericResponseInterface<StudentListInterface>;
  }>()
);

export const createStudentFail = createAction(
  '[Student/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updateStudent = createAction(
  '[Student] Update',
  props<{ payload: StudentFormInterface }>()
);

export const updateStudentSuccess = createAction(
  '[Student/API] Update Success',
  props<{
    payload: GenericResponseInterface<StudentListInterface>;
  }>()
);

export const updateStudentFail = createAction(
  '[Student/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deleteStudent = createAction(
  '[Student] Delete',
  props<{ studentId: string }>()
);

export const deleteStudentSuccess = createAction(
  '[Student/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteStudentFail = createAction(
  '[Student/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyStudents = createAction(
  '[Student] Create Many',
  props<{ payload: StudentFormInterface[] }>()
);

export const createManyStudentsSuccess = createAction(
  '[Student/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<StudentListInterface[]>;
  }>()
);

export const createManyStudentsFail = createAction(
  '[Student/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyStudents = createAction(
  '[Student] Update Many',
  props<{ payload: StudentFormInterface[] }>()
);

export const updateManyStudentsSuccess = createAction(
  '[Student/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<StudentListInterface[]>;
  }>()
);

export const updateManyStudentsFail = createAction(
  '[Student/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyStudents = createAction(
  '[Student] Delete Many',
  props<{ studentIds: string[] }>()
);

export const deleteManyStudentsSuccess = createAction(
  '[Student/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyStudentsFail = createAction(
  '[Student/API] Delete Many Fail',
  props<{ error: string }>()
);
