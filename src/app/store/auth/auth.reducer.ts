import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as AuthAction from './auth.actions';
import { LoggedUserInterface } from '../../types/auth';
import { CurrentUserInterface } from '../../types';

export const authFeatureKey = 'auth';

export interface AuthState {
  isLoading: boolean;
  currentUserId: string | null;
  currentUser: CurrentUserInterface | null;
  loginResponse: LoggedUserInterface | null;
  error: string | null;
}

export const initialState: AuthState = {
  isLoading: false,
  currentUserId: null,
  currentUser: null,
  loginResponse: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthAction.loginSuccess, (state, { payload }) => {
    return {
      ...state,
      currentUserId: payload.entity?.currentUser?.id,
      loginResponse: payload.entity?.currentUser,
      error: null,
    };
  }),
  on(AuthAction.loginFail, (state, action) => {
    return {
      ...initialState,
      error: action.error,
    };
  }),

  on(AuthAction.getCurrentUser, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(AuthAction.getCurrentUserSuccess, (state, { payload }) => {
    return {
      ...state,
      currentUserId: payload.entity?.userId,
      currentUser: payload.entity,
      isLoading: false,
      error: null,
    };
  }),
  on(AuthAction.getCurrentUserFail, (state, action) => {
    return {
      ...initialState,
      isLoading: false,
      error: action.error,
    };
  })
);

export const getLoginResponse = (state: AuthState) => state.loginResponse;

export const getUsername = (state: AuthState) => state.loginResponse?.userName;

export const getCurrentUserId = (state: AuthState) => state.currentUserId;

export const getCurrentUser = (state: AuthState) => state.currentUser;

export const getLoading = (state: AuthState) => state.isLoading;

export const getUserType = (state: AuthState) => state.loginResponse?.userType;

export const getError = (state: AuthState) => state.error;

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
