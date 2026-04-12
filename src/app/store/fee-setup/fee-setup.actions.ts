import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import { FeeSetupListInterface, FeeSetupFormInterface } from '../../types/fee';

// Invalidate Cache
export const invalidateCache = createAction('[FeeSetup] Invalidate Cache');
export const invalidateCacheSuccess = createAction('[FeeSetup/API] Invalidate Cache Success', props<{ payload: GenericResponseInterface<any> }>());
export const invalidateCacheFail = createAction('[FeeSetup/API] Invalidate Cache Fail', props<{ error: string }>());

// Get All (non-paginated)
export const getFeeSetupAll = createAction('[FeeSetup] Get All', props<{ query?: QueryInterface }>());
export const getFeeSetupAllSuccess = createAction('[FeeSetup/API] Get All Success', props<{ payload: GenericResponseInterface<FeeSetupListInterface[]> }>());
export const getFeeSetupAllFail = createAction('[FeeSetup/API] Get All Fail', props<{ error: string }>());

// Get All Paginated
export const getFeeSetupList = createAction('[FeeSetup] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getFeeSetupListSuccess = createAction('[FeeSetup/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<FeeSetupListInterface[]>> }>());
export const getFeeSetupListFail = createAction('[FeeSetup/API] Get List Fail', props<{ error: string }>());

// Get By Id
export const getFeeSetupById = createAction('[FeeSetup] Get By Id', props<{ id: string }>());
export const getFeeSetupByIdSuccess = createAction('[FeeSetup/API] Get By Id Success', props<{ payload: GenericResponseInterface<FeeSetupListInterface> }>());
export const getFeeSetupByIdFail = createAction('[FeeSetup/API] Get By Id Fail', props<{ error: string }>());

// Create
export const createFeeSetup = createAction('[FeeSetup] Create', props<{ payload: FeeSetupFormInterface }>());
export const createFeeSetupSuccess = createAction('[FeeSetup/API] Create Success', props<{ payload: GenericResponseInterface<any> }>());
export const createFeeSetupFail = createAction('[FeeSetup/API] Create Fail', props<{ error: string }>());

// Update
export const updateFeeSetup = createAction('[FeeSetup] Update', props<{ payload: FeeSetupFormInterface }>());
export const updateFeeSetupSuccess = createAction('[FeeSetup/API] Update Success', props<{ payload: GenericResponseInterface<any> }>());
export const updateFeeSetupFail = createAction('[FeeSetup/API] Update Fail', props<{ error: string }>());

// Delete
export const deleteFeeSetup = createAction('[FeeSetup] Delete', props<{ id: string }>());
export const deleteFeeSetupSuccess = createAction('[FeeSetup/API] Delete Success', props<{ payload: GenericResponseInterface<any> }>());
export const deleteFeeSetupFail = createAction('[FeeSetup/API] Delete Fail', props<{ error: string }>());
