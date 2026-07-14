import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface, PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';
import { TransactionListInterface } from '../../types/transaction';

export const getTransactionAll = createAction('[Transaction] Get All', props<{ query?: QueryInterface }>());
export const getTransactionAllSuccess = createAction('[Transaction/API] Get All Success', props<{ payload: GenericResponseInterface<TransactionListInterface[]> }>());
export const getTransactionAllFail = createAction('[Transaction/API] Get All Fail', props<{ error: string }>());

export const getTransactionList = createAction('[Transaction] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getTransactionListSuccess = createAction('[Transaction/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<TransactionListInterface[]>> }>());
export const getTransactionListFail = createAction('[Transaction/API] Get List Fail', props<{ error: string }>());

export const getTransactionById = createAction('[Transaction] Get By Id', props<{ id: string }>());
export const getTransactionByIdSuccess = createAction('[Transaction/API] Get By Id Success', props<{ payload: GenericResponseInterface<TransactionListInterface> }>());
export const getTransactionByIdFail = createAction('[Transaction/API] Get By Id Fail', props<{ error: string }>());

export const verifyTransaction = createAction('[Transaction] Verify', props<{ id: string }>());
export const verifyTransactionSuccess = createAction('[Transaction/API] Verify Success', props<{ id: string }>());
export const verifyTransactionFail = createAction('[Transaction/API] Verify Fail', props<{ error: string }>());
