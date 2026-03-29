import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProfileImageAction from './profile-image.actions';
import { ProfileImageEntityType } from './profile-image.actions';
import {
  selectUploading,
  selectUploadSuccess,
  selectDeleting,
  selectDeleteSuccess,
  selectError,
  selectPhotoUrlByEntityId,
} from './profile-image.selector';
import { ProfileImageState } from './profile-image.reducer';
import { environment } from '../../../environments/environment';
import { GenericResponseInterface } from '../../types';

const PHOTO_URL_KEY = 'profile_photo_url';

interface PresignedUploadResult {
  presignedUrl: string;
  objectKey: string;
  publicUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileImageFacade {
  uploading$: Observable<boolean>;
  uploadSuccess$: Observable<boolean>;
  deleting$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;
  error$: Observable<string | null>;

  // Separate HttpClient that bypasses interceptors — used for the direct R2 PUT
  private readonly r2Http: HttpClient;

  constructor(
    private store: Store<{ profileImage: ProfileImageState }>,
    private http: HttpClient,
    httpBackend: HttpBackend,
  ) {
    this.uploading$ = this.store.select(selectUploading);
    this.uploadSuccess$ = this.store.select(selectUploadSuccess);
    this.deleting$ = this.store.select(selectDeleting);
    this.deleteSuccess$ = this.store.select(selectDeleteSuccess);
    this.error$ = this.store.select(selectError);
    this.r2Http = new HttpClient(httpBackend);
  }

  getPhotoUrl$(entityId: string): Observable<string | null> {
    return this.store.select(selectPhotoUrlByEntityId(entityId));
  }

  /**
   * Handles the full 3-step upload flow directly in the facade to avoid
   * placing a non-serializable File object into the NgRx action payload.
   * Only serializable state transitions are dispatched to the store.
   */
  uploadProfileImage(entityType: ProfileImageEntityType, entityId: string, file: File): void {
    this.store.dispatch(ProfileImageAction.uploadProfileImageStart({ entityId }));

    this.http
      .get<GenericResponseInterface<PresignedUploadResult>>(
        `${environment.baseUrl}/${entityType}/${entityId}/GetProfileImageUploadUrl`,
        {
          params: { fileName: file.name, contentType: file.type },
          withCredentials: true,
        }
      )
      .pipe(
        switchMap((response) => {
          const { presignedUrl, objectKey, publicUrl } = response.entity;
          return this.r2Http
            .put(presignedUrl, file, {
              headers: new HttpHeaders({ 'Content-Type': file.type }),
            })
            .pipe(
              switchMap(() =>
                this.http.put<GenericResponseInterface<any>>(
                  `${environment.baseUrl}/${entityType}/${entityId}/UpdateProfileImage`,
                  { objectKey },
                  { withCredentials: true }
                )
              ),
              map(() => {
                localStorage.setItem(`${PHOTO_URL_KEY}_${entityId}`, publicUrl);
                return publicUrl;
              })
            );
        }),
        catchError((error) => {
          this.store.dispatch(
            ProfileImageAction.uploadProfileImageFail({
              error: error?.message ?? String(error),
            })
          );
          return of(null);
        })
      )
      .subscribe((publicUrl) => {
        if (publicUrl) {
          this.store.dispatch(
            ProfileImageAction.uploadProfileImageSuccess({ entityId, publicUrl })
          );
        }
      });
  }

  deleteProfileImage(entityType: ProfileImageEntityType, entityId: string): void {
    this.store.dispatch(ProfileImageAction.deleteProfileImage({ entityType, entityId }));
  }

  loadCachedPhotoUrl(entityId: string): void {
    this.store.dispatch(ProfileImageAction.loadCachedPhotoUrl({ entityId }));
  }
}
