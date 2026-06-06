import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface, PageQueryInterface, PaginatedResponseInterface } from '../../types';
import { PaymentListInterface } from '../../types/fee';

export const getPaymentList = createAction('[Payment] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getPaymentListSuccess = createAction('[Payment/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<PaymentListInterface[]>> }>());
export const getPaymentListFail = createAction('[Payment/API] Get List Fail', props<{ error: string }>());
