import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as AuthAction from './auth.actions';
import { LoggedUserInterface } from '../../types/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  loginResponse: LoggedUserInterface | null;
  error: string | null;
}

export const initialState: AuthState = {
  loginResponse: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthAction.loginSuccess, (state, { payload }) => {
    return {
      ...state,
      loginResponse: payload.entity.currentUser,
      error: null,
    };
  }),
  on(AuthAction.loginFail, (state, action) => {
    return {
      ...initialState,
      error: action.error,
    };
  })
);

export const getLoginResponse = (state: AuthState) => state.loginResponse;

export const getUsername = (state: AuthState) => state.loginResponse?.userName;

export const getUserType = (state: AuthState) => state.loginResponse?.userType;

export const getError = (state: AuthState) => state.error;

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
