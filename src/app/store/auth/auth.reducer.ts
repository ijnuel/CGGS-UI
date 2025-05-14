import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { CurrentUserInterface } from '../../types';

export const authFeatureKey = 'auth';

export interface AuthState {
    currentUserId: string | null;
    currentUser: CurrentUserInterface | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    currentUserId: null,
    currentUser: null,
    loading: false,
    error: null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
    on(AuthActions.loginSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        currentUserId: payload.entity.currentUser.id,
    })),
    on(AuthActions.loginFail, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(AuthActions.getCurrentUser, (state) => ({ ...state, loading: true, error: null })),
    on(AuthActions.getCurrentUserSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        currentUser: payload.entity,
    })),
    on(AuthActions.getCurrentUserFail, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(AuthActions.logout, (state) => ({
        ...state,
        currentUserId: null,
        currentUser: null,
        error: null,
    })),
    on(AuthActions.switchCompany, (state) => ({ ...state, loading: true, error: null })),
    on(AuthActions.switchCompanySuccess, (state) => ({
        ...state,
        loading: false,
    })), // No state change needed on success
    on(AuthActions.switchCompanyFail, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(AuthActions.getAdminCompanies, (state) => ({ ...state, loading: true, error: null })),
    on(AuthActions.getAdminCompaniesSuccess, (state) => ({
        ...state,
        loading: false,
    })), // No state change needed on success
    on(AuthActions.getAdminCompaniesFail, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);