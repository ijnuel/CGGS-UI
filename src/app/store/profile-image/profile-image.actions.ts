import { createAction, props } from '@ngrx/store';

export type ProfileImageEntityType = 'Administrator' | 'Staff' | 'Student';

// Upload
export const uploadProfileImage = createAction(
  '[ProfileImage] Upload',
  props<{ entityType: ProfileImageEntityType; entityId: string; file: File }>()
);

export const uploadProfileImageSuccess = createAction(
  '[ProfileImage/API] Upload Success',
  props<{ entityId: string; publicUrl: string }>()
);

export const uploadProfileImageFail = createAction(
  '[ProfileImage/API] Upload Fail',
  props<{ error: string }>()
);

// Load cached URL from localStorage into store
export const loadCachedPhotoUrl = createAction(
  '[ProfileImage] Load Cached Photo Url',
  props<{ entityId: string }>()
);

export const setCachedPhotoUrl = createAction(
  '[ProfileImage] Set Cached Photo Url',
  props<{ entityId: string; url: string | null }>()
);
