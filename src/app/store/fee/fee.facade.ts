import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  FeeListInterface,
  FeeLineListInterface,
  GenerateFeesByTermSessionRequest,
  GenerateFeesBySessionAndTermRequest,
  GenerateFeesByTermSessionForStudentRequest,
  GenerateFeesBySessionAndTermForStudentRequest,
} from '../../types/fee';
import { PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';
import * as FeeAction from './fee.actions';
import {
  selectFeeAll,
  selectFeeLineAll,
  selectFeeList,
  selectFeeByProperties,
  selectFeeLoading,
  selectFeeGenerating,
  selectFeeGenerateSuccess,
  selectFeeError,
} from './fee.selector';
import { FeeState } from './fee.reducer';

@Injectable({ providedIn: 'root' })
export class FeeFacade {
  feeAll$: Observable<FeeListInterface[] | null>;
  feeLineAll$: Observable<FeeLineListInterface[] | null>;
  feeList$: Observable<PaginatedResponseInterface<FeeListInterface[]> | null>;
  feeByProperties$: Observable<FeeListInterface[] | null>;
  loading$: Observable<boolean>;
  generating$: Observable<boolean>;
  generateSuccess$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ fee: FeeState }>) {
    this.feeAll$ = this.store.select(selectFeeAll);
    this.feeLineAll$ = this.store.select(selectFeeLineAll);
    this.feeList$ = this.store.select(selectFeeList);
    this.feeByProperties$ = this.store.select(selectFeeByProperties);
    this.loading$ = this.store.select(selectFeeLoading);
    this.generating$ = this.store.select(selectFeeGenerating);
    this.generateSuccess$ = this.store.select(selectFeeGenerateSuccess);
    this.error$ = this.store.select(selectFeeError);
  }

  getFeeAll(query?: QueryInterface): void {
    this.store.dispatch(FeeAction.getFeeAll({ query }));
  }

  getFeeLineAll(query?: QueryInterface): void {
    this.store.dispatch(FeeAction.getFeeLineAll({ query }));
  }

  getFeeList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(FeeAction.getFeeList({ pageQuery }));
  }

  getFeeByProperties(query: QueryInterface): void {
    this.store.dispatch(FeeAction.getFeeByProperties({ query }));
  }

  generateFeesByTermSession(payload: GenerateFeesByTermSessionRequest): void {
    this.store.dispatch(FeeAction.generateFeesByTermSession({ payload }));
  }

  generateFeesBySessionAndTerm(payload: GenerateFeesBySessionAndTermRequest): void {
    this.store.dispatch(FeeAction.generateFeesBySessionAndTerm({ payload }));
  }

  generateFeesByTermSessionForStudent(payload: GenerateFeesByTermSessionForStudentRequest): void {
    this.store.dispatch(FeeAction.generateFeesByTermSessionForStudent({ payload }));
  }

  generateFeesBySessionAndTermForStudent(payload: GenerateFeesBySessionAndTermForStudentRequest): void {
    this.store.dispatch(FeeAction.generateFeesBySessionAndTermForStudent({ payload }));
  }
}
