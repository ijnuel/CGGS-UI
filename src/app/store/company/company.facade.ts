import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CompanyListInterface,
  CompanyFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as CompanyAction from './company.actions';
import {
  selectCompanyList,
  selectCompanyAll,
  selectCompanyByProperties,
  selectCompanyById,
  selectExists,
  selectCount,
  selectCompanyLoading,
  selectCompanyError,
  selectCompanyCreateSuccess,
  selectCompanyUpdateSuccess,
} from './company.selector';
import { CompanyState } from './company.reducer';

@Injectable({
  providedIn: 'root',
})
export class CompanyFacade {
  companyList$: Observable<PaginatedResponseInterface<CompanyListInterface[]> | null>;
  companyAll$: Observable<CompanyListInterface[] | null>;
  companyByProperties$: Observable<CompanyListInterface[] | null>;
  companyById$: Observable<CompanyListInterface | null>;
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

  constructor(private store: Store<{ company: CompanyState }>) {
    this.companyList$ = this.store.select(selectCompanyList);
    this.companyAll$ = this.store.select(selectCompanyAll);
    this.companyByProperties$ = this.store.select(selectCompanyByProperties);
    this.companyById$ = this.store.select(selectCompanyById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectCompanyLoading);
    this.error$ = this.store.select(selectCompanyError);
    this.createSuccess$ = this.store.select(selectCompanyCreateSuccess);
    this.updateSuccess$ = this.store.select(selectCompanyUpdateSuccess);
  }

  getCompanyList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(CompanyAction.getCompanyList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getCompanyAll(query?: QueryInterface): void {
    this.store.dispatch(CompanyAction.getCompanyAll({ query }));
  }

  getCompanyById(companyId: string): void {
    this.store.dispatch(CompanyAction.getCompanyById({ companyId }));
  }

  getCompanyByProperties(properties: Partial<CompanyFormInterface>): void {
    this.store.dispatch(CompanyAction.getCompanyByProperties({ properties }));
  }

  companyExists(properties: Partial<CompanyFormInterface>): void {
    this.store.dispatch(CompanyAction.companyExists({ properties }));
  }

  companyCount(): void {
    this.store.dispatch(CompanyAction.companyCount());
  }

  createCompany(company: CompanyFormInterface): void {
    this.store.dispatch(CompanyAction.createCompany({ payload: company }));
  }

  updateCompany(company: CompanyFormInterface): void {
    this.store.dispatch(CompanyAction.updateCompany({ payload: company }));
  }

  deleteCompany(companyId: string): void {
    this.store.dispatch(CompanyAction.deleteCompany({ companyId }));
  }

  createManyCompanys(companys: CompanyFormInterface[]): void {
    this.store.dispatch(CompanyAction.createManyCompanys({ payload: companys }));
  }

  updateManyCompanys(companys: CompanyFormInterface[]): void {
    this.store.dispatch(CompanyAction.updateManyCompanys({ payload: companys }));
  }

  deleteManyCompanys(companyIds: string[]): void {
    this.store.dispatch(CompanyAction.deleteManyCompanys({ companyIds }));
  }
}
