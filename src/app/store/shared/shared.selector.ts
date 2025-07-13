import { createSelector } from '@ngrx/store';
import * as fromShared from './shared.reducer';
import * as fromApp from '../app.reducer';

export const selectSharedState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromShared.sharedFeatureKey]
);

export const selectGenderList = createSelector(
  fromShared.selectSharedState,
  fromShared.getGenderList
);

export const selectTermList = createSelector(
  fromShared.selectSharedState,
  fromShared.getTermList
);

export const selectReligionList = createSelector(
  fromShared.selectSharedState,
  fromShared.getReligionList
);

export const selectCountryList = createSelector(
  fromShared.selectSharedState,
  fromShared.getCountryList
);

export const selectStateList = createSelector(
  fromShared.selectSharedState,
  fromShared.getStateList
);

export const selectLgaList = createSelector(
  fromShared.selectSharedState,
  fromShared.getLgaList
);

export const selectLoading = createSelector(
  fromShared.selectSharedState,
  fromShared.getLoading
);

export const selectError = createSelector(
  fromShared.selectSharedState,
  fromShared.getError
);

export const selectUserTypeList = createSelector(
  fromShared.selectSharedState,
  fromShared.getUserTypeList
);

export const selectSubjectTypeList = createSelector(
  fromShared.selectSharedState,
  fromShared.getSubjectTypeList
);
