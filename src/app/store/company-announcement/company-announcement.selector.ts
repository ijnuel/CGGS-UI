import { createSelector } from '@ngrx/store';
import { CompanyAnnouncementState, getCompanyAnnouncementList, getCompanyAnnouncementAll, getCompanyAnnouncementById, getLoading, getError, getCreateSuccess, getUpdateSuccess } from './company-announcement.reducer';

export const selectCompanyAnnouncementState = (state: { companyAnnouncement: CompanyAnnouncementState }) => state.companyAnnouncement;

export const selectCompanyAnnouncementList     = createSelector(selectCompanyAnnouncementState, getCompanyAnnouncementList);
export const selectCompanyAnnouncementAll      = createSelector(selectCompanyAnnouncementState, getCompanyAnnouncementAll);
export const selectCompanyAnnouncementById     = createSelector(selectCompanyAnnouncementState, getCompanyAnnouncementById);
export const selectCompanyAnnouncementLoading  = createSelector(selectCompanyAnnouncementState, getLoading);
export const selectCompanyAnnouncementError    = createSelector(selectCompanyAnnouncementState, getError);
export const selectCompanyAnnouncementCreateSuccess = createSelector(selectCompanyAnnouncementState, getCreateSuccess);
export const selectCompanyAnnouncementUpdateSuccess = createSelector(selectCompanyAnnouncementState, getUpdateSuccess);
