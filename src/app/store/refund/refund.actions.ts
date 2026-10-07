import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface } from '../../types';
import { RefundInterface } from '../../types/refund';

export const getRefundAll = createAction('[Refund] Get All');
export const getRefundAllSuccess = createAction(
  '[Refund/API] Get All Success',
  props<{ payload: GenericResponseInterface<RefundInterface[]> }>()
);
export const getRefundAllFail = createAction(
  '[Refund/API] Get All Fail',
  props<{ error: string }>()
);

export const processRefund = createAction('[Refund] Process', props<{ id: string }>());
export const processRefundSuccess = createAction('[Refund/API] Process Success');
export const processRefundFail = createAction(
  '[Refund/API] Process Fail',
  props<{ error: string }>()
);

export const rejectRefund = createAction('[Refund] Reject', props<{ id: string; notes: string }>());
export const rejectRefundSuccess = createAction('[Refund/API] Reject Success');
export const rejectRefundFail = createAction(
  '[Refund/API] Reject Fail',
  props<{ error: string }>()
);
