import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  FeeListInterface,
  GenerateFeesByTermSessionRequest,
  GenerateFeesBySessionAndTermRequest,
  GenerateFeesByTermSessionForStudentRequest,
  GenerateFeesBySessionAndTermForStudentRequest,
} from '../../types/fee';
import { PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';
import * as FeeAction from './fee.actions';
import {
  selectFeeAll,
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
  feeList$: Observable<PaginatedResponseInterface<FeeListInterface[]> | null>;
  feeByProperties$: Observable<FeeListInterface[] | null>;
  loading$: Observable<boolean>;
  generating$: Observable<boolean>;
  generateSuccess$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ fee: FeeState }>) {
    this.feeAll$ = this.store.select(selectFeeAll);
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
