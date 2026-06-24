import { createAction, props } from '@ngrx/store';
import {
  GenericResponseInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import { PaymentGatewaySetupListInterface, PaymentGatewaySetupFormInterface } from '../../types/payment-gateway-setup';

// Get All (non-paginated)
export const getPaymentGatewaySetupAll = createAction('[PaymentGatewaySetup] Get All', props<{ query?: QueryInterface }>());
export const getPaymentGatewaySetupAllSuccess = createAction('[PaymentGatewaySetup/API] Get All Success', props<{ payload: GenericResponseInterface<PaymentGatewaySetupListInterface[]> }>());
export const getPaymentGatewaySetupAllFail = createAction('[PaymentGatewaySetup/API] Get All Fail', props<{ error: string }>());

// Get All Paginated
export const getPaymentGatewaySetupList = createAction('[PaymentGatewaySetup] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getPaymentGatewaySetupListSuccess = createAction('[PaymentGatewaySetup/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<PaymentGatewaySetupListInterface[]>> }>());
export const getPaymentGatewaySetupListFail = createAction('[PaymentGatewaySetup/API] Get List Fail', props<{ error: string }>());

// Get By Id
export const getPaymentGatewaySetupById = createAction('[PaymentGatewaySetup] Get By Id', props<{ id: string }>());
export const getPaymentGatewaySetupByIdSuccess = createAction('[PaymentGatewaySetup/API] Get By Id Success', props<{ payload: GenericResponseInterface<PaymentGatewaySetupListInterface> }>());
export const getPaymentGatewaySetupByIdFail = createAction('[PaymentGatewaySetup/API] Get By Id Fail', props<{ error: string }>());

// Create
export const createPaymentGatewaySetup = createAction('[PaymentGatewaySetup] Create', props<{ payload: PaymentGatewaySetupFormInterface }>());
export const createPaymentGatewaySetupSuccess = createAction('[PaymentGatewaySetup/API] Create Success', props<{ payload: GenericResponseInterface<any> }>());
export const createPaymentGatewaySetupFail = createAction('[PaymentGatewaySetup/API] Create Fail', props<{ error: string }>());

// Update
export const updatePaymentGatewaySetup = createAction('[PaymentGatewaySetup] Update', props<{ payload: PaymentGatewaySetupFormInterface }>());
export const updatePaymentGatewaySetupSuccess = createAction('[PaymentGatewaySetup/API] Update Success', props<{ payload: GenericResponseInterface<any> }>());
export const updatePaymentGatewaySetupFail = createAction('[PaymentGatewaySetup/API] Update Fail', props<{ error: string }>());

// Delete
export const deletePaymentGatewaySetup = createAction('[PaymentGatewaySetup] Delete', props<{ id: string }>());
export const deletePaymentGatewaySetupSuccess = createAction('[PaymentGatewaySetup/API] Delete Success', props<{ payload: GenericResponseInterface<any> }>());
export const deletePaymentGatewaySetupFail = createAction('[PaymentGatewaySetup/API] Delete Fail', props<{ error: string }>());
