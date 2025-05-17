import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as FamilyAction from './family.actions';
import { environment } from '../../../environments/environment';
import {
  FamilyListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class FamilyEffect {
  $familyList = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.getFamilyList),
      switchMap(({ pageQuery }) =>
        this.http
          .get<
            GenericResponseInterface<
              PaginatedResponseInterface<FamilyListInterface[]>
            >
          >(`${environment.baseUrl}/Family/GetAllPaginated`, {
            params: { ...pageQuery },
            withCredentials: true,
          })
          .pipe(
            map((payload) =>
              FamilyAction.getFamilyListSuccess({ payload })
            ),
            catchError((error) => {
              return of(FamilyAction.getFamilyListFail({ error }));
            })
          )
      )
    )
  );

  $familyById = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.getFamilyById),
      switchMap(({ familyId }) =>
        this.http
          .get<GenericResponseInterface<FamilyListInterface>>(
            `${environment.baseUrl}/Family/GetById`,
            {
              params: { familyId },
              // withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              FamilyAction.getFamilyByIdSuccess({
                payload,
              })
            ),
            catchError((error) => {
              return of(FamilyAction.getFamilyByIdFail({ error }));
            })
          )
      )
    )
  );

  $createFamily = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.createFamily),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<FamilyListInterface>>(
            `${environment.baseUrl}/Family/Create`,
            {
              ...payload,
              withCredentials: true,
            },
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.createFamilySuccess({
                message: 'Family created successfully',
                family: payload.entity,
              })
            ),
            catchError((error) => {
              return of(FamilyAction.createFamilyFail({ error }));
            })
          )
      )
    )
  );

  $updateFamily = createEffect(() =>
    this.actions$.pipe(
      ofType(FamilyAction.editFamily),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<FamilyListInterface>>(
            `${environment.baseUrl}/Family/Update`,
            {
              ...payload,
            }
            // { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              FamilyAction.editFamilySuccess({
                message: 'Family updated successfully',
                family: payload.entity,
              })
            ),
            catchError((error) => {
              return of(FamilyAction.editFamilyFail({ error }));
            })
          )
      )
    )
  );

  $familyLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FamilyAction.createFamily, FamilyAction.editFamily),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $familyLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          FamilyAction.createFamilySuccess,
          FamilyAction.createFamilyFail,
          FamilyAction.editFamilySuccess,
          FamilyAction.editFamilyFail
        ),
        tap(() => {
          this.errorLoadingFacade.globalLoadingHide();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private errorLoadingFacade: GlobalLoadingFacade
  ) {}
}
