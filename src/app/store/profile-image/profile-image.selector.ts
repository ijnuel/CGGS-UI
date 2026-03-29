import { createSelector } from '@ngrx/store';
import {
  getUploading,
  getUploadSuccess,
  getError,
  getPhotoUrls,
  ProfileImageState,
} from './profile-image.reducer';

export const selectProfileImageState = (state: { profileImage: ProfileImageState }) =>
  state.profileImage;

export const selectUploading = createSelector(selectProfileImageState, getUploading);
export const selectUploadSuccess = createSelector(selectProfileImageState, getUploadSuccess);
export const selectError = createSelector(selectProfileImageState, getError);
export const selectPhotoUrls = createSelector(selectProfileImageState, getPhotoUrls);

export const selectPhotoUrlByEntityId = (entityId: string) =>
  createSelector(selectPhotoUrls, (urls) => urls[entityId] ?? null);
