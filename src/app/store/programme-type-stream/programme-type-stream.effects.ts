import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ProgrammeTypeStreamAction from './programme-type-stream.actions';
import { environment } from '../../../environments/environment';
import { ProgrammeTypeStreamListInterface, GenericResponseInterface, PaginatedResponseInterface } from '../../types';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProgrammeTypeStreamEffect {
  private readonly url = `${environment.baseUrl}/ProgrammeTypeStream`;

  $programmeTypeStreamAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeTypeStreamAction.getProgrammeTypeStreamAll),
      switchMap(({ query }) =>
        this.http.post<GenericResponseInterface<ProgrammeTypeStreamListInterface[]>>(
          `${this.url}/GetAll`, query ?? {}, { withCredentials: true }
        ).pipe(
          map((payload) => ProgrammeTypeStreamAction.getProgrammeTypeStreamAllSuccess({ payload })),
          catchError((error) => of(ProgrammeTypeStreamAction.getProgrammeTypeStreamAllFail({ error })))
        )
      )
    )
  );

  $programmeTypeStreamList = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeTypeStreamAction.getProgrammeTypeStreamList),
      switchMap(({ pageQuery }) =>
        this.http.post<GenericResponseInterface<PaginatedResponseInterface<ProgrammeTypeStreamListInterface[]>>>(
          `${this.url}/GetAllPaginated`, pageQuery, { withCredentials: true }
        ).pipe(
          map((payload) => ProgrammeTypeStreamAction.getProgrammeTypeStreamListSuccess({ payload })),
          catchError((error) => of(ProgrammeTypeStreamAction.getProgrammeTypeStreamListFail({ error })))
        )
      )
    )
  );

  $programmeTypeStreamById = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeTypeStreamAction.getProgrammeTypeStreamById),
      switchMap(({ id }) =>
        this.http.get<GenericResponseInterface<ProgrammeTypeStreamListInterface>>(
          `${this.url}/GetById`, { params: { id }, withCredentials: true }
        ).pipe(
          map((payload) => ProgrammeTypeStreamAction.getProgrammeTypeStreamByIdSuccess({ payload })),
          catchError((error) => of(ProgrammeTypeStreamAction.getProgrammeTypeStreamByIdFail({ error })))
        )
      )
    )
  );

  $createProgrammeTypeStream = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeTypeStreamAction.createProgrammeTypeStream),
      switchMap(({ payload }) =>
        this.http.post<GenericResponseInterface<string>>(
          `${this.url}/Create`, payload, { withCredentials: true }
        ).pipe(
          map((payload) => ProgrammeTypeStreamAction.createProgrammeTypeStreamSuccess({ payload })),
          catchError((error) => of(ProgrammeTypeStreamAction.createProgrammeTypeStreamFail({ error })))
        )
      )
    )
  );

  $updateProgrammeTypeStream = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeTypeStreamAction.updateProgrammeTypeStream),
      switchMap(({ payload }) =>
        this.http.put<GenericResponseInterface<string>>(
          `${this.url}/Update`, payload, { withCredentials: true }
        ).pipe(
          map((payload) => ProgrammeTypeStreamAction.updateProgrammeTypeStreamSuccess({ payload })),
          catchError((error) => of(ProgrammeTypeStreamAction.updateProgrammeTypeStreamFail({ error })))
        )
      )
    )
  );

  $deleteProgrammeTypeStream = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgrammeTypeStreamAction.deleteProgrammeTypeStream),
      switchMap(({ id }) =>
        this.http.delete<GenericResponseInterface<string>>(
          `${this.url}/Delete`, { params: { id }, withCredentials: true }
        ).pipe(
          map((payload) => ProgrammeTypeStreamAction.deleteProgrammeTypeStreamSuccess({ payload })),
          catchError((error) => of(ProgrammeTypeStreamAction.deleteProgrammeTypeStreamFail({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
