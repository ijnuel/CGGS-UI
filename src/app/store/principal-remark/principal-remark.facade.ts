import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  PrincipalRemarkListInterface,
  PrincipalRemarkFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as PrincipalRemarkAction from './principal-remark.actions';
import {
  selectPrincipalRemarkList,
  selectPrincipalRemarkAll,
  selectPrincipalRemarkByProperties,
  selectPrincipalRemarkById,
  selectExists,
  selectCount,
  selectPrincipalRemarkLoading,
  selectPrincipalRemarkError,
  selectPrincipalRemarkCreateSuccess,
  selectPrincipalRemarkUpdateSuccess,
  selectPrincipalRemarkDeleteSuccess,
} from './principal-remark.selector';
import { PrincipalRemarkState } from './principal-remark.reducer';

@Injectable({
  providedIn: 'root',
})
export class PrincipalRemarkFacade {
  principalRemarkList$: Observable<PaginatedResponseInterface<PrincipalRemarkListInterface[]> | null>;
  principalRemarkAll$: Observable<PrincipalRemarkListInterface[] | null>;
  principalRemarkByProperties$: Observable<PrincipalRemarkListInterface[] | null>;
  principalRemarkById$: Observable<PrincipalRemarkListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ principalRemark: PrincipalRemarkState }>) {
    this.principalRemarkList$ = this.store.select(selectPrincipalRemarkList);
    this.principalRemarkAll$ = this.store.select(selectPrincipalRemarkAll);
    this.principalRemarkByProperties$ = this.store.select(selectPrincipalRemarkByProperties);
    this.principalRemarkById$ = this.store.select(selectPrincipalRemarkById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectPrincipalRemarkLoading);
    this.error$ = this.store.select(selectPrincipalRemarkError);
    this.createSuccess$ = this.store.select(selectPrincipalRemarkCreateSuccess);
    this.updateSuccess$ = this.store.select(selectPrincipalRemarkUpdateSuccess);
    this.deleteSuccess$ = this.store.select(selectPrincipalRemarkDeleteSuccess);
  }

  getPrincipalRemarkList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(PrincipalRemarkAction.getPrincipalRemarkList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getPrincipalRemarkAll(): void {
    this.store.dispatch(PrincipalRemarkAction.getPrincipalRemarkAll());
  }

  getPrincipalRemarkById(principalRemarkId: string): void {
    this.store.dispatch(PrincipalRemarkAction.getPrincipalRemarkById({ principalRemarkId }));
  }

  getPrincipalRemarkByProperties(properties: Partial<PrincipalRemarkFormInterface>): void {
    this.store.dispatch(PrincipalRemarkAction.getPrincipalRemarkByProperties({ properties }));
  }

  principalRemarkExists(properties: Partial<PrincipalRemarkFormInterface>): void {
    this.store.dispatch(PrincipalRemarkAction.principalRemarkExists({ properties }));
  }

  principalRemarkCount(): void {
    this.store.dispatch(PrincipalRemarkAction.principalRemarkCount());
  }

  createPrincipalRemark(principalRemark: PrincipalRemarkFormInterface): void {
    this.store.dispatch(PrincipalRemarkAction.createPrincipalRemark({ payload: principalRemark }));
  }

  updatePrincipalRemark(principalRemark: PrincipalRemarkFormInterface): void {
    this.store.dispatch(PrincipalRemarkAction.updatePrincipalRemark({ payload: principalRemark }));
  }

  deletePrincipalRemark(principalRemarkId: string): void {
    this.store.dispatch(PrincipalRemarkAction.deletePrincipalRemark({ principalRemarkId }));
  }

  createManyPrincipalRemarks(principalRemarks: PrincipalRemarkFormInterface[]): void {
    this.store.dispatch(PrincipalRemarkAction.createManyPrincipalRemarks({ payload: principalRemarks }));
  }

  updateManyPrincipalRemarks(principalRemarks: PrincipalRemarkFormInterface[]): void {
    this.store.dispatch(PrincipalRemarkAction.updateManyPrincipalRemarks({ payload: principalRemarks }));
  }

  deleteManyPrincipalRemarks(principalRemarkIds: string[]): void {
    this.store.dispatch(PrincipalRemarkAction.deleteManyPrincipalRemarks({ principalRemarkIds }));
  }
}
