import { Injectable } from '@angular/core';
import { select, Store, ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import * as AuthSelector from './auth.selector';
import { Observable, map } from 'rxjs';
import {
    GenericResponseInterface,
    LoginPayloadInterface,
    LoginResponseInterface,
    CurrentUserInterface,
    CompanyListInterface,
} from '../../types';

@Injectable()
export class AuthFacade {
    selectedCurrentUserId$ = this.store.pipe(
        select(AuthSelector.selectCurrentUserId)
    );

    selectedCurrentUser$ = this.store.pipe(
        select(AuthSelector.selectCurrentUser)
    );

    selectedLoading$ = this.store.pipe(select(AuthSelector.selectLoading));

    selectedError$ = this.store.pipe(select(AuthSelector.selectError));

    constructor(
        private readonly store: Store,
        private readonly actionsListener$: ActionsSubject
    ) {}

    login(payload: LoginPayloadInterface) {
        this.store.dispatch(AuthActions.login({ payload }));
    }

    logout() {
        this.store.dispatch(AuthActions.logout());
    }

    loginSuccessAction(): Observable<
        GenericResponseInterface<LoginResponseInterface>
    > {
        return this.actionsListener$
            .pipe(ofType(AuthActions.loginSuccess))
            .pipe(map(({ payload }) => payload));
    }

    getCurrentUser() {
        this.store.dispatch(AuthActions.getCurrentUser());
    }

    getCurrentUserSuccessAction(): Observable<
        GenericResponseInterface<CurrentUserInterface> // Updated type
    > {
        return this.actionsListener$
            .pipe(ofType(AuthActions.getCurrentUserSuccess))
            .pipe(map(({ payload }) => payload));
    }

    switchCompany(companyId: string) {
        this.store.dispatch(AuthActions.switchCompany({ companyId }));
    }

    switchCompanySuccessAction(): Observable<
        GenericResponseInterface<string>
    > {
        return this.actionsListener$
            .pipe(ofType(AuthActions.switchCompanySuccess))
            .pipe(map(({ payload }) => payload));
    }

    getUserCompanies() {
        this.store.dispatch(AuthActions.getUserCompanies());
    }

    getUserCompaniesSuccessAction(): Observable<
        GenericResponseInterface<CompanyListInterface[]>
    > {
        return this.actionsListener$
            .pipe(ofType(AuthActions.getUserCompaniesSuccess))
            .pipe(map(({ payload }) => payload));
    }
}