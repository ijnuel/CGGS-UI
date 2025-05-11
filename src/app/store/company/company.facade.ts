import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CompanyActions from './company.actions';
import * as CompanySelector from './company.selector';
import { PageQueryInterface, CompanyFormInterface } from '../../types';

@Injectable()
export class CompanyFacade {
  selectCompanyList$ = this.store.pipe(
    select(CompanySelector.selectCompanyList)
  );

  selectCompanyById$ = this.store.pipe(
    select(CompanySelector.selectCompanyById)
  );

  selectedLoading$ = this.store.pipe(select(CompanySelector.selectLoading));

  selectedError$ = this.store.pipe(select(CompanySelector.selectError));

  constructor(private readonly store: Store) {}

  getCompanyList(pageQuery: PageQueryInterface) {
    this.store.dispatch(CompanyActions.getCompanyList({ pageQuery }));
  }

  getCompanyById(companyId: string) {
    this.store.dispatch(CompanyActions.getCompanyById({ companyId }));
  }

  createCompany(payload: CompanyFormInterface) {
    this.store.dispatch(CompanyActions.createCompany({ payload }));
  }

  updateCompany(payload: CompanyFormInterface) {
    this.store.dispatch(CompanyActions.editCompany({ payload }));
  }
}
