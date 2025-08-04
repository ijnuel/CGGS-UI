import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ProgramTypeListInterface,
  ProgramTypeFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as ProgramTypeAction from './program-type.actions';
import {
  selectProgramTypeList,
  selectProgramTypeAll,
  selectProgramTypeByProperties,
  selectProgramTypeById,
  selectExists,
  selectCount,
  selectProgramTypeLoading,
  selectProgramTypeError,
  selectProgramTypeCreateSuccess,
  selectProgramTypeUpdateSuccess,
  selectProgramTypeDataImportTemplate,
  selectProgramTypePageQuery,
} from './program-type.selector';
import { ProgramTypeState } from './program-type.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProgramTypeFacade {
  programTypeList$: Observable<PaginatedResponseInterface<ProgramTypeListInterface[]> | null>;
  programTypeAll$: Observable<ProgramTypeListInterface[] | null>;
  programTypeByProperties$: Observable<ProgramTypeListInterface | null>;
  programTypeById$: Observable<ProgramTypeListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  dataImportTemplate$: Observable<any | null>;
  pageQuery$: Observable<any | null>;

  constructor(private store: Store<{ programType: ProgramTypeState }>) {
    this.programTypeList$ = this.store.select(selectProgramTypeList);
    this.programTypeAll$ = this.store.select(selectProgramTypeAll);
    this.programTypeByProperties$ = this.store.select(selectProgramTypeByProperties);
    this.programTypeById$ = this.store.select(selectProgramTypeById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectProgramTypeLoading);
    this.error$ = this.store.select(selectProgramTypeError);
    this.createSuccess$ = this.store.select(selectProgramTypeCreateSuccess);
    this.updateSuccess$ = this.store.select(selectProgramTypeUpdateSuccess);
    this.dataImportTemplate$ = this.store.select(selectProgramTypeDataImportTemplate);
    this.pageQuery$ = this.store.select(selectProgramTypePageQuery);
  }

  getProgramTypeList(params: {
    start?: number;
    recordsPerPage?: number;
    searchText?: string;
    queryProperties?: string;
  }): void {
    this.store.dispatch(ProgramTypeAction.getProgramTypeList(params));
  }

  getProgramTypeAll(queryProperties?: string): void {
    this.store.dispatch(ProgramTypeAction.getProgramTypeAll({ queryProperties }));
  }

  getProgramTypeById(programTypeId: string): void {
    this.store.dispatch(ProgramTypeAction.getProgramTypeById({ programTypeId }));
  }

  getProgramTypeByProperties(queryPropertiesString: string): void {
    this.store.dispatch(ProgramTypeAction.getProgramTypeByProperties({ queryPropertiesString }));
  }

  programTypeExists(id: string): void {
    this.store.dispatch(ProgramTypeAction.programTypeExists({ id }));
  }

  programTypeCount(): void {
    this.store.dispatch(ProgramTypeAction.programTypeCount());
  }

  createProgramType(programType: ProgramTypeFormInterface): void {
    this.store.dispatch(ProgramTypeAction.createProgramType({ payload: programType }));
  }

  updateProgramType(programType: ProgramTypeFormInterface): void {
    this.store.dispatch(ProgramTypeAction.updateProgramType({ payload: programType }));
  }

  deleteProgramType(id: string): void {
    this.store.dispatch(ProgramTypeAction.deleteProgramType({ id }));
  }

  createManyProgramTypes(programTypes: ProgramTypeFormInterface[]): void {
    this.store.dispatch(ProgramTypeAction.createManyProgramTypes({ payload: programTypes }));
  }

  updateManyProgramTypes(programTypes: ProgramTypeFormInterface[]): void {
    this.store.dispatch(ProgramTypeAction.updateManyProgramTypes({ payload: programTypes }));
  }

  deleteManyProgramTypes(ids: string[]): void {
    this.store.dispatch(ProgramTypeAction.deleteManyProgramTypes({ ids }));
  }

  getProgramTypeDataImportTemplate(): void {
    this.store.dispatch(ProgramTypeAction.getProgramTypeDataImportTemplate());
  }
}
