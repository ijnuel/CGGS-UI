import { createAction, props } from '@ngrx/store';
import {
  LoginResponseInterface,
  LoginPayloadInterface,
} from '../../types/auth';
import { GenericResponseInterface, CurrentUserInterface } from '../../types';

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
  '[Auth/API] get Current User Success',
  props<{
    payload: GenericResponseInterface<CurrentUserInterface>;
  }>()
);

export const getCurrentUserFail = createAction(
  '[Auth/API] get Current User Fail',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
