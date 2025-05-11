import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassLevelListInterface,
  ClassLevelFormInterface,
} from '../../types';

export const getClassLevelList = createAction(
  '[ClassLevel] Get ClassLevel List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getClassLevelListSuccess = createAction(
  '[ClassLevel/API] Get ClassLevel List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<ClassLevelListInterface[]>
    >;
  }>()
);

export const getClassLevelListFail = createAction(
  '[ClassLevel/API] Get ClassLevel List Fail',
  props<{ error: string }>()
);

export const getClassLevelById = createAction(
  '[ClassLevel] Get ClassLevel By Id',
  props<{ classLevelId: string }>()
);

export const getClassLevelByIdSuccess = createAction(
  '[ClassLevel/API] Get ClassLevel By Id Success',
  props<{
    payload: GenericResponseInterface<ClassLevelListInterface>;
  }>()
);

export const getClassLevelByIdFail = createAction(
  '[ClassLevel/API] Get ClassLevel By Id Fail',
  props<{ error: string }>()
);

export const createClassLevel = createAction(
  '[ClassLevel] Create ClassLevel',
  props<{ payload: ClassLevelFormInterface }>()
);

export const createClassLevelSuccess = createAction(
  '[ClassLevel/API] Create ClassLevel Success',
  props<{ message: string; classLevel: ClassLevelListInterface }>()
);

export const createClassLevelFail = createAction(
  '[ClassLevel/API] Create ClassLevel Fail',
  props<{ error: string }>()
);

export const editClassLevel = createAction(
  '[ClassLevel] Edit ClassLevel',
  props<{ payload: ClassLevelFormInterface }>()
);

export const editClassLevelSuccess = createAction(
  '[ClassLevel/API] Edit ClassLevel Success',
  props<{ message: string; classLevel: ClassLevelListInterface }>()
);

export const editClassLevelFail = createAction(
  '[ClassLevel/API] Edit ClassLevel Fail',
  props<{ error: string }>()
);
