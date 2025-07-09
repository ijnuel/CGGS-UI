import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  FamilyListInterface,
  FamilyFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as FamilyAction from './family.actions';
import {
  selectFamilyList,
  selectFamilyAll,
  selectFamilyByProperties,
  selectFamilyById,
  selectExists,
  selectCount,
  selectFamilyLoading,
  selectFamilyError,
  selectFamilyCreateSuccess,
  selectFamilyUpdateSuccess,
} from './family.selector';
import { FamilyState } from './family.reducer';

@Injectable({
  providedIn: 'root',
})
export class FamilyFacade {
  familyList$: Observable<PaginatedResponseInterface<FamilyListInterface[]> | null>;
  familyAll$: Observable<FamilyListInterface[] | null>;
  familyByProperties$: Observable<FamilyListInterface[] | null>;
  familyById$: Observable<FamilyListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ family: FamilyState }>) {
    this.familyList$ = this.store.select(selectFamilyList);
    this.familyAll$ = this.store.select(selectFamilyAll);
    this.familyByProperties$ = this.store.select(selectFamilyByProperties);
    this.familyById$ = this.store.select(selectFamilyById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectFamilyLoading);
    this.error$ = this.store.select(selectFamilyError);
    this.createSuccess$ = this.store.select(selectFamilyCreateSuccess);
    this.updateSuccess$ = this.store.select(selectFamilyUpdateSuccess);
  }

  getFamilyList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(FamilyAction.getFamilyList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getFamilyAll(): void {
    this.store.dispatch(FamilyAction.getFamilyAll());
  }

  getFamilyById(familyId: string): void {
    this.store.dispatch(FamilyAction.getFamilyById({ familyId }));
  }

  getFamilyByProperties(properties: Partial<FamilyFormInterface>): void {
    this.store.dispatch(FamilyAction.getFamilyByProperties({ properties }));
  }

  familyExists(properties: Partial<FamilyFormInterface>): void {
    this.store.dispatch(FamilyAction.familyExists({ properties }));
  }

  familyCount(): void {
    this.store.dispatch(FamilyAction.familyCount());
  }

  createFamily(family: FamilyFormInterface): void {
    this.store.dispatch(FamilyAction.createFamily({ payload: family }));
  }

  updateFamily(family: FamilyFormInterface): void {
    this.store.dispatch(FamilyAction.updateFamily({ payload: family }));
  }

  deleteFamily(familyId: string): void {
    this.store.dispatch(FamilyAction.deleteFamily({ familyId }));
  }

  createManyFamilys(familys: FamilyFormInterface[]): void {
    this.store.dispatch(FamilyAction.createManyFamilys({ payload: familys }));
  }

  updateManyFamilys(familys: FamilyFormInterface[]): void {
    this.store.dispatch(FamilyAction.updateManyFamilys({ payload: familys }));
  }

  deleteManyFamilys(familyIds: string[]): void {
    this.store.dispatch(FamilyAction.deleteManyFamilys({ familyIds }));
  }
}
