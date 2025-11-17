import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ProgrammeGradeRemarkListInterface,
  ProgrammeGradeRemarkFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as ProgrammeGradeRemarkAction from './programme-grade-remark.actions';
import {
  selectProgrammeGradeRemarkList,
  selectProgrammeGradeRemarkAll,
  selectProgrammeGradeRemarkByProperties,
  selectProgrammeGradeRemarkById,
  selectExists,
  selectCount,
  selectProgrammeGradeRemarkLoading,
  selectProgrammeGradeRemarkError,
  selectProgrammeGradeRemarkCreateSuccess,
  selectProgrammeGradeRemarkUpdateSuccess,
  selectProgrammeGradeRemarkDeleteSuccess,
} from './programme-grade-remark.selector';
import { ProgrammeGradeRemarkState } from './programme-grade-remark.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProgrammeGradeRemarkFacade {
  programmeGradeRemarkList$: Observable<PaginatedResponseInterface<ProgrammeGradeRemarkListInterface[]> | null>;
  programmeGradeRemarkAll$: Observable<ProgrammeGradeRemarkListInterface[] | null>;
  programmeGradeRemarkByProperties$: Observable<ProgrammeGradeRemarkListInterface[] | null>;
  programmeGradeRemarkById$: Observable<ProgrammeGradeRemarkListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ programmeGradeRemark: ProgrammeGradeRemarkState }>) {
    this.programmeGradeRemarkList$ = this.store.select(selectProgrammeGradeRemarkList);
    this.programmeGradeRemarkAll$ = this.store.select(selectProgrammeGradeRemarkAll);
    this.programmeGradeRemarkByProperties$ = this.store.select(selectProgrammeGradeRemarkByProperties);
    this.programmeGradeRemarkById$ = this.store.select(selectProgrammeGradeRemarkById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectProgrammeGradeRemarkLoading);
    this.error$ = this.store.select(selectProgrammeGradeRemarkError);
    this.createSuccess$ = this.store.select(selectProgrammeGradeRemarkCreateSuccess);
    this.updateSuccess$ = this.store.select(selectProgrammeGradeRemarkUpdateSuccess);
    this.deleteSuccess$ = this.store.select(selectProgrammeGradeRemarkDeleteSuccess);
  }

  getProgrammeGradeRemarkList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getProgrammeGradeRemarkAll(): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkAll());
  }

  getProgrammeGradeRemarkById(programmeGradeRemarkId: string): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkById({ programmeGradeRemarkId }));
  }

  getProgrammeGradeRemarkByProperties(properties: Partial<ProgrammeGradeRemarkFormInterface>): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.getProgrammeGradeRemarkByProperties({ properties }));
  }

  programmeGradeRemarkExists(properties: Partial<ProgrammeGradeRemarkFormInterface>): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.programmeGradeRemarkExists({ properties }));
  }

  programmeGradeRemarkCount(): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.programmeGradeRemarkCount());
  }

  createProgrammeGradeRemark(programmeGradeRemark: ProgrammeGradeRemarkFormInterface): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.createProgrammeGradeRemark({ payload: programmeGradeRemark }));
  }

  updateProgrammeGradeRemark(programmeGradeRemark: ProgrammeGradeRemarkFormInterface): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.updateProgrammeGradeRemark({ payload: programmeGradeRemark }));
  }

  deleteProgrammeGradeRemark(programmeGradeRemarkId: string): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.deleteProgrammeGradeRemark({ programmeGradeRemarkId }));
  }

  createManyProgrammeGradeRemarks(programmeGradeRemarks: ProgrammeGradeRemarkFormInterface[]): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.createManyProgrammeGradeRemarks({ payload: programmeGradeRemarks }));
  }

  updateManyProgrammeGradeRemarks(programmeGradeRemarks: ProgrammeGradeRemarkFormInterface[]): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.updateManyProgrammeGradeRemarks({ payload: programmeGradeRemarks }));
  }

  deleteManyProgrammeGradeRemarks(programmeGradeRemarkIds: string[]): void {
    this.store.dispatch(ProgrammeGradeRemarkAction.deleteManyProgrammeGradeRemarks({ programmeGradeRemarkIds }));
  }
}
