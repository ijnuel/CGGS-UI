import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ProgrammeGradeRemarkAction from './programme-grade-remark.actions';
import { environment } from '../../../environments/environment';
import {
  ProgrammeGradeRemarkListInterface,
  PaginatedResponseInterface,
  GenericResponseInterface,
  ProgrammeGradeRemarkFormInterface,
} from '../../types';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../global-loading/global-loading.facade';

@Injectable()
export class ProgrammeGradeRemarkEffect {
  // Get All (non-paginated)
  $programmeGradeRemarkAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkAll),
      switchMap(() =>
        this.http
          .post<GenericResponseInterface<ProgrammeGradeRemarkListInterface[]>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/GetAll`,
            {},
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.getProgrammeGradeRemarkAllSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkAllFail({ error }));
            })
          )
      )
    )
  );

  // Get All Paginated
  $programmeGradeRemarkList = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkList),
      switchMap(({ pageQuery }) => {
        

        return this.http
          .post<GenericResponseInterface<PaginatedResponseInterface<ProgrammeGradeRemarkListInterface[]>>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/GetAllPaginated`,
            pageQuery,
            { withCredentials: true }
          )
          .pipe(
            map((response) => {
              const paginatedResponse: PaginatedResponseInterface<ProgrammeGradeRemarkListInterface[]> = {
                currentPage: response.entity.currentPage,
                recordPerPage: response.entity.recordPerPage,
                totalPages: response.entity.totalPages,
                totalCount: response.entity.totalCount,
                data: response.entity.data
              };
              return ProgrammeGradeRemarkAction.getProgrammeGradeRemarkListSuccess({ 
                payload: { 
                  entity: paginatedResponse,
                  error: response.error,
                  exceptionError: response.exceptionError,
                  message: response.message,
                  messages: response.messages,
                  succeeded: response.succeeded
                } 
              });
            }),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkListFail({ error }));
            })
          );
      })
    )
  );

  // Get By Id
  $programmeGradeRemarkById = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkById),
      switchMap(({ programmeGradeRemarkId }) =>
        this.http
          .get<GenericResponseInterface<ProgrammeGradeRemarkListInterface>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/GetById`,
            {
              params: { id: programmeGradeRemarkId },
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByIdSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByIdFail({ error }));
            })
          )
      )
    )
  );

  // Get By Properties
  $programmeGradeRemarkByProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByProperties),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<ProgrammeGradeRemarkListInterface[]>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/GetByProperties`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByPropertiesSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByPropertiesFail({ error }));
            })
          )
      )
    )
  );

  // Exists
  $programmeGradeRemarkExists = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.programmeGradeRemarkExists),
      switchMap(({ properties }) =>
        this.http
          .post<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/Exists`,
            properties,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.programmeGradeRemarkExistsSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.programmeGradeRemarkExistsFail({ error }));
            })
          )
      )
    )
  );

  // Count
  $programmeGradeRemarkCount = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.programmeGradeRemarkCount),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<number>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/Count`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.programmeGradeRemarkCountSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.programmeGradeRemarkCountFail({ error }));
            })
          )
      )
    )
  );

  // Create
  $createProgrammeGradeRemark = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.createProgrammeGradeRemark),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ProgrammeGradeRemarkListInterface>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/Create`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.createProgrammeGradeRemarkSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.createProgrammeGradeRemarkFail({ error }));
            })
          )
      )
    )
  );

  // Update
  $updateProgrammeGradeRemark = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.updateProgrammeGradeRemark),
      switchMap(({ payload }) =>
        this.http
          .put<GenericResponseInterface<ProgrammeGradeRemarkListInterface>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/Update`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.updateProgrammeGradeRemarkSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.updateProgrammeGradeRemarkFail({ error }));
            })
          )
      )
    )
  );

  // Delete
  $deleteProgrammeGradeRemark = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.deleteProgrammeGradeRemark),
      switchMap(({ programmeGradeRemarkId }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/Delete`,
            {
              params: { id: programmeGradeRemarkId },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.deleteProgrammeGradeRemarkSuccess({
                payload,
                programmeGradeRemarkId,
              })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.deleteProgrammeGradeRemarkFail({ error }));
            })
          )
      )
    )
  );

  // Create Many
  $createManyProgrammeGradeRemarks = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarks),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ProgrammeGradeRemarkListInterface[]>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/CreateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarksSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarksFail({ error }));
            })
          )
      )
    )
  );

  // Update Many
  $updateManyProgrammeGradeRemarks = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarks),
      switchMap(({ payload }) =>
        this.http
          .post<GenericResponseInterface<ProgrammeGradeRemarkListInterface[]>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/UpdateMany`,
            payload,
            { withCredentials: true }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarksSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarksFail({ error }));
            })
          )
      )
    )
  );

  // Delete Many
  $deleteManyProgrammeGradeRemarks = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarks),
      switchMap(({ programmeGradeRemarkIds }) =>
        this.http
          .delete<GenericResponseInterface<boolean>>(
            `${environment.baseUrl}/ProgrammeGradeRemark/DeleteMany`,
            {
              params: { ids: programmeGradeRemarkIds },
              withCredentials: true
            }
          )
          .pipe(
            map((payload) =>
              ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarksSuccess({ payload })
            ),
            catchError((error) => {
              return of(ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarksFail({ error }));
            })
          )
      )
    )
  );

  // Loading Effects
  $programmeGradeRemarkLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProgrammeGradeRemarkAction.createProgrammeGradeRemark,
          ProgrammeGradeRemarkAction.updateProgrammeGradeRemark,
          ProgrammeGradeRemarkAction.deleteProgrammeGradeRemark,
          ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarks,
          ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarks,
          ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarks
        ),
        tap((action) => {
          this.errorLoadingFacade.globalLoadingShow(action.type);
        })
      ),
    { dispatch: false }
  );

  $programmeGradeRemarkLoadingHide = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProgrammeGradeRemarkAction.createProgrammeGradeRemarkSuccess,
          ProgrammeGradeRemarkAction.createProgrammeGradeRemarkFail,
          ProgrammeGradeRemarkAction.updateProgrammeGradeRemarkSuccess,
          ProgrammeGradeRemarkAction.updateProgrammeGradeRemarkFail,
          ProgrammeGradeRemarkAction.deleteProgrammeGradeRemarkSuccess,
          ProgrammeGradeRemarkAction.deleteProgrammeGradeRemarkFail,
          ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarksSuccess,
          ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarksFail,
          ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarksSuccess,
          ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarksFail,
          ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarksSuccess,
          ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarksFail
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
