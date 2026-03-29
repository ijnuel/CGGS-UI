import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import * as ProfileImageAction from './profile-image.actions';
import { environment } from '../../../environments/environment';
import { GenericResponseInterface } from '../../types';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

const PHOTO_URL_KEY = 'profile_photo_url';

interface PresignedUploadResult {
  presignedUrl: string;
  objectKey: string;
  publicUrl: string;
}

@Injectable()
export class ProfileImageEffect {
  private r2Http: HttpClient;

  $uploadProfileImage = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileImageAction.uploadProfileImage),
      switchMap(({ entityType, entityId, file }) =>
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
                    return ProfileImageAction.uploadProfileImageSuccess({ entityId, publicUrl });
                  })
                );
            }),
            catchError((error) =>
              of(
                ProfileImageAction.uploadProfileImageFail({
                  error: error?.message ?? String(error),
                })
              )
            )
          )
      )
    )
  );

  $loadCachedPhotoUrl = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileImageAction.loadCachedPhotoUrl),
      map(({ entityId }) => {
        const url = localStorage.getItem(`${PHOTO_URL_KEY}_${entityId}`);
        return ProfileImageAction.setCachedPhotoUrl({ entityId, url });
      })
    )
  );

  // Loading spinner
  $uploadLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileImageAction.uploadProfileImage),
        tap((action) => this.globalLoadingFacade.globalLoadingShow(action.type))
      ),
    { dispatch: false }
  );

  $uploadLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProfileImageAction.uploadProfileImageSuccess,
          ProfileImageAction.uploadProfileImageFail
        ),
        tap(() => this.globalLoadingFacade.globalLoadingHide())
      ),
    { dispatch: false }
  );

  // Toast messages
  $uploadSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileImageAction.uploadProfileImageSuccess),
        tap(() =>
          this.globalLoadingFacade.globalSuccessShow('Profile photo updated successfully', 3000)
        )
      ),
    { dispatch: false }
  );

  $uploadFail = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileImageAction.uploadProfileImageFail),
        tap(({ error }) =>
          this.globalLoadingFacade.globalErrorShow(
            error || 'Failed to upload photo. Please try again.',
            3000
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    httpBackend: HttpBackend,
    private globalLoadingFacade: GlobalLoadingFacade
  ) {
    this.r2Http = new HttpClient(httpBackend);
  }
}
