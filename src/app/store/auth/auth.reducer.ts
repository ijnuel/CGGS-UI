import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { CompanyListInterface, CurrentUserInterface } from '../../types';

export const authFeatureKey = 'auth';

export interface AuthState {
    currentUserId: string | null;
    currentUser: CurrentUserInterface | null;
    userCompanies: CompanyListInterface[] | null;
    loading: boolean;
    error: string | null;
    forgotPasswordSent: boolean;
    passwordResetDone: boolean;
}

export const initialState: AuthState = {
    currentUserId: null,
    currentUser: null,
    userCompanies: null,
    loading: false,
    error: null,
    forgotPasswordSent: false,
    passwordResetDone: false,
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
        currentUserId: payload?.entity?.userId
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
        userCompanies: null,
    })),
    on(AuthActions.switchCompanyFail, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(AuthActions.getUserCompanies, (state) => ({ ...state, loading: true, error: null })),
    on(AuthActions.getUserCompaniesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        userCompanies: payload.entity,
    })),
    on(AuthActions.getUserCompaniesFail, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(AuthActions.forgotPassword, (state) => ({ ...state, loading: true, error: null, forgotPasswordSent: false })),
    on(AuthActions.forgotPasswordSuccess, (state) => ({ ...state, loading: false, forgotPasswordSent: true })),
    on(AuthActions.forgotPasswordFail, (state, { error }) => ({ ...state, loading: false, error })),
    on(AuthActions.resetPassword, (state) => ({ ...state, loading: true, error: null, passwordResetDone: false })),
    on(AuthActions.resetPasswordSuccess, (state) => ({ ...state, loading: false, passwordResetDone: true })),
    on(AuthActions.resetPasswordFail, (state, { error }) => ({ ...state, loading: false, error }))
);