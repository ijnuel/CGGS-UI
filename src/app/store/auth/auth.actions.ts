import { createAction, props } from '@ngrx/store';
import {
  LoginResponseInterface,
  LoginPayloadInterface,
} from '../../types/auth';
import { GenericResponseInterface } from '../../types';

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

export const logout = createAction('[Auth] Logout');
