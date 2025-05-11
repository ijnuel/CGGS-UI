import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  StateListInterface,
  StateFormInterface,
} from '../../types';

export const getStateList = createAction(
  '[State] Get State List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getStateListSuccess = createAction(
  '[State/API] Get State List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<StateListInterface[]>
    >;
  }>()
);

export const getStateListFail = createAction(
  '[State/API] Get State List Fail',
  props<{ error: string }>()
);

export const getStateById = createAction(
  '[State] Get State By Id',
  props<{ stateId: string }>()
);

export const getStateByIdSuccess = createAction(
  '[State/API] Get State By Id Success',
  props<{
    payload: GenericResponseInterface<StateListInterface>;
  }>()
);

export const getStateByIdFail = createAction(
  '[State/API] Get State By Id Fail',
  props<{ error: string }>()
);

export const createState = createAction(
  '[State] Create State',
  props<{ payload: StateFormInterface }>()
);

export const createStateSuccess = createAction(
  '[State/API] Create State Success',
  props<{ message: string; state: StateListInterface }>()
);

export const createStateFail = createAction(
  '[State/API] Create State Fail',
  props<{ error: string }>()
);

export const editState = createAction(
  '[State] Edit State',
  props<{ payload: StateFormInterface }>()
);

export const editStateSuccess = createAction(
  '[State/API] Edit State Success',
  props<{ message: string; state: StateListInterface }>()
);

export const editStateFail = createAction(
  '[State/API] Edit State Fail',
  props<{ error: string }>()
);
