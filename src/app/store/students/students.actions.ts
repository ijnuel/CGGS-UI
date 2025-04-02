import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentsListInterface,
  StudentFormInterface,
} from '../../types';

export const getStudentsList = createAction(
  '[Students] Get Students List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getStudentsListSuccess = createAction(
  '[Students/API] Get Students List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<StudentsListInterface[]>
    >;
  }>()
);

export const getStudentsListFail = createAction(
  '[Students/API] Get Students List Fail',
  props<{ error: string }>()
);

export const getStudentById = createAction(
  '[Students] Get Student By Id',
  props<{ studentId: string }>()
);

export const getStudentByIdSuccess = createAction(
  '[Students/API] Get Student By Id Success',
  props<{
    payload: GenericResponseInterface<StudentsListInterface>;
  }>()
);

export const getStudentByIdFail = createAction(
  '[Students/API] Get Students By Id Fail',
  props<{ error: string }>()
);

export const createStudent = createAction(
  '[Students] Create Students',
  props<{ payload: StudentFormInterface }>()
);

export const createStudentSuccess = createAction(
  '[Student/API] Create Student Success',
  props<{ message: string; student: StudentsListInterface }>()
);

export const createStudentFail = createAction(
  '[Student/API] Create Student Fail',
  props<{ error: string }>()
);

export const editStudent = createAction(
  '[Students] Edit Students',
  props<{ payload: StudentFormInterface }>()
);

export const editStudentSuccess = createAction(
  '[Student/API] Edit Student Success',
  props<{ message: string; student: StudentsListInterface }>()
);

export const editStudentFail = createAction(
  '[Student/API] Edit Student Fail',
  props<{ error: string }>()
);
