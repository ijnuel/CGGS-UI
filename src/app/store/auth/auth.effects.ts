import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthAction from './auth.actions';
import { environment } from '../../../environments/environment';
import { LoginResponseInterface } from '../../types/auth';
import {
    CurrentUserInterface,
    GenericResponseInterface,
    CompanyListInterface,
} from '../../types/';
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
                        },
                        { withCredentials: true }
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

    $getCurrentUser = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthAction.getCurrentUser),
            switchMap(() =>
                this.http
                    .get<GenericResponseInterface<CurrentUserInterface>>( // Updated type
                        `${environment.baseUrl}/Account/GetUserProfile`,
                        { withCredentials: true }
                    )
                    .pipe(
                        map((payload) =>
                            AuthAction.getCurrentUserSuccess({ payload })
                        ),
                        catchError((error) => {
                            return of(AuthAction.getCurrentUserFail({ error }));
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
                        .post(`${environment.baseUrl}/Account/Logout`, null, {
                            withCredentials: true,
                        })
                        .pipe(
                            map(() => {
                                location.href = '/';
                            }),
                            catchError((error) => {
                                return of(AuthAction.loginFail({ error }));
                            })
                        )
                )
            ),
        { dispatch: false }
    );

    $switchCompany = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthAction.switchCompany),
            switchMap(({ companyId }) =>
                this.http
                    .post<GenericResponseInterface<string>>(
                        `${environment.baseUrl}/Account/SwitchCompany`,
                        null,
                        {
                            params: { companyId }, // Send companyId as a query parameter
                            withCredentials: true,
                        }
                    )
                    .pipe(
                        map((payload) =>
                            AuthAction.switchCompanySuccess({ payload })
                        ),
                        catchError((error) =>
                            of(AuthAction.switchCompanyFail({ error }))
                        )
                    )
            )
        )
    );

    $getUserCompanies = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthAction.getUserCompanies),
            switchMap(() =>
                this.http
                    .get<GenericResponseInterface<CompanyListInterface[]>>(
                        `${environment.baseUrl}/Account/UserCompanies`,
                        { withCredentials: true }
                    )
                    .pipe(
                        map((payload) =>
                            AuthAction.getUserCompaniesSuccess({ payload })
                        ),
                        catchError((error) =>
                            of(AuthAction.getUserCompaniesFail({ error }))
                        )
                    )
            )
        )
    );

    $authLoading = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    AuthAction.login,
                    AuthAction.logout,
                    AuthAction.getCurrentUser,
                    AuthAction.switchCompany,
                    AuthAction.getUserCompanies
                ),
                tap((action) => {
                    this.errorLoadingFacade.globalLoadingShow(action.type);
                })
            ),
        { dispatch: false }
    );

    $authLoadingHide = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    AuthAction.loginSuccess,
                    AuthAction.loginFail,
                    AuthAction.getCurrentUserSuccess,
                    AuthAction.getCurrentUserFail,
                    AuthAction.switchCompanySuccess,
                    AuthAction.switchCompanyFail,
                    AuthAction.getUserCompaniesSuccess,
                    AuthAction.getUserCompaniesFail
                ),
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