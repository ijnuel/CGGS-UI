import { createAction, props } from '@ngrx/store';
import { GenericResponseInterface, PaginatedResponseInterface, PageQueryInterface, QueryInterface } from '../../types';
import { CompanyGalleryImageListInterface, CompanyGalleryImageFormInterface } from '../../types/company-gallery-image';

export const getCompanyGalleryImageAll = createAction('[CompanyGalleryImage] Get All', props<{ query?: QueryInterface }>());
export const getCompanyGalleryImageAllSuccess = createAction('[CompanyGalleryImage/API] Get All Success', props<{ payload: GenericResponseInterface<CompanyGalleryImageListInterface[]> }>());
export const getCompanyGalleryImageAllFail = createAction('[CompanyGalleryImage/API] Get All Fail', props<{ error: string }>());

export const getCompanyGalleryImageList = createAction('[CompanyGalleryImage] Get List', props<{ pageQuery: PageQueryInterface }>());
export const getCompanyGalleryImageListSuccess = createAction('[CompanyGalleryImage/API] Get List Success', props<{ payload: GenericResponseInterface<PaginatedResponseInterface<CompanyGalleryImageListInterface[]>> }>());
export const getCompanyGalleryImageListFail = createAction('[CompanyGalleryImage/API] Get List Fail', props<{ error: string }>());

export const getCompanyGalleryImageById = createAction('[CompanyGalleryImage] Get By Id', props<{ companyGalleryImageId: string }>());
export const getCompanyGalleryImageByIdSuccess = createAction('[CompanyGalleryImage/API] Get By Id Success', props<{ payload: GenericResponseInterface<CompanyGalleryImageListInterface> }>());
export const getCompanyGalleryImageByIdFail = createAction('[CompanyGalleryImage/API] Get By Id Fail', props<{ error: string }>());

export const createCompanyGalleryImage = createAction('[CompanyGalleryImage] Create', props<{ payload: CompanyGalleryImageFormInterface }>());
export const createCompanyGalleryImageSuccess = createAction('[CompanyGalleryImage/API] Create Success', props<{ payload: GenericResponseInterface<CompanyGalleryImageListInterface> }>());
export const createCompanyGalleryImageFail = createAction('[CompanyGalleryImage/API] Create Fail', props<{ error: string }>());

export const updateCompanyGalleryImage = createAction('[CompanyGalleryImage] Update', props<{ payload: CompanyGalleryImageFormInterface }>());
export const updateCompanyGalleryImageSuccess = createAction('[CompanyGalleryImage/API] Update Success', props<{ payload: GenericResponseInterface<CompanyGalleryImageListInterface> }>());
export const updateCompanyGalleryImageFail = createAction('[CompanyGalleryImage/API] Update Fail', props<{ error: string }>());

export const deleteCompanyGalleryImage = createAction('[CompanyGalleryImage] Delete', props<{ companyGalleryImageId: string }>());
export const deleteCompanyGalleryImageSuccess = createAction('[CompanyGalleryImage/API] Delete Success', props<{ payload: GenericResponseInterface<boolean> }>());
export const deleteCompanyGalleryImageFail = createAction('[CompanyGalleryImage/API] Delete Fail', props<{ error: string }>());
