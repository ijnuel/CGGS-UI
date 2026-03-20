import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ImportEntityInterface } from '../../types';
import * as DataImportAction from './data-import.actions';
import {
  selectImportEntities,
  selectDataImportLoading,
  selectIsDownloading,
  selectIsImporting,
  selectImportSuccess,
  selectDataImportError,
} from './data-import.selector';
import { DataImportState } from './data-import.reducer';

@Injectable({
  providedIn: 'root',
})
export class DataImportFacade {
  importEntities$: Observable<ImportEntityInterface[] | null>;
  loading$: Observable<boolean>;
  isDownloading$: Observable<boolean>;
  isImporting$: Observable<boolean>;
  importSuccess$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ dataImport: DataImportState }>) {
    this.importEntities$ = this.store.select(selectImportEntities);
    this.loading$ = this.store.select(selectDataImportLoading);
    this.isDownloading$ = this.store.select(selectIsDownloading);
    this.isImporting$ = this.store.select(selectIsImporting);
    this.importSuccess$ = this.store.select(selectImportSuccess);
    this.error$ = this.store.select(selectDataImportError);
  }

  getImportEntities(): void {
    this.store.dispatch(DataImportAction.getImportEntities());
  }

  downloadImportTemplate(entity: ImportEntityInterface): void {
    this.store.dispatch(DataImportAction.downloadImportTemplate({ entity }));
  }

  importData(entityValue: string, entityDescription: string, file: File): void {
    this.store.dispatch(DataImportAction.importData({ entityValue, entityDescription, file }));
  }
}
