import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as ProfileImageAction from './profile-image.actions';
import { environment } from '../../../environments/environment';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

const PHOTO_URL_KEY = 'profile_photo_url';

@Injectable()
export class ProfileImageEffect {

  // Delete profile image via API
  $deleteProfileImage = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileImageAction.deleteProfileImage),
      switchMap(({ entityType, entityId }) =>
        this.http
          .delete<any>(
            `${environment.baseUrl}/${entityType}/${entityId}/DeleteProfileImage`,
            { withCredentials: true }
          )
          .pipe(
            map(() => ProfileImageAction.deleteProfileImageSuccess({ entityId })),
            catchError((error) =>
              of(ProfileImageAction.deleteProfileImageFail({
                error: error?.message ?? String(error),
              }))
            )
          )
      )
    )
  );

  // Load cached URL from localStorage into store
  $loadCachedPhotoUrl = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileImageAction.loadCachedPhotoUrl),
      map(({ entityId }) => {
        const url = localStorage.getItem(`${PHOTO_URL_KEY}_${entityId}`);
        return ProfileImageAction.setCachedPhotoUrl({ entityId, url });
      })
    )
  );

  // Clear localStorage on delete success
  $deletePhotoUrlClear = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileImageAction.deleteProfileImageSuccess),
        tap(({ entityId }) => {
          localStorage.removeItem(`${PHOTO_URL_KEY}_${entityId}`);
        })
      ),
    { dispatch: false }
  );

  // Loading spinner
  $deleteLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileImageAction.deleteProfileImage),
        tap((action) => this.globalLoadingFacade.globalLoadingShow(action.type))
      ),
    { dispatch: false }
  );

  $deleteLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProfileImageAction.deleteProfileImageSuccess,
          ProfileImageAction.deleteProfileImageFail
        ),
        tap(() => this.globalLoadingFacade.globalLoadingHide())
      ),
    { dispatch: false }
  );

  // Toast notifications
  $uploadSuccessToast = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileImageAction.uploadProfileImageSuccess),
        tap(() =>
          this.globalLoadingFacade.globalSuccessShow('Profile photo updated successfully', 3000)
        )
      ),
    { dispatch: false }
  );

  $uploadFailToast = createEffect(
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

  $deleteSuccessToast = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileImageAction.deleteProfileImageSuccess),
        tap(() =>
          this.globalLoadingFacade.globalSuccessShow('Profile photo removed', 3000)
        )
      ),
    { dispatch: false }
  );

  $deleteFailToast = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileImageAction.deleteProfileImageFail),
        tap(({ error }) =>
          this.globalLoadingFacade.globalErrorShow(
            error || 'Failed to remove photo. Please try again.',
            3000
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private globalLoadingFacade: GlobalLoadingFacade
  ) {}
}
