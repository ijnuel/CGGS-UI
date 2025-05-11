import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  LocalGovernmentAreaListInterface,
  LocalGovernmentAreaFormInterface,
} from '../../types';

export const getLocalGovernmentAreaList = createAction(
  '[LocalGovernmentArea] Get LocalGovernmentArea List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getLocalGovernmentAreaListSuccess = createAction(
  '[LocalGovernmentArea/API] Get LocalGovernmentArea List Success',
  props<{
    payload: GenericResponseInterface<
      PaginatedResponseInterface<LocalGovernmentAreaListInterface[]>
    >;
  }>()
);

export const getLocalGovernmentAreaListFail = createAction(
  '[LocalGovernmentArea/API] Get LocalGovernmentArea List Fail',
  props<{ error: string }>()
);

export const getLocalGovernmentAreaById = createAction(
  '[LocalGovernmentArea] Get LocalGovernmentArea By Id',
  props<{ localGovernmentAreaId: string }>()
);

export const getLocalGovernmentAreaByIdSuccess = createAction(
  '[LocalGovernmentArea/API] Get LocalGovernmentArea By Id Success',
  props<{
    payload: GenericResponseInterface<LocalGovernmentAreaListInterface>;
  }>()
);

export const getLocalGovernmentAreaByIdFail = createAction(
  '[LocalGovernmentArea/API] Get LocalGovernmentArea By Id Fail',
  props<{ error: string }>()
);

export const createLocalGovernmentArea = createAction(
  '[LocalGovernmentArea] Create LocalGovernmentArea',
  props<{ payload: LocalGovernmentAreaFormInterface }>()
);

export const createLocalGovernmentAreaSuccess = createAction(
  '[LocalGovernmentArea/API] Create LocalGovernmentArea Success',
  props<{ message: string; localGovernmentArea: LocalGovernmentAreaListInterface }>()
);

export const createLocalGovernmentAreaFail = createAction(
  '[LocalGovernmentArea/API] Create LocalGovernmentArea Fail',
  props<{ error: string }>()
);

export const editLocalGovernmentArea = createAction(
  '[LocalGovernmentArea] Edit LocalGovernmentArea',
  props<{ payload: LocalGovernmentAreaFormInterface }>()
);

export const editLocalGovernmentAreaSuccess = createAction(
  '[LocalGovernmentArea/API] Edit LocalGovernmentArea Success',
  props<{ message: string; localGovernmentArea: LocalGovernmentAreaListInterface }>()
);

export const editLocalGovernmentAreaFail = createAction(
  '[LocalGovernmentArea/API] Edit LocalGovernmentArea Fail',
  props<{ error: string }>()
);
