import { createAction, props } from '@ngrx/store';
import {
    LoginResponseInterface,
    LoginPayloadInterface,
    ChangePasswordDto,
} from '../../types/auth';
import { GenericResponseInterface, CurrentUserInterface, CompanyListInterface } from '../../types';

export const login = createAction(
    '[Auth] Login',
    props<{
        payload: LoginPayloadInterface;
    }>()
);

export const loginSuccess = createAction(
    '[Auth/API] Login Success',
    props<{
        payload: GenericResponseInterface<LoginResponseInterface>;
    }>()
);

export const loginFail = createAction(
    '[Auth/API] Login Fail',
    props<{ error: string }>()
);

export const getCurrentUser = createAction('[Auth] Get Current Logged In User');

export const getCurrentUserSuccess = createAction(
    '[Auth/API] Get Current User Success',
    props<{
        payload: GenericResponseInterface<CurrentUserInterface>; // Updated payload type
    }>()
);

export const getCurrentUserFail = createAction(
    '[Auth/API] Get Current User Fail',
    props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const switchCompany = createAction(
    '[Auth] Switch Company',
    props<{ companyId: string }>() // Payload is companyId
);

export const switchCompanySuccess = createAction(
    '[Auth/API] Switch Company Success',
    props<{ payload: GenericResponseInterface<string> }>() // Payload is the token
);

export const switchCompanyFail = createAction(
    '[Auth/API] Switch Company Fail',
    props<{ error: string }>()
);

export const getUserCompanies = createAction('[Auth] Get Admin Companies');

export const getUserCompaniesSuccess = createAction(
    '[Auth/API] Get Admin Companies Success',
    props<{ payload: GenericResponseInterface<CompanyListInterface[]> }>() // Payload is list of companies
);

export const getUserCompaniesFail = createAction(
    '[Auth/API] Get Admin Companies Fail',
    props<{ error: string }>()
);

export const changePassword = createAction(
    '[Auth] Change Password',
    props<{ payload: ChangePasswordDto }>()
);

export const changePasswordSuccess = createAction(
    '[Auth/API] Change Password Success',
    props<{ payload: GenericResponseInterface<boolean> }>()
);

export const changePasswordFail = createAction(
    '[Auth/API] Change Password Fail',
    props<{ error: string }>()
);