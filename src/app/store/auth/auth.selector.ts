import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth'); // Assuming 'auth' is your feature key

export const selectCurrentUserId = createSelector(
    selectAuthState,
    (state: AuthState) => state.currentUserId
);

export const selectCurrentUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.currentUser
);

export const selectLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
);

export const selectError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);