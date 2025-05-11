import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentClassListInterface,
  StudentClassFormInterface,
} from '../../types';

export const getStudentClassList = createAction(
  '[StudentClass] Get StudentClass List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getStudentClassListSuccess = createAction(
  '[StudentClass/API] Get StudentClass List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<StudentClassListInterface[]>
    >;
  }>()
);

export const getStudentClassListFail = createAction(
  '[StudentClass/API] Get StudentClass List Fail',
  props<{ error: string }>()
);

export const getStudentClassById = createAction(
  '[StudentClass] Get StudentClass By Id',
  props<{ studentClassId: string }>()
);

export const getStudentClassByIdSuccess = createAction(
  '[StudentClass/API] Get StudentClass By Id Success',
  props<{
    payload: GenericResponseInterface<StudentClassListInterface>;
  }>()
);

export const getStudentClassByIdFail = createAction(
  '[StudentClass/API] Get StudentClass By Id Fail',
  props<{ error: string }>()
);

export const createStudentClass = createAction(
  '[StudentClass] Create StudentClass',
  props<{ payload: StudentClassFormInterface }>()
);

export const createStudentClassSuccess = createAction(
  '[StudentClass/API] Create StudentClass Success',
  props<{ message: string; studentClass: StudentClassListInterface }>()
);

export const createStudentClassFail = createAction(
  '[StudentClass/API] Create StudentClass Fail',
  props<{ error: string }>()
);

export const editStudentClass = createAction(
  '[StudentClass] Edit StudentClass',
  props<{ payload: StudentClassFormInterface }>()
);

export const editStudentClassSuccess = createAction(
  '[StudentClass/API] Edit StudentClass Success',
  props<{ message: string; studentClass: StudentClassListInterface }>()
);

export const editStudentClassFail = createAction(
  '[StudentClass/API] Edit StudentClass Fail',
  props<{ error: string }>()
);
