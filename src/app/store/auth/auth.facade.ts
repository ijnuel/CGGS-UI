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
} from '../../types';

@Injectable()
export class AuthFacade {
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
}