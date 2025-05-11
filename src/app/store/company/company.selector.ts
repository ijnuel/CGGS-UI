import { createSelector } from '@ngrx/store';
import * as fromCompany from './company.reducer';
import * as fromApp from '../app.reducer';

export const selectCompanyState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromCompany.companyFeatureKey]
);

export const selectCompanyList = createSelector(
  fromCompany.selectCompanyState,
  fromCompany.getCompanyList
);

export const selectCompanyById = createSelector(
  fromCompany.selectCompanyState,
  fromCompany.getCompanyById
);

export const selectLoading = createSelector(
  fromCompany.selectCompanyState,
  fromCompany.getLoading
);

export const selectError = createSelector(
  fromCompany.selectCompanyState,
  fromCompany.getError
);
