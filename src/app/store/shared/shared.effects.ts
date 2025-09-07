import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as SharedAction from './shared.actions';
import { environment } from '../../../environments/environment';
import { GenericResponseInterface, DropdownListInterface } from '../../types';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharedEffect {
  $genderList = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getGenderList),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/Enums/GetGender`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => SharedAction.getGenderListSuccess({ payload })),
            catchError((error) => {
              return of(SharedAction.getGenderListFail({ error }));
            })
          )
      )
    )
  );

  $termList = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getTermList),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/Enums/GetTerm`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => SharedAction.getTermListSuccess({ payload })),
            catchError((error) => {
              return of(SharedAction.getTermListFail({ error }));
            })
          )
      )
    )
  );

  $religionList = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getReligionList),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/Enums/GetReligion`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => SharedAction.getReligionListSuccess({ payload })),
            catchError((error) => {
              return of(SharedAction.getReligionListFail({ error }));
            })
          )
      )
    )
  );

  $countryList = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getCountryList),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/Country/GetAll`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => {
              let modifiedPayload = { ...payload };
              modifiedPayload.entity = payload.entity.map((item) => {
                return {
                  ...item,
                  value: item.value,
                };
              });
              return SharedAction.getCountryListSuccess({
                payload: modifiedPayload,
              });
            }),
            catchError((error) => {
              return of(SharedAction.getCountryListFail({ error }));
            })
          )
      )
    )
  );

  $stateListByCountry = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getStateList),
      switchMap(({ countryId }) =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/State/GetByCountryId?countryId=${countryId}`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => {
              let modifiedPayload = { ...payload };
              modifiedPayload.entity = payload.entity.map((item) => {
                return {
                  ...item,
                  value: item.value,
                };
              });

              return SharedAction.getStateListSuccess({
                payload: modifiedPayload,
              });
            }),
            catchError((error) => {
              return of(SharedAction.getStateListFail({ error }));
            })
          )
      )
    )
  );

  $lgaListByState = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getLgaList),
      switchMap(({ stateId }) =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/LocalGovernmentArea/GetByStateId?stateId=${stateId}`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => {
              let modifiedPayload = { ...payload };
              modifiedPayload.entity = payload.entity.map((item) => {
                return {
                  ...item,
                  value: item.value,
                };
              });

              return SharedAction.getLgaListSuccess({
                payload: modifiedPayload,
              });
            }),
            catchError((error) => {
              return of(SharedAction.getLgaListFail({ error }));
            })
          )
      )
    )
  );

  $userTypeList = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getUserTypeList),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/Enums/GetUserType`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => SharedAction.getUserTypeListSuccess({ payload })),
            catchError((error) => {
              return of(SharedAction.getUserTypeListFail({ error }));
            })
          )
      )
    )
  );

  $subjectTypeList = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getSubjectTypeList),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/Enums/GetSubjectType`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => SharedAction.getSubjectTypeListSuccess({ payload })),
            catchError((error) => {
              return of(SharedAction.getSubjectTypeListFail({ error }));
            })
          )
      )
    )
  );

  $skillGradeList = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedAction.getSkillGradeList),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<DropdownListInterface[]>>(
            `${environment.baseUrl}/Enums/GetSkillGrade`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((payload) => SharedAction.getSkillGradeListSuccess({ payload })),
            catchError((error) => {
              return of(SharedAction.getSkillGradeListFail({ error }));
            })
          )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
