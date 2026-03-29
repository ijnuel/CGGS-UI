import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProfileImageAction from './profile-image.actions';
import { ProfileImageEntityType } from './profile-image.actions';
import {
  selectUploading,
  selectUploadSuccess,
  selectError,
  selectPhotoUrlByEntityId,
} from './profile-image.selector';
import { ProfileImageState } from './profile-image.reducer';

@Injectable({ providedIn: 'root' })
export class ProfileImageFacade {
  uploading$: Observable<boolean>;
  uploadSuccess$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ profileImage: ProfileImageState }>) {
    this.uploading$ = this.store.select(selectUploading);
    this.uploadSuccess$ = this.store.select(selectUploadSuccess);
    this.error$ = this.store.select(selectError);
  }

  getPhotoUrl$(entityId: string): Observable<string | null> {
    return this.store.select(selectPhotoUrlByEntityId(entityId));
  }

  uploadProfileImage(entityType: ProfileImageEntityType, entityId: string, file: File): void {
    this.store.dispatch(ProfileImageAction.uploadProfileImage({ entityType, entityId, file }));
  }

  loadCachedPhotoUrl(entityId: string): void {
    this.store.dispatch(ProfileImageAction.loadCachedPhotoUrl({ entityId }));
  }
}
