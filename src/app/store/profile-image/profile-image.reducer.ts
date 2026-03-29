import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ProfileImageAction from './profile-image.actions';

export const profileImageFeatureKey = 'profileImage';

export interface ProfileImageState {
  uploading: boolean;
  uploadSuccess: boolean;
  error: string | null;
  photoUrls: { [entityId: string]: string | null };
}

export const initialState: ProfileImageState = {
  uploading: false,
  uploadSuccess: false,
  error: null,
  photoUrls: {},
};

export const reducer = createReducer(
  initialState,
  on(ProfileImageAction.uploadProfileImage, (state) => ({
    ...state,
    uploading: true,
    uploadSuccess: false,
    error: null,
  })),
  on(ProfileImageAction.uploadProfileImageSuccess, (state, { entityId, publicUrl }) => ({
    ...state,
    uploading: false,
    uploadSuccess: true,
    photoUrls: { ...state.photoUrls, [entityId]: publicUrl },
  })),
  on(ProfileImageAction.uploadProfileImageFail, (state, { error }) => ({
    ...state,
    uploading: false,
    uploadSuccess: false,
    error,
  })),
  on(ProfileImageAction.setCachedPhotoUrl, (state, { entityId, url }) => ({
    ...state,
    photoUrls: { ...state.photoUrls, [entityId]: url },
  }))
);

export const selectProfileImageFeature = createFeatureSelector<ProfileImageState>(profileImageFeatureKey);

export const getUploading = (state: ProfileImageState) => state.uploading;
export const getUploadSuccess = (state: ProfileImageState) => state.uploadSuccess;
export const getError = (state: ProfileImageState) => state.error;
export const getPhotoUrls = (state: ProfileImageState) => state.photoUrls;
