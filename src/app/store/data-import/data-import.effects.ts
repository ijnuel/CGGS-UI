import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as DataImportAction from './data-import.actions';
import { environment } from '../../../environments/environment';
import { GenericResponseInterface, ImportEntityInterface } from '../../types';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataImportEffect {
  private get serverRoot(): string {
    return environment.baseUrl.replace(/\/api$/, '');
  }

  // Get Import Entities
  $getImportEntities = createEffect(() =>
    this.actions$.pipe(
      ofType(DataImportAction.getImportEntities),
      switchMap(() =>
        this.http
          .get<GenericResponseInterface<ImportEntityInterface[]>>(
            `${environment.baseUrl}/utility/GetImportEntities`,
            { withCredentials: true }
          )
          .pipe(
            map((payload) => DataImportAction.getImportEntitiesSuccess({ payload })),
            catchError((error) =>
              of(DataImportAction.getImportEntitiesFail({ error: error?.message ?? 'Failed to load import entities' }))
            )
          )
      )
    )
  );

  // Download Template
  $downloadImportTemplate = createEffect(() =>
    this.actions$.pipe(
      ofType(DataImportAction.downloadImportTemplate),
      switchMap(({ entity }) => {
        const url = `${this.serverRoot}/${entity.value}`;
        return this.http
          .get(url, { responseType: 'blob', withCredentials: true })
          .pipe(
            map((blob) => {
              const anchor = document.createElement('a');
              anchor.href = URL.createObjectURL(blob);
              anchor.download = `${entity.description}_template.xlsx`;
              anchor.click();
              URL.revokeObjectURL(anchor.href);
              return DataImportAction.downloadImportTemplateSuccess();
            }),
            catchError((error) =>
              of(DataImportAction.downloadImportTemplateFail({ error: error?.message ?? 'Failed to download template' }))
            )
          );
      })
    )
  );

  // Import Data
  $importData = createEffect(() =>
    this.actions$.pipe(
      ofType(DataImportAction.importData),
      switchMap(({ entityValue, file }) => {
        const importPath = entityValue.replace('GetDataImportTemplate', 'ImportData');
        const url = `${this.serverRoot}/${importPath}`;
        const formData = new FormData();
        formData.append('file', file);

        return this.http
          .post<GenericResponseInterface<any>>(url, formData, { withCredentials: true })
          .pipe(
            map((payload) => DataImportAction.importDataSuccess({ payload })),
            catchError((error) =>
              of(DataImportAction.importDataFail({ error: error?.message ?? 'Import failed' }))
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
