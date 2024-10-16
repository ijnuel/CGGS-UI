import { Action, combineReducers, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';

export const appFeatureKey = 'appFeatureKey';

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
}

export function reducers(state: AppState, action: Action) {
  return combineReducers({
    [fromAuth.authFeatureKey]: fromAuth.reducer,
  })(state, action);
}

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);
