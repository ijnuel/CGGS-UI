import { createSelector } from '@ngrx/store';
import { CompanyCoreValueState, getCompanyCoreValueList, getCompanyCoreValueAll, getCompanyCoreValueById, getLoading, getError, getCreateSuccess, getUpdateSuccess } from './company-core-value.reducer';

export const selectCompanyCoreValueState = (state: { companyCoreValue: CompanyCoreValueState }) => state.companyCoreValue;

export const selectCompanyCoreValueList     = createSelector(selectCompanyCoreValueState, getCompanyCoreValueList);
export const selectCompanyCoreValueAll      = createSelector(selectCompanyCoreValueState, getCompanyCoreValueAll);
export const selectCompanyCoreValueById     = createSelector(selectCompanyCoreValueState, getCompanyCoreValueById);
export const selectCompanyCoreValueLoading  = createSelector(selectCompanyCoreValueState, getLoading);
export const selectCompanyCoreValueError    = createSelector(selectCompanyCoreValueState, getError);
export const selectCompanyCoreValueCreateSuccess = createSelector(selectCompanyCoreValueState, getCreateSuccess);
export const selectCompanyCoreValueUpdateSuccess = createSelector(selectCompanyCoreValueState, getUpdateSuccess);
