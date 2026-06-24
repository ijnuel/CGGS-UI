import { createSelector } from '@ngrx/store';
import {
  getPaymentGatewaySetupAll,
  getPaymentGatewaySetupList,
  getPaymentGatewaySetupById,
  getLoading,
  getError,
  getCreateSuccess,
  getUpdateSuccess,
  getDeleteSuccess,
  PaymentGatewaySetupState,
} from './payment-gateway-setup.reducer';

export const selectPaymentGatewaySetupState = (state: { paymentGatewaySetup: PaymentGatewaySetupState }) => state.paymentGatewaySetup;

export const selectPaymentGatewaySetupAll = createSelector(selectPaymentGatewaySetupState, getPaymentGatewaySetupAll);
export const selectPaymentGatewaySetupList = createSelector(selectPaymentGatewaySetupState, getPaymentGatewaySetupList);
export const selectPaymentGatewaySetupById = createSelector(selectPaymentGatewaySetupState, getPaymentGatewaySetupById);
export const selectPaymentGatewaySetupLoading = createSelector(selectPaymentGatewaySetupState, getLoading);
export const selectPaymentGatewaySetupError = createSelector(selectPaymentGatewaySetupState, getError);
export const selectPaymentGatewaySetupCreateSuccess = createSelector(selectPaymentGatewaySetupState, getCreateSuccess);
export const selectPaymentGatewaySetupUpdateSuccess = createSelector(selectPaymentGatewaySetupState, getUpdateSuccess);
export const selectPaymentGatewaySetupDeleteSuccess = createSelector(selectPaymentGatewaySetupState, getDeleteSuccess);
