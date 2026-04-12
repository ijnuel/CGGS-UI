import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FeeTypeListInterface, FeeTypeFormInterface } from '../../types/fee';
import { PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';
import * as FeeTypeAction from './fee-type.actions';
import {
  selectFeeTypeAll,
  selectFeeTypeList,
  selectFeeTypeById,
  selectFeeTypeLoading,
  selectFeeTypeError,
  selectFeeTypeCreateSuccess,
  selectFeeTypeUpdateSuccess,
  selectFeeTypeDeleteSuccess,
} from './fee-type.selector';
import { FeeTypeState } from './fee-type.reducer';

@Injectable({ providedIn: 'root' })
export class FeeTypeFacade {
  feeTypeAll$: Observable<FeeTypeListInterface[] | null>;
  feeTypeList$: Observable<PaginatedResponseInterface<FeeTypeListInterface[]> | null>;
  feeTypeById$: Observable<FeeTypeListInterface | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;

  constructor(private store: Store<{ feeType: FeeTypeState }>) {
    this.feeTypeAll$ = this.store.select(selectFeeTypeAll);
    this.feeTypeList$ = this.store.select(selectFeeTypeList);
    this.feeTypeById$ = this.store.select(selectFeeTypeById);
    this.loading$ = this.store.select(selectFeeTypeLoading);
    this.error$ = this.store.select(selectFeeTypeError);
    this.createSuccess$ = this.store.select(selectFeeTypeCreateSuccess);
    this.updateSuccess$ = this.store.select(selectFeeTypeUpdateSuccess);
    this.deleteSuccess$ = this.store.select(selectFeeTypeDeleteSuccess);
  }

  getFeeTypeAll(query?: QueryInterface): void {
    this.store.dispatch(FeeTypeAction.getFeeTypeAll({ query }));
  }

  getFeeTypeList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(FeeTypeAction.getFeeTypeList({ pageQuery }));
  }

  getFeeTypeById(id: string): void {
    this.store.dispatch(FeeTypeAction.getFeeTypeById({ id }));
  }

  createFeeType(payload: FeeTypeFormInterface): void {
    this.store.dispatch(FeeTypeAction.createFeeType({ payload }));
  }

  updateFeeType(payload: FeeTypeFormInterface): void {
    this.store.dispatch(FeeTypeAction.updateFeeType({ payload }));
  }

  deleteFeeType(id: string): void {
    this.store.dispatch(FeeTypeAction.deleteFeeType({ id }));
  }

  invalidateCache(): void {
    this.store.dispatch(FeeTypeAction.invalidateCache());
  }
}
