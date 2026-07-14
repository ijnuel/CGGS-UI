import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageQueryInterface } from '../../types';
import { CompanyCoreValueFormInterface } from '../../types/company-core-value';
import { CompanyCoreValueState } from './company-core-value.reducer';
import * as CompanyCoreValueActions from './company-core-value.actions';
import * as CompanyCoreValueSelectors from './company-core-value.selector';

@Injectable({ providedIn: 'root' })
export class CompanyCoreValueFacade {
  companyCoreValueList$  = this.store.select(CompanyCoreValueSelectors.selectCompanyCoreValueList);
  companyCoreValueAll$   = this.store.select(CompanyCoreValueSelectors.selectCompanyCoreValueAll);
  companyCoreValueById$  = this.store.select(CompanyCoreValueSelectors.selectCompanyCoreValueById);
  loading$       = this.store.select(CompanyCoreValueSelectors.selectCompanyCoreValueLoading);
  error$         = this.store.select(CompanyCoreValueSelectors.selectCompanyCoreValueError);
  createSuccess$ = this.store.select(CompanyCoreValueSelectors.selectCompanyCoreValueCreateSuccess);
  updateSuccess$ = this.store.select(CompanyCoreValueSelectors.selectCompanyCoreValueUpdateSuccess);

  currentPageQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0, searchText: '' };

  constructor(private store: Store<{ companyCoreValue: CompanyCoreValueState }>) {}

  getCompanyCoreValueList(pageQuery: PageQueryInterface) {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(CompanyCoreValueActions.getCompanyCoreValueList({ pageQuery }));
  }

  getCompanyCoreValueAll(query?: any) {
    this.store.dispatch(CompanyCoreValueActions.getCompanyCoreValueAll({ query }));
  }

  getCompanyCoreValueById(id: string) {
    this.store.dispatch(CompanyCoreValueActions.getCompanyCoreValueById({ companyCoreValueId: id }));
  }

  createCompanyCoreValue(payload: CompanyCoreValueFormInterface) {
    this.store.dispatch(CompanyCoreValueActions.createCompanyCoreValue({ payload }));
  }

  updateCompanyCoreValue(payload: CompanyCoreValueFormInterface) {
    this.store.dispatch(CompanyCoreValueActions.updateCompanyCoreValue({ payload }));
  }

  deleteCompanyCoreValue(id: string) {
    this.store.dispatch(CompanyCoreValueActions.deleteCompanyCoreValue({ companyCoreValueId: id }));
  }
}
