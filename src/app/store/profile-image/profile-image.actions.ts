import { createAction, props } from '@ngrx/store';

export type ProfileImageEntityType = 'Administrator' | 'Staff' | 'Student';

// Upload — HTTP is handled in the facade to avoid putting a File object in the store.
// Only serializable state-transition actions go through the reducer/effects.
export const uploadProfileImageStart = createAction(
  '[ProfileImage] Upload Start',
  props<{ entityId: string }>()
);

export const uploadProfileImageSuccess = createAction(
  '[ProfileImage/API] Upload Success',
  props<{ entityId: string; publicUrl: string }>()
);

export const uploadProfileImageFail = createAction(
  '[ProfileImage/API] Upload Fail',
  props<{ error: string }>()
);

// Delete
export const deleteProfileImage = createAction(
  '[ProfileImage] Delete',
  props<{ entityType: ProfileImageEntityType; entityId: string }>()
);

export const deleteProfileImageSuccess = createAction(
  '[ProfileImage/API] Delete Success',
  props<{ entityId: string }>()
);

export const deleteProfileImageFail = createAction(
  '[ProfileImage/API] Delete Fail',
  props<{ error: string }>()
);

// Cache
export const loadCachedPhotoUrl = createAction(
  '[ProfileImage] Load Cached Photo Url',
  props<{ entityId: string }>()
);

export const setCachedPhotoUrl = createAction(
  '[ProfileImage] Set Cached Photo Url',
  props<{ entityId: string; url: string | null }>()
);
