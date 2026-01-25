import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AdministratorListInterface,
  AdministratorFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as AdministratorAction from './administrator.actions';
import {
  selectAdministratorList,
  selectAdministratorAll,
  selectAdministratorByProperties,
  selectAdministratorById,
  selectExists,
  selectCount,
  selectAdministratorLoading,
  selectAdministratorError,
  selectAdministratorCreateSuccess,
  selectAdministratorUpdateSuccess,
} from './administrator.selector';
import { AdministratorState } from './administrator.reducer';

@Injectable({
  providedIn: 'root',
})
export class AdministratorFacade {
  administratorList$: Observable<PaginatedResponseInterface<AdministratorListInterface[]> | null>;
  administratorAll$: Observable<AdministratorListInterface[] | null>;
  administratorByProperties$: Observable<AdministratorListInterface[] | null>;
  administratorById$: Observable<AdministratorListInterface | null>;
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

  constructor(private store: Store<{ administrator: AdministratorState }>) {
    this.administratorList$ = this.store.select(selectAdministratorList);
    this.administratorAll$ = this.store.select(selectAdministratorAll);
    this.administratorByProperties$ = this.store.select(selectAdministratorByProperties);
    this.administratorById$ = this.store.select(selectAdministratorById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectAdministratorLoading);
    this.error$ = this.store.select(selectAdministratorError);
    this.createSuccess$ = this.store.select(selectAdministratorCreateSuccess);
    this.updateSuccess$ = this.store.select(selectAdministratorUpdateSuccess);
  }

  getAdministratorList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(AdministratorAction.getAdministratorList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getAdministratorAll(query?: QueryInterface): void {
    this.store.dispatch(AdministratorAction.getAdministratorAll({ query }));
  }

  getAdministratorById(administratorId: string): void {
    this.store.dispatch(AdministratorAction.getAdministratorById({ administratorId }));
  }

  getAdministratorByProperties(properties: Partial<AdministratorFormInterface>): void {
    this.store.dispatch(AdministratorAction.getAdministratorByProperties({ properties }));
  }

  administratorExists(properties: Partial<AdministratorFormInterface>): void {
    this.store.dispatch(AdministratorAction.administratorExists({ properties }));
  }

  administratorCount(): void {
    this.store.dispatch(AdministratorAction.administratorCount());
  }

  createAdministrator(administrator: AdministratorFormInterface): void {
    this.store.dispatch(AdministratorAction.createAdministrator({ payload: administrator }));
  }

  updateAdministrator(administrator: AdministratorFormInterface): void {
    this.store.dispatch(AdministratorAction.updateAdministrator({ payload: administrator }));
  }

  deleteAdministrator(administratorId: string): void {
    this.store.dispatch(AdministratorAction.deleteAdministrator({ administratorId }));
  }

  createManyAdministrators(administrators: AdministratorFormInterface[]): void {
    this.store.dispatch(AdministratorAction.createManyAdministrators({ payload: administrators }));
  }

  updateManyAdministrators(administrators: AdministratorFormInterface[]): void {
    this.store.dispatch(AdministratorAction.updateManyAdministrators({ payload: administrators }));
  }

  deleteManyAdministrators(administratorIds: string[]): void {
    this.store.dispatch(AdministratorAction.deleteManyAdministrators({ administratorIds }));
  }
}
