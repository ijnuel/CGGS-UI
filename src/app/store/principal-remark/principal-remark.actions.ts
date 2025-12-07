import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  PrincipalRemarkListInterface,
  PrincipalRemarkFormInterface,
} from '../../types';

// Get All (non-paginated)
export const getPrincipalRemarkAll = createAction('[PrincipalRemark] Get All');

export const getPrincipalRemarkAllSuccess = createAction(
  '[PrincipalRemark/API] Get All Success',
  props<{
    payload: GenericResponseInterface<PrincipalRemarkListInterface[]>;
  }>()
);

export const getPrincipalRemarkAllFail = createAction(
  '[PrincipalRemark/API] Get All Fail',
  props<{ error: string }>()
);

// Get All Paginated
export const getPrincipalRemarkList = createAction(
  '[PrincipalRemark] Get List',
  props<{
    pageQuery: PageQueryInterface;
  }>()
);

export const getPrincipalRemarkListSuccess = createAction(
  '[PrincipalRemark/API] Get List Success',
  props<{
    payload: GenericResponseInterface<PaginatedResponseInterface<PrincipalRemarkListInterface[]>>;
  }>()
);

export const getPrincipalRemarkListFail = createAction(
  '[PrincipalRemark/API] Get List Fail',
  props<{ error: string }>()
);

// Get By Id
export const getPrincipalRemarkById = createAction(
  '[PrincipalRemark] Get By Id',
  props<{ principalRemarkId: string }>()
);

export const getPrincipalRemarkByIdSuccess = createAction(
  '[PrincipalRemark/API] Get By Id Success',
  props<{
    payload: GenericResponseInterface<PrincipalRemarkListInterface>;
  }>()
);

export const getPrincipalRemarkByIdFail = createAction(
  '[PrincipalRemark/API] Get By Id Fail',
  props<{ error: string }>()
);

// Get By Properties
export const getPrincipalRemarkByProperties = createAction(
  '[PrincipalRemark] Get By Properties',
  props<{ properties: Partial<PrincipalRemarkFormInterface> }>()
);

export const getPrincipalRemarkByPropertiesSuccess = createAction(
  '[PrincipalRemark/API] Get By Properties Success',
  props<{
    payload: GenericResponseInterface<PrincipalRemarkListInterface[]>;
  }>()
);

export const getPrincipalRemarkByPropertiesFail = createAction(
  '[PrincipalRemark/API] Get By Properties Fail',
  props<{ error: string }>()
);

// Exists
export const principalRemarkExists = createAction(
  '[PrincipalRemark] Exists',
  props<{ properties: Partial<PrincipalRemarkFormInterface> }>()
);

export const principalRemarkExistsSuccess = createAction(
  '[PrincipalRemark/API] Exists Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const principalRemarkExistsFail = createAction(
  '[PrincipalRemark/API] Exists Fail',
  props<{ error: string }>()
);

// Count
export const principalRemarkCount = createAction('[PrincipalRemark] Count');

export const principalRemarkCountSuccess = createAction(
  '[PrincipalRemark/API] Count Success',
  props<{
    payload: GenericResponseInterface<number>;
  }>()
);

export const principalRemarkCountFail = createAction(
  '[PrincipalRemark/API] Count Fail',
  props<{ error: string }>()
);

// Create
export const createPrincipalRemark = createAction(
  '[PrincipalRemark] Create',
  props<{ payload: PrincipalRemarkFormInterface }>()
);

export const createPrincipalRemarkSuccess = createAction(
  '[PrincipalRemark/API] Create Success',
  props<{
    payload: GenericResponseInterface<PrincipalRemarkListInterface>;
  }>()
);

export const createPrincipalRemarkFail = createAction(
  '[PrincipalRemark/API] Create Fail',
  props<{ error: string }>()
);

// Update
export const updatePrincipalRemark = createAction(
  '[PrincipalRemark] Update',
  props<{ payload: PrincipalRemarkFormInterface }>()
);

export const updatePrincipalRemarkSuccess = createAction(
  '[PrincipalRemark/API] Update Success',
  props<{
    payload: GenericResponseInterface<PrincipalRemarkListInterface>;
  }>()
);

export const updatePrincipalRemarkFail = createAction(
  '[PrincipalRemark/API] Update Fail',
  props<{ error: string }>()
);

// Delete
export const deletePrincipalRemark = createAction(
  '[PrincipalRemark] Delete',
  props<{ principalRemarkId: string }>()
);

export const deletePrincipalRemarkSuccess = createAction(
  '[PrincipalRemark/API] Delete Success',
  props<{
    payload: GenericResponseInterface<boolean>;
    principalRemarkId: string;
  }>()
);

export const deletePrincipalRemarkFail = createAction(
  '[PrincipalRemark/API] Delete Fail',
  props<{ error: string }>()
);

// Create Many
export const createManyPrincipalRemarks = createAction(
  '[PrincipalRemark] Create Many',
  props<{ payload: PrincipalRemarkFormInterface[] }>()
);

export const createManyPrincipalRemarksSuccess = createAction(
  '[PrincipalRemark/API] Create Many Success',
  props<{
    payload: GenericResponseInterface<PrincipalRemarkListInterface[]>;
  }>()
);

export const createManyPrincipalRemarksFail = createAction(
  '[PrincipalRemark/API] Create Many Fail',
  props<{ error: string }>()
);

// Update Many
export const updateManyPrincipalRemarks = createAction(
  '[PrincipalRemark] Update Many',
  props<{ payload: PrincipalRemarkFormInterface[] }>()
);

export const updateManyPrincipalRemarksSuccess = createAction(
  '[PrincipalRemark/API] Update Many Success',
  props<{
    payload: GenericResponseInterface<PrincipalRemarkListInterface[]>;
  }>()
);

export const updateManyPrincipalRemarksFail = createAction(
  '[PrincipalRemark/API] Update Many Fail',
  props<{ error: string }>()
);

// Delete Many
export const deleteManyPrincipalRemarks = createAction(
  '[PrincipalRemark] Delete Many',
  props<{ principalRemarkIds: string[] }>()
);

export const deleteManyPrincipalRemarksSuccess = createAction(
  '[PrincipalRemark/API] Delete Many Success',
  props<{
    payload: GenericResponseInterface<boolean>;
  }>()
);

export const deleteManyPrincipalRemarksFail = createAction(
  '[PrincipalRemark/API] Delete Many Fail',
  props<{ error: string }>()
);
