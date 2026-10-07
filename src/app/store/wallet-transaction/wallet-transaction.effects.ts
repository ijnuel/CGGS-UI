import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as WalletTransactionAction from './wallet-transaction.actions';
import { environment } from '../../../environments/environment';
import { GenericResponseInterface } from '../../types';
import { WalletTransactionInterface } from '../../types/wallet-transaction';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WalletTransactionEffect {
  $walletTransactionAll = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletTransactionAction.getWalletTransactionAll),
      switchMap(({ query }) =>
        this.http
          .post<GenericResponseInterface<WalletTransactionInterface[]>>(
            `${environment.baseUrl}/StudentWalletTransaction/GetAll`,
            query,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              WalletTransactionAction.getWalletTransactionAllSuccess({ payload })
            ),
            catchError((error) =>
              of(WalletTransactionAction.getWalletTransactionAllFail({ error }))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
