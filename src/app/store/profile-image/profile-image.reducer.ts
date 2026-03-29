import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as ProfileImageAction from './profile-image.actions';

export const profileImageFeatureKey = 'profileImage';

export interface ProfileImageState {
  uploading: boolean;
  uploadSuccess: boolean;
  deleting: boolean;
  deleteSuccess: boolean;
  error: string | null;
  photoUrls: { [entityId: string]: string | null };
}

export const initialState: ProfileImageState = {
  uploading: false,
  uploadSuccess: false,
  deleting: false,
  deleteSuccess: false,
  error: null,
  photoUrls: {},
};

export const reducer = createReducer(
  initialState,
  // Upload
  on(ProfileImageAction.uploadProfileImageStart, (state) => ({
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
  // Delete
  on(ProfileImageAction.deleteProfileImage, (state) => ({
    ...state,
    deleting: true,
    deleteSuccess: false,
    error: null,
  })),
  on(ProfileImageAction.deleteProfileImageSuccess, (state, { entityId }) => ({
    ...state,
    deleting: false,
    deleteSuccess: true,
    photoUrls: { ...state.photoUrls, [entityId]: null },
  })),
  on(ProfileImageAction.deleteProfileImageFail, (state, { error }) => ({
    ...state,
    deleting: false,
    deleteSuccess: false,
    error,
  })),
  // Cache
  on(ProfileImageAction.setCachedPhotoUrl, (state, { entityId, url }) => ({
    ...state,
    photoUrls: { ...state.photoUrls, [entityId]: url },
  }))
);

export const selectProfileImageFeature = createFeatureSelector<ProfileImageState>(profileImageFeatureKey);

export const getUploading = (state: ProfileImageState) => state.uploading;
export const getUploadSuccess = (state: ProfileImageState) => state.uploadSuccess;
export const getDeleting = (state: ProfileImageState) => state.deleting;
export const getDeleteSuccess = (state: ProfileImageState) => state.deleteSuccess;
export const getError = (state: ProfileImageState) => state.error;
export const getPhotoUrls = (state: ProfileImageState) => state.photoUrls;
