import { createSelector } from '@ngrx/store';
import {
  getCompanyList,
  getCompanyAll,
  getCompanyByProperties,
  getCompanyById,
  getExists,
  getCount,
  getLoading,
  getError,
  CompanyState,
} from './company.reducer';

export const selectCompanyState = (state: { company: CompanyState }) =>
  state.company;

export const selectCompanyList = createSelector(
  selectCompanyState,
  getCompanyList
);

export const selectCompanyAll = createSelector(
  selectCompanyState,
  getCompanyAll
);

export const selectCompanyByProperties = createSelector(
  selectCompanyState,
  getCompanyByProperties
);

export const selectCompanyById = createSelector(
  selectCompanyState,
  getCompanyById
);

export const selectExists = createSelector(
  selectCompanyState,
  getExists
);

export const selectCount = createSelector(
  selectCompanyState,
  getCount
);

export const selectCompanyLoading = createSelector(
  selectCompanyState,
  getLoading
);

export const selectCompanyError = createSelector(
  selectCompanyState,
  getError
);

export const selectCompanyCreateSuccess = createSelector(
    selectCompanyState,
    (state) => state.createSuccess
);

export const selectCompanyUpdateSuccess = createSelector(
    selectCompanyState,
    (state) => state.updateSuccess
);