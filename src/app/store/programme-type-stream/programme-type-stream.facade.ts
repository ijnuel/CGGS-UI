import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProgrammeTypeStreamListInterface, ProgrammeTypeStreamFormInterface, QueryInterface, PageQueryInterface, PaginatedResponseInterface } from '../../types';
import * as ProgrammeTypeStreamAction from './programme-type-stream.actions';
import {
  selectProgrammeTypeStreamAll,
  selectProgrammeTypeStreamList,
  selectProgrammeTypeStreamById,
  selectProgrammeTypeStreamLoading,
  selectProgrammeTypeStreamError,
  selectProgrammeTypeStreamCreateSuccess,
  selectProgrammeTypeStreamUpdateSuccess,
  selectProgrammeTypeStreamDeleteSuccess,
  ProgrammeTypeStreamState,
} from './programme-type-stream.reducer';

@Injectable({ providedIn: 'root' })
export class ProgrammeTypeStreamFacade {
  programmeTypeStreamAll$: Observable<ProgrammeTypeStreamListInterface[] | null>;
  programmeTypeStreamList$: Observable<PaginatedResponseInterface<ProgrammeTypeStreamListInterface[]> | null>;
  programmeTypeStreamById$: Observable<ProgrammeTypeStreamListInterface | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;

  constructor(private store: Store<{ programmeTypeStream: ProgrammeTypeStreamState }>) {
    this.programmeTypeStreamAll$ = this.store.select(selectProgrammeTypeStreamAll);
    this.programmeTypeStreamList$ = this.store.select(selectProgrammeTypeStreamList);
    this.programmeTypeStreamById$ = this.store.select(selectProgrammeTypeStreamById);
    this.loading$ = this.store.select(selectProgrammeTypeStreamLoading);
    this.error$ = this.store.select(selectProgrammeTypeStreamError);
    this.createSuccess$ = this.store.select(selectProgrammeTypeStreamCreateSuccess);
    this.updateSuccess$ = this.store.select(selectProgrammeTypeStreamUpdateSuccess);
    this.deleteSuccess$ = this.store.select(selectProgrammeTypeStreamDeleteSuccess);
  }

  getProgrammeTypeStreamAll(query?: QueryInterface): void {
    this.store.dispatch(ProgrammeTypeStreamAction.getProgrammeTypeStreamAll({ query }));
  }

  getProgrammeTypeStreamList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(ProgrammeTypeStreamAction.getProgrammeTypeStreamList({ pageQuery }));
  }

  getProgrammeTypeStreamById(id: string): void {
    this.store.dispatch(ProgrammeTypeStreamAction.getProgrammeTypeStreamById({ id }));
  }

  createProgrammeTypeStream(payload: ProgrammeTypeStreamFormInterface): void {
    this.store.dispatch(ProgrammeTypeStreamAction.createProgrammeTypeStream({ payload }));
  }

  updateProgrammeTypeStream(payload: ProgrammeTypeStreamFormInterface): void {
    this.store.dispatch(ProgrammeTypeStreamAction.updateProgrammeTypeStream({ payload }));
  }

  deleteProgrammeTypeStream(id: string): void {
    this.store.dispatch(ProgrammeTypeStreamAction.deleteProgrammeTypeStream({ id }));
  }
}
