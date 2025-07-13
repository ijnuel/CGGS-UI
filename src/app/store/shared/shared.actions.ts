import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface, DropdownListInterface } from '../../types';

export const getGenderList = createAction('[Shared] Get Gender List');

export const getTermList = createAction('[Shared] Get Term List');

export const getGenderListSuccess = createAction(
  '[Shared/API] Get Gender List Success',
  props<{
    payload: GenericResponseInterface<DropdownListInterface[]>;
  }>()
);

export const getTermListSuccess = createAction(
  '[Shared/API] Get Term List Success',
  props<{
    payload: GenericResponseInterface<DropdownListInterface[]>;
  }>()
);

export const getGenderListFail = createAction(
  '[Shared/API] Get Gender List Fail',
  props<{ error: string }>()
);

export const getTermListFail = createAction(
  '[Shared/API] Get Term List Fail',
  props<{ error: string }>()
);

export const getReligionList = createAction('[Shared] Get Religion List');

export const getReligionListSuccess = createAction(
  '[Shared/API] Get Religion List Success',
  props<{
    payload: GenericResponseInterface<DropdownListInterface[]>;
  }>()
);

export const getReligionListFail = createAction(
  '[Shared/API] Get Religion List Fail',
  props<{ error: string }>()
);

export const getCountryList = createAction('[Shared] Get Country List');

export const getCountryListSuccess = createAction(
  '[Shared/API] Get Country List Success',
  props<{
    payload: GenericResponseInterface<DropdownListInterface[]>;
  }>()
);

export const getCountryListFail = createAction(
  '[Shared/API] Get Country List Fail',
  props<{ error: string }>()
);

export const getStateList = createAction(
  '[Shared] Get State List',
  props<{
    countryId: string;
  }>()
);

export const getStateListSuccess = createAction(
  '[Shared/API] Get State List Success',
  props<{
    payload: GenericResponseInterface<DropdownListInterface[]>;
  }>()
);

export const getStateListFail = createAction(
  '[Shared/API] Get State List Fail',
  props<{ error: string }>()
);

export const getLgaList = createAction(
  '[Shared] Get Lga List',
  props<{
    stateId: string;
  }>()
);

export const getLgaListSuccess = createAction(
  '[Shared/API] Get Lga List Success',
  props<{
    payload: GenericResponseInterface<DropdownListInterface[]>;
  }>()
);

export const getLgaListFail = createAction(
  '[Shared/API] Get Lga List Fail',
  props<{ error: string }>()
);

export const getUserTypeList = createAction('[Shared] Get User Type List');

export const getUserTypeListSuccess = createAction(
  '[Shared/API] Get User Type List Success',
  props<{
    payload: GenericResponseInterface<DropdownListInterface[]>;
  }>()
);

export const getUserTypeListFail = createAction(
  '[Shared/API] Get User Type List Fail',
  props<{ error: string }>()
);

export const getSubjectTypeList = createAction('[Shared] Get Subject Type List');

export const getSubjectTypeListSuccess = createAction(
  '[Shared/API] Get Subject Type List Success',
  props<{
    payload: GenericResponseInterface<DropdownListInterface[]>;
  }>()
);

export const getSubjectTypeListFail = createAction(
  '[Shared/API] Get Subject Type List Fail',
  props<{ error: string }>()
);
