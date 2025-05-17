import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  FamilyListInterface,
  FamilyFormInterface,
} from '../../types';

export const getFamilyList = createAction(
  '[Family] Get Family List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getFamilyListSuccess = createAction(
  '[Family/API] Get Family List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<FamilyListInterface[]>
    >;
  }>()
);

export const getFamilyListFail = createAction(
  '[Family/API] Get Family List Fail',
  props<{ error: string }>()
);

export const getFamilyById = createAction(
  '[Family] Get Family By Id',
  props<{ familyId: string }>()
);

export const getFamilyByIdSuccess = createAction(
  '[Family/API] Get Family By Id Success',
  props<{
    payload: GenericResponseInterface<FamilyListInterface>;
  }>()
);

export const getFamilyByIdFail = createAction(
  '[Family/API] Get Family By Id Fail',
  props<{ error: string }>()
);

export const createFamily = createAction(
  '[Family] Create Family',
  props<{ payload: FamilyFormInterface }>()
);

export const createFamilySuccess = createAction(
  '[Family/API] Create Family Success',
  props<{ message: string; family: FamilyListInterface }>()
);

export const createFamilyFail = createAction(
  '[Family/API] Create Family Fail',
  props<{ error: string }>()
);

export const editFamily = createAction(
  '[Family] Edit Family',
  props<{ payload: FamilyFormInterface }>()
);

export const editFamilySuccess = createAction(
  '[Family/API] Edit Family Success',
  props<{ message: string; family: FamilyListInterface }>()
);

export const editFamilyFail = createAction(
  '[Family/API] Edit Family Fail',
  props<{ error: string }>()
);
