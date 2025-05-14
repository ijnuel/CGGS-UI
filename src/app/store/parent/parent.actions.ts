import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  ParentListInterface,
  ParentFormInterface,
} from '../../types';

export const getParentList = createAction(
  '[Parent] Get Parent List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getParentListSuccess = createAction(
  '[Parent/API] Get Parent List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<ParentListInterface[]>
    >;
  }>()
);

export const getParentListFail = createAction(
  '[Parent/API] Get Parent List Fail',
  props<{ error: string }>()
);

export const getParentById = createAction(
  '[Parent] Get Parent By Id',
  props<{ parentId: string }>()
);

export const getParentByIdSuccess = createAction(
  '[Parent/API] Get Parent By Id Success',
  props<{
    payload: GenericResponseInterface<ParentListInterface>;
  }>()
);

export const getParentByIdFail = createAction(
  '[Parent/API] Get Parent By Id Fail',
  props<{ error: string }>()
);

export const createParent = createAction(
  '[Parent] Create Parent',
  props<{ payload: ParentFormInterface }>()
);

export const createParentSuccess = createAction(
  '[Parent/API] Create Parent Success',
  props<{ message: string; parent: ParentListInterface }>()
);

export const createParentFail = createAction(
  '[Parent/API] Create Parent Fail',
  props<{ error: string }>()
);

export const editParent = createAction(
  '[Parent] Edit Parent',
  props<{ payload: ParentFormInterface }>()
);

export const editParentSuccess = createAction(
  '[Parent/API] Edit Parent Success',
  props<{ message: string; parent: ParentListInterface }>()
);

export const editParentFail = createAction(
  '[Parent/API] Edit Parent Fail',
  props<{ error: string }>()
);
