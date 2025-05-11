import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  TeacherListInterface,
  TeacherFormInterface,
} from '../../types';

export const getTeacherList = createAction(
  '[Teacher] Get Teacher List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getTeacherListSuccess = createAction(
  '[Teacher/API] Get Teacher List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<TeacherListInterface[]>
    >;
  }>()
);

export const getTeacherListFail = createAction(
  '[Teacher/API] Get Teacher List Fail',
  props<{ error: string }>()
);

export const getTeacherById = createAction(
  '[Teacher] Get Teacher By Id',
  props<{ teacherId: string }>()
);

export const getTeacherByIdSuccess = createAction(
  '[Teacher/API] Get Teacher By Id Success',
  props<{
    payload: GenericResponseInterface<TeacherListInterface>;
  }>()
);

export const getTeacherByIdFail = createAction(
  '[Teacher/API] Get Teacher By Id Fail',
  props<{ error: string }>()
);

export const createTeacher = createAction(
  '[Teacher] Create Teacher',
  props<{ payload: TeacherFormInterface }>()
);

export const createTeacherSuccess = createAction(
  '[Teacher/API] Create Teacher Success',
  props<{ message: string; teacher: TeacherListInterface }>()
);

export const createTeacherFail = createAction(
  '[Teacher/API] Create Teacher Fail',
  props<{ error: string }>()
);

export const editTeacher = createAction(
  '[Teacher] Edit Teacher',
  props<{ payload: TeacherFormInterface }>()
);

export const editTeacherSuccess = createAction(
  '[Teacher/API] Edit Teacher Success',
  props<{ message: string; teacher: TeacherListInterface }>()
);

export const editTeacherFail = createAction(
  '[Teacher/API] Edit Teacher Fail',
  props<{ error: string }>()
);
