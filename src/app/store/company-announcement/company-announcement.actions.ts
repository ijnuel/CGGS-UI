import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface, PaginatedResponseInterface, PageQueryInterface, QueryInterface } from '../../types';
import { CompanyAnnouncementListInterface, CompanyAnnouncementFormInterface } from '../../types/company-announcement';

export const getCompanyAnnouncementAll = createAction('[CompanyAnnouncement] Get All', props<{ query?: QueryInterface }>());
export const getCompanyAnnouncementAllSuccess = createAction('[CompanyAnnouncement/API] Get All Success', props<{ payload: GenericResponseInterface<CompanyAnnouncementListInterface[]> }>());
export const getCompanyAnnouncementAllFail = createAction('[CompanyAnnouncement/API] Get All Fail', props<{ error: string }>());

export const getCompanyAnnouncementList = createAction('[CompanyAnnouncement] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getCompanyAnnouncementListSuccess = createAction('[CompanyAnnouncement/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<CompanyAnnouncementListInterface[]>> }>());
export const getCompanyAnnouncementListFail = createAction('[CompanyAnnouncement/API] Get List Fail', props<{ error: string }>());

export const getCompanyAnnouncementById = createAction('[CompanyAnnouncement] Get By Id', props<{ companyAnnouncementId: string }>());
export const getCompanyAnnouncementByIdSuccess = createAction('[CompanyAnnouncement/API] Get By Id Success', props<{ payload: GenericResponseInterface<CompanyAnnouncementListInterface> }>());
export const getCompanyAnnouncementByIdFail = createAction('[CompanyAnnouncement/API] Get By Id Fail', props<{ error: string }>());

export const createCompanyAnnouncement = createAction('[CompanyAnnouncement] Create', props<{ payload: CompanyAnnouncementFormInterface }>());
export const createCompanyAnnouncementSuccess = createAction('[CompanyAnnouncement/API] Create Success', props<{ payload: GenericResponseInterface<CompanyAnnouncementListInterface> }>());
export const createCompanyAnnouncementFail = createAction('[CompanyAnnouncement/API] Create Fail', props<{ error: string }>());

export const updateCompanyAnnouncement = createAction('[CompanyAnnouncement] Update', props<{ payload: CompanyAnnouncementFormInterface }>());
export const updateCompanyAnnouncementSuccess = createAction('[CompanyAnnouncement/API] Update Success', props<{ payload: GenericResponseInterface<CompanyAnnouncementListInterface> }>());
export const updateCompanyAnnouncementFail = createAction('[CompanyAnnouncement/API] Update Fail', props<{ error: string }>());

export const deleteCompanyAnnouncement = createAction('[CompanyAnnouncement] Delete', props<{ companyAnnouncementId: string }>());
export const deleteCompanyAnnouncementSuccess = createAction('[CompanyAnnouncement/API] Delete Success', props<{ payload: GenericResponseInterface<boolean> }>());
export const deleteCompanyAnnouncementFail = createAction('[CompanyAnnouncement/API] Delete Fail', props<{ error: string }>());
