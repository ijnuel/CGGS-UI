import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassListInterface,
  ClassFormInterface,
} from '../../types';

export const getClassList = createAction(
  '[Class] Get Class List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getClassListSuccess = createAction(
  '[Class/API] Get Class List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<ClassListInterface[]>
    >;
  }>()
);

export const getClassListFail = createAction(
  '[Class/API] Get Class List Fail',
  props<{ error: string }>()
);

export const getClassById = createAction(
  '[Class] Get Class By Id',
  props<{ classId: string }>()
);

export const getClassByIdSuccess = createAction(
  '[Class/API] Get Class By Id Success',
  props<{
    payload: GenericResponseInterface<ClassListInterface>;
  }>()
);

export const getClassByIdFail = createAction(
  '[Class/API] Get Class By Id Fail',
  props<{ error: string }>()
);

export const createClass = createAction(
  '[Class] Create Class',
  props<{ payload: ClassFormInterface }>()
);

export const createClassSuccess = createAction(
  '[Class/API] Create Class Success',
  props<{ message: string; class: ClassListInterface }>()
);

export const createClassFail = createAction(
  '[Class/API] Create Class Fail',
  props<{ error: string }>()
);

export const editClass = createAction(
  '[Class] Edit Class',
  props<{ payload: ClassFormInterface }>()
);

export const editClassSuccess = createAction(
  '[Class/API] Edit Class Success',
  props<{ message: string; class: ClassListInterface }>()
);

export const editClassFail = createAction(
  '[Class/API] Edit Class Fail',
  props<{ error: string }>()
);
