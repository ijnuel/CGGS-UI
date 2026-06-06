import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FeeSetupListInterface, FeeSetupFormInterface } from '../../types/fee';
import { PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';
import * as FeeSetupAction from './fee-setup.actions';
import {
  selectFeeSetupAll,
  selectFeeSetupList,
  selectFeeSetupById,
  selectFeeSetupLoading,
  selectFeeSetupError,
  selectFeeSetupCreateSuccess,
  selectFeeSetupUpdateSuccess,
  selectFeeSetupDeleteSuccess,
} from './fee-setup.selector';
import { FeeSetupState } from './fee-setup.reducer';

@Injectable({ providedIn: 'root' })
export class FeeSetupFacade {
  feeSetupAll$: Observable<FeeSetupListInterface[] | null>;
  feeSetupList$: Observable<PaginatedResponseInterface<FeeSetupListInterface[]> | null>;
  feeSetupById$: Observable<FeeSetupListInterface | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;

  constructor(private store: Store<{ feeSetup: FeeSetupState }>) {
    this.feeSetupAll$ = this.store.select(selectFeeSetupAll);
    this.feeSetupList$ = this.store.select(selectFeeSetupList);
    this.feeSetupById$ = this.store.select(selectFeeSetupById);
    this.loading$ = this.store.select(selectFeeSetupLoading);
    this.error$ = this.store.select(selectFeeSetupError);
    this.createSuccess$ = this.store.select(selectFeeSetupCreateSuccess);
    this.updateSuccess$ = this.store.select(selectFeeSetupUpdateSuccess);
    this.deleteSuccess$ = this.store.select(selectFeeSetupDeleteSuccess);
  }

  getFeeSetupAll(query?: QueryInterface): void {
    this.store.dispatch(FeeSetupAction.getFeeSetupAll({ query }));
  }

  getFeeSetupList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(FeeSetupAction.getFeeSetupList({ pageQuery }));
  }

  getFeeSetupById(id: string): void {
    this.store.dispatch(FeeSetupAction.getFeeSetupById({ id }));
  }

  createFeeSetup(payload: FeeSetupFormInterface): void {
    this.store.dispatch(FeeSetupAction.createFeeSetup({ payload }));
  }

  updateFeeSetup(payload: FeeSetupFormInterface): void {
    this.store.dispatch(FeeSetupAction.updateFeeSetup({ payload }));
  }

  deleteFeeSetup(id: string): void {
    this.store.dispatch(FeeSetupAction.deleteFeeSetup({ id }));
  }

  invalidateCache(): void {
    this.store.dispatch(FeeSetupAction.invalidateCache());
  }
}
