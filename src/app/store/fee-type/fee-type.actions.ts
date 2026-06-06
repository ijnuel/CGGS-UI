import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import { FeeTypeListInterface, FeeTypeFormInterface } from '../../types/fee';

// Invalidate Cache
export const invalidateCache = createAction('[FeeType] Invalidate Cache');
export const invalidateCacheSuccess = createAction('[FeeType/API] Invalidate Cache Success', props<{ payload: GenericResponseInterface<any> }>());
export const invalidateCacheFail = createAction('[FeeType/API] Invalidate Cache Fail', props<{ error: string }>());

// Get All (non-paginated)
export const getFeeTypeAll = createAction('[FeeType] Get All', props<{ query?: QueryInterface }>());
export const getFeeTypeAllSuccess = createAction('[FeeType/API] Get All Success', props<{ payload: GenericResponseInterface<FeeTypeListInterface[]> }>());
export const getFeeTypeAllFail = createAction('[FeeType/API] Get All Fail', props<{ error: string }>());

// Get All Paginated
export const getFeeTypeList = createAction('[FeeType] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getFeeTypeListSuccess = createAction('[FeeType/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<FeeTypeListInterface[]>> }>());
export const getFeeTypeListFail = createAction('[FeeType/API] Get List Fail', props<{ error: string }>());

// Get By Id
export const getFeeTypeById = createAction('[FeeType] Get By Id', props<{ id: string }>());
export const getFeeTypeByIdSuccess = createAction('[FeeType/API] Get By Id Success', props<{ payload: GenericResponseInterface<FeeTypeListInterface> }>());
export const getFeeTypeByIdFail = createAction('[FeeType/API] Get By Id Fail', props<{ error: string }>());

// Create
export const createFeeType = createAction('[FeeType] Create', props<{ payload: FeeTypeFormInterface }>());
export const createFeeTypeSuccess = createAction('[FeeType/API] Create Success', props<{ payload: GenericResponseInterface<any> }>());
export const createFeeTypeFail = createAction('[FeeType/API] Create Fail', props<{ error: string }>());

// Update
export const updateFeeType = createAction('[FeeType] Update', props<{ payload: FeeTypeFormInterface }>());
export const updateFeeTypeSuccess = createAction('[FeeType/API] Update Success', props<{ payload: GenericResponseInterface<any> }>());
export const updateFeeTypeFail = createAction('[FeeType/API] Update Fail', props<{ error: string }>());

// Delete
export const deleteFeeType = createAction('[FeeType] Delete', props<{ id: string }>());
export const deleteFeeTypeSuccess = createAction('[FeeType/API] Delete Success', props<{ payload: GenericResponseInterface<any> }>());
export const deleteFeeTypeFail = createAction('[FeeType/API] Delete Fail', props<{ error: string }>());
