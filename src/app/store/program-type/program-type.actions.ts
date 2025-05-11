import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  ProgramTypeListInterface,
  ProgramTypeFormInterface,
} from '../../types';

export const getProgramTypeList = createAction(
  '[ProgramType] Get ProgramType List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getProgramTypeListSuccess = createAction(
  '[ProgramType/API] Get ProgramType List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<ProgramTypeListInterface[]>
    >;
  }>()
);

export const getProgramTypeListFail = createAction(
  '[ProgramType/API] Get ProgramType List Fail',
  props<{ error: string }>()
);

export const getProgramTypeById = createAction(
  '[ProgramType] Get ProgramType By Id',
  props<{ programTypeId: string }>()
);

export const getProgramTypeByIdSuccess = createAction(
  '[ProgramType/API] Get ProgramType By Id Success',
  props<{
    payload: GenericResponseInterface<ProgramTypeListInterface>;
  }>()
);

export const getProgramTypeByIdFail = createAction(
  '[ProgramType/API] Get ProgramType By Id Fail',
  props<{ error: string }>()
);

export const createProgramType = createAction(
  '[ProgramType] Create ProgramType',
  props<{ payload: ProgramTypeFormInterface }>()
);

export const createProgramTypeSuccess = createAction(
  '[ProgramType/API] Create ProgramType Success',
  props<{ message: string; programType: ProgramTypeListInterface }>()
);

export const createProgramTypeFail = createAction(
  '[ProgramType/API] Create ProgramType Fail',
  props<{ error: string }>()
);

export const editProgramType = createAction(
  '[ProgramType] Edit ProgramType',
  props<{ payload: ProgramTypeFormInterface }>()
);

export const editProgramTypeSuccess = createAction(
  '[ProgramType/API] Edit ProgramType Success',
  props<{ message: string; programType: ProgramTypeListInterface }>()
);

export const editProgramTypeFail = createAction(
  '[ProgramType/API] Edit ProgramType Fail',
  props<{ error: string }>()
);
