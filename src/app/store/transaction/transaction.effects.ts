import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as TransactionAction from './transaction.actions';
import { environment } from '../../../environments/environment';
import { TransactionListInterface } from '../../types/transaction';
import { GenericResponseInterface, PaginatedResponseInterface } from '../../types';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionEffect {
  $transactionList = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionAction.getTransactionList),
      switchMap(({ pageQuery }) =>
        this.http.post<GenericResponseInterface<PaginatedResponseInterface<TransactionListInterface[]>>>(
          `${environment.baseUrl}/Transaction/GetAllPaginated`,
          pageQuery,
          { withCredentials: true }
        ).pipe(
          map((payload) => TransactionAction.getTransactionListSuccess({ payload })),
          catchError((error) => of(TransactionAction.getTransactionListFail({ error })))
        )
      )
    )
  );

  $transactionById = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionAction.getTransactionById),
      switchMap(({ id }) =>
        this.http.get<GenericResponseInterface<TransactionListInterface>>(
          `${environment.baseUrl}/Transaction/GetById`,
          { params: { id }, withCredentials: true }
        ).pipe(
          map((payload) => TransactionAction.getTransactionByIdSuccess({ payload })),
          catchError((error) => of(TransactionAction.getTransactionByIdFail({ error })))
        )
      )
    )
  );

  $verifyTransaction = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionAction.verifyTransaction),
      switchMap(({ id }) =>
        this.http.get<any>(
          `${environment.baseUrl}/PaymentGateway/verify/${id}`,
          { withCredentials: true }
        ).pipe(
          mergeMap(() => [
            TransactionAction.verifyTransactionSuccess({ id }),
            TransactionAction.getTransactionById({ id }),
          ]),
          catchError((error) => of(TransactionAction.verifyTransactionFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
