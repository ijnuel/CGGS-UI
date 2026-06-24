import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as PaymentGatewaySetupAction from './payment-gateway-setup.actions';
import { PaymentGatewaySetupListInterface } from '../../types/payment-gateway-setup';
import { PaginatedResponseInterface } from '../../types';

export const paymentGatewaySetupFeatureKey = 'paymentGatewaySetup';

export interface PaymentGatewaySetupState {
  paymentGatewaySetupAll: PaymentGatewaySetupListInterface[] | null;
  paymentGatewaySetupList: PaginatedResponseInterface<PaymentGatewaySetupListInterface[]> | null;
  paymentGatewaySetupById: PaymentGatewaySetupListInterface | null;
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
}

export const initialState: PaymentGatewaySetupState = {
  paymentGatewaySetupAll: null,
  paymentGatewaySetupList: null,
  paymentGatewaySetupById: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

export const reducer = createReducer(
  initialState,

  on(PaymentGatewaySetupAction.getPaymentGatewaySetupAll, (state) => ({ ...state, loading: true, error: null })),
  on(PaymentGatewaySetupAction.getPaymentGatewaySetupAllSuccess, (state, { payload }) => ({ ...state, paymentGatewaySetupAll: payload.entity, loading: false })),
  on(PaymentGatewaySetupAction.getPaymentGatewaySetupAllFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(PaymentGatewaySetupAction.getPaymentGatewaySetupList, (state) => ({ ...state, loading: true, error: null, createSuccess: false, updateSuccess: false, deleteSuccess: false })),
  on(PaymentGatewaySetupAction.getPaymentGatewaySetupListSuccess, (state, { payload }) => ({ ...state, paymentGatewaySetupList: payload.entity, loading: false })),
  on(PaymentGatewaySetupAction.getPaymentGatewaySetupListFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(PaymentGatewaySetupAction.getPaymentGatewaySetupById, (state) => ({ ...state, loading: true, error: null, createSuccess: false, updateSuccess: false })),
  on(PaymentGatewaySetupAction.getPaymentGatewaySetupByIdSuccess, (state, { payload }) => ({ ...state, paymentGatewaySetupById: payload.entity, loading: false })),
  on(PaymentGatewaySetupAction.getPaymentGatewaySetupByIdFail, (state, { error }) => ({ ...state, loading: false, error })),

  on(PaymentGatewaySetupAction.createPaymentGatewaySetup, (state) => ({ ...state, loading: true, error: null, createSuccess: false })),
  on(PaymentGatewaySetupAction.createPaymentGatewaySetupSuccess, (state) => ({ ...state, loading: false, createSuccess: true })),
  on(PaymentGatewaySetupAction.createPaymentGatewaySetupFail, (state, { error }) => ({ ...state, loading: false, error, createSuccess: false })),

  on(PaymentGatewaySetupAction.updatePaymentGatewaySetup, (state) => ({ ...state, loading: true, error: null, updateSuccess: false })),
  on(PaymentGatewaySetupAction.updatePaymentGatewaySetupSuccess, (state) => ({ ...state, loading: false, updateSuccess: true })),
  on(PaymentGatewaySetupAction.updatePaymentGatewaySetupFail, (state, { error }) => ({ ...state, loading: false, error, updateSuccess: false })),

  on(PaymentGatewaySetupAction.deletePaymentGatewaySetup, (state) => ({ ...state, loading: true, error: null, deleteSuccess: false })),
  on(PaymentGatewaySetupAction.deletePaymentGatewaySetupSuccess, (state) => ({ ...state, loading: false, deleteSuccess: true })),
  on(PaymentGatewaySetupAction.deletePaymentGatewaySetupFail, (state, { error }) => ({ ...state, loading: false, error, deleteSuccess: false })),
);

export const selectPaymentGatewaySetupState = createFeatureSelector<PaymentGatewaySetupState>(paymentGatewaySetupFeatureKey);

export const getPaymentGatewaySetupAll = (state: PaymentGatewaySetupState) => state.paymentGatewaySetupAll;
export const getPaymentGatewaySetupList = (state: PaymentGatewaySetupState) => state.paymentGatewaySetupList;
export const getPaymentGatewaySetupById = (state: PaymentGatewaySetupState) => state.paymentGatewaySetupById;
export const getLoading = (state: PaymentGatewaySetupState) => state.loading;
export const getError = (state: PaymentGatewaySetupState) => state.error;
export const getCreateSuccess = (state: PaymentGatewaySetupState) => state.createSuccess;
export const getUpdateSuccess = (state: PaymentGatewaySetupState) => state.updateSuccess;
export const getDeleteSuccess = (state: PaymentGatewaySetupState) => state.deleteSuccess;
