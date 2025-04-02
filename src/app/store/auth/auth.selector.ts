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

export const selectCurrentUserId = createSelector(
  fromAuth.selectAuthState,
  fromAuth.getCurrentUserId
);

export const selectCurrentUser = createSelector(
  fromAuth.selectAuthState,
  fromAuth.getCurrentUser
);

export const selectLoading = createSelector(
  fromAuth.selectAuthState,
  fromAuth.getLoading
);

export const selectError = createSelector(
  fromAuth.selectAuthState,
  fromAuth.getError
);
