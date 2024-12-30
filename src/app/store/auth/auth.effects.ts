import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthAction from './auth.actions';
import { environment } from '../../../environments/environment';
import { LoginResponseInterface } from '../../types/auth';
import { GenericResponseInterface } from '../../types/';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class AuthEffect {
  $login = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.login),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<LoginResponseInterface>>(
            `${environment.baseUrl}/Account/Login`,
            {
              ...payload,
            }, { withCredentials: true }
          )
          .pipe(
            map((loginResponse) => {
              return AuthAction.loginSuccess({
                payload: loginResponse,
              });
            }),
            catchError((error) => {
              return of(AuthAction.loginFail({ error }));
            })
          )
      )
    )
  );

  $logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.logout),
        switchMap(() =>
          this.http
            .post(
              `${environment.baseUrl}/Account/Logout`, 
              null, { withCredentials: true }
            )
            .pipe(
              map(() => {
                location.href = '/'
              }),
              catchError((error) => {
                return of(AuthAction.loginFail({ error }));
              })
            )
        )
      ),
    { dispatch: false }
  );

  $authLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.login, AuthAction.logout),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $authLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.loginSuccess, AuthAction.loginFail),
        tap(() => {
          this.errorLoadingFacade.globalLoadingHide();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,

    private errorLoadingFacade: GlobalLoadingFacade
  ) {}
}
