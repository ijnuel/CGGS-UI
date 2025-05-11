import { createSelector } from '@ngrx/store';
import * as fromSchoolConfiguration from './school-configuration.reducer';
import * as fromApp from '../app.reducer';

export const selectSchoolConfigurationState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromSchoolConfiguration.schoolConfigurationFeatureKey]
);

export const selectSchoolConfigurationList = createSelector(
  fromSchoolConfiguration.selectSchoolConfigurationState,
  fromSchoolConfiguration.getSchoolConfigurationList
);

export const selectSchoolConfigurationById = createSelector(
  fromSchoolConfiguration.selectSchoolConfigurationState,
  fromSchoolConfiguration.getSchoolConfigurationById
);

export const selectLoading = createSelector(
  fromSchoolConfiguration.selectSchoolConfigurationState,
  fromSchoolConfiguration.getLoading
);

export const selectError = createSelector(
  fromSchoolConfiguration.selectSchoolConfigurationState,
  fromSchoolConfiguration.getError
);
