import { createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromApp from '../app.reducer';

export const selectAuthState = createSelector(
  fromApp.selectAppState,
  (state) => state[fromAuth.authFeatureKey]
);

export const selectUsername = createSelector(
  fromAuth.selectAuthState,
  fromAuth.getUsername
);

export const selectLoginResponseData = createSelector(
  fromAuth.selectAuthState,
  fromAuth.getLoginResponse
);

export const selectError = createSelector(
  fromAuth.selectAuthState,
  fromAuth.getError
);
