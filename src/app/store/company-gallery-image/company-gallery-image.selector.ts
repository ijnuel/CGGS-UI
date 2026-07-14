import { createSelector } from '@ngrx/store';
import { CompanyGalleryImageState, getCompanyGalleryImageList, getCompanyGalleryImageAll, getCompanyGalleryImageById, getLoading, getError, getCreateSuccess, getUpdateSuccess } from './company-gallery-image.reducer';

export const selectCompanyGalleryImageState = (state: { companyGalleryImage: CompanyGalleryImageState }) => state.companyGalleryImage;

export const selectCompanyGalleryImageList     = createSelector(selectCompanyGalleryImageState, getCompanyGalleryImageList);
export const selectCompanyGalleryImageAll      = createSelector(selectCompanyGalleryImageState, getCompanyGalleryImageAll);
export const selectCompanyGalleryImageById     = createSelector(selectCompanyGalleryImageState, getCompanyGalleryImageById);
export const selectCompanyGalleryImageLoading  = createSelector(selectCompanyGalleryImageState, getLoading);
export const selectCompanyGalleryImageError    = createSelector(selectCompanyGalleryImageState, getError);
export const selectCompanyGalleryImageCreateSuccess = createSelector(selectCompanyGalleryImageState, getCreateSuccess);
export const selectCompanyGalleryImageUpdateSuccess = createSelector(selectCompanyGalleryImageState, getUpdateSuccess);
