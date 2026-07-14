import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageQueryInterface } from '../../types';
import { CompanyAnnouncementFormInterface } from '../../types/company-announcement';
import { CompanyAnnouncementState } from './company-announcement.reducer';
import * as CompanyAnnouncementActions from './company-announcement.actions';
import * as CompanyAnnouncementSelectors from './company-announcement.selector';

@Injectable({ providedIn: 'root' })
export class CompanyAnnouncementFacade {
  companyAnnouncementList$  = this.store.select(CompanyAnnouncementSelectors.selectCompanyAnnouncementList);
  companyAnnouncementAll$   = this.store.select(CompanyAnnouncementSelectors.selectCompanyAnnouncementAll);
  companyAnnouncementById$  = this.store.select(CompanyAnnouncementSelectors.selectCompanyAnnouncementById);
  loading$          = this.store.select(CompanyAnnouncementSelectors.selectCompanyAnnouncementLoading);
  error$            = this.store.select(CompanyAnnouncementSelectors.selectCompanyAnnouncementError);
  createSuccess$    = this.store.select(CompanyAnnouncementSelectors.selectCompanyAnnouncementCreateSuccess);
  updateSuccess$    = this.store.select(CompanyAnnouncementSelectors.selectCompanyAnnouncementUpdateSuccess);

  currentPageQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0, searchText: '' };

  constructor(private store: Store<{ companyAnnouncement: CompanyAnnouncementState }>) {}

  getCompanyAnnouncementList(pageQuery: PageQueryInterface) {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(CompanyAnnouncementActions.getCompanyAnnouncementList({ pageQuery }));
  }

  getCompanyAnnouncementAll(query?: any) {
    this.store.dispatch(CompanyAnnouncementActions.getCompanyAnnouncementAll({ query }));
  }

  getCompanyAnnouncementById(id: string) {
    this.store.dispatch(CompanyAnnouncementActions.getCompanyAnnouncementById({ companyAnnouncementId: id }));
  }

  createCompanyAnnouncement(payload: CompanyAnnouncementFormInterface) {
    this.store.dispatch(CompanyAnnouncementActions.createCompanyAnnouncement({ payload }));
  }

  updateCompanyAnnouncement(payload: CompanyAnnouncementFormInterface) {
    this.store.dispatch(CompanyAnnouncementActions.updateCompanyAnnouncement({ payload }));
  }

  deleteCompanyAnnouncement(id: string) {
    this.store.dispatch(CompanyAnnouncementActions.deleteCompanyAnnouncement({ companyAnnouncementId: id }));
  }
}
