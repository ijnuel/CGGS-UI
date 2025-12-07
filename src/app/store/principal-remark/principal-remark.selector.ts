import { createSelector } from '@ngrx/store';
import {
  getPrincipalRemarkList,
  getPrincipalRemarkAll,
  getPrincipalRemarkByProperties,
  getPrincipalRemarkById,
  getExists,
  getCount,
  getLoading,
  getError,
  PrincipalRemarkState,
} from './principal-remark.reducer';

export const selectPrincipalRemarkState = (state: { principalRemark: PrincipalRemarkState }) =>
  state.principalRemark;

export const selectPrincipalRemarkList = createSelector(
  selectPrincipalRemarkState,
  getPrincipalRemarkList
);

export const selectPrincipalRemarkAll = createSelector(
  selectPrincipalRemarkState,
  getPrincipalRemarkAll
);

export const selectPrincipalRemarkByProperties = createSelector(
  selectPrincipalRemarkState,
  getPrincipalRemarkByProperties
);

export const selectPrincipalRemarkById = createSelector(
  selectPrincipalRemarkState,
  getPrincipalRemarkById
);

export const selectExists = createSelector(
  selectPrincipalRemarkState,
  getExists
);

export const selectCount = createSelector(
  selectPrincipalRemarkState,
  getCount
);

export const selectPrincipalRemarkLoading = createSelector(
  selectPrincipalRemarkState,
  getLoading
);

export const selectPrincipalRemarkError = createSelector(
  selectPrincipalRemarkState,
  getError
);

export const selectPrincipalRemarkCreateSuccess = createSelector(
    selectPrincipalRemarkState,
    (state) => state.createSuccess
);

export const selectPrincipalRemarkUpdateSuccess = createSelector(
    selectPrincipalRemarkState,
    (state) => state.updateSuccess
);

export const selectPrincipalRemarkDeleteSuccess = createSelector(
    selectPrincipalRemarkState,
    (state) => state.deleteSuccess
);