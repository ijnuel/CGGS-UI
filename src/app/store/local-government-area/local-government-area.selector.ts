import { createSelector } from '@ngrx/store';
import * as fromLocalGovernmentArea from './local-government-area.reducer';
import * as fromApp from '../app.reducer';

export const selectLocalGovernmentAreaState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromLocalGovernmentArea.localGovernmentAreaFeatureKey]
);

export const selectLocalGovernmentAreaList = createSelector(
  fromLocalGovernmentArea.selectLocalGovernmentAreaState,
  fromLocalGovernmentArea.getLocalGovernmentAreaList
);

export const selectLocalGovernmentAreaById = createSelector(
  fromLocalGovernmentArea.selectLocalGovernmentAreaState,
  fromLocalGovernmentArea.getLocalGovernmentAreaById
);

export const selectLoading = createSelector(
  fromLocalGovernmentArea.selectLocalGovernmentAreaState,
  fromLocalGovernmentArea.getLoading
);

export const selectError = createSelector(
  fromLocalGovernmentArea.selectLocalGovernmentAreaState,
  fromLocalGovernmentArea.getError
);
