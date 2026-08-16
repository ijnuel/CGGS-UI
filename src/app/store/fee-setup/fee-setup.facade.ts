import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeeSetupListInterface, FeeSetupFormInterface, FeeTypeListInterface } from '../../types/fee';
import { ClassListInterface, PageQueryInterface, PaginatedResponseInterface, QueryInterface, SchoolTermSessionListInterface, ProgrammeTypeStreamListInterface } from '../../types';
import * as FeeSetupAction from './fee-setup.actions';
import {
  selectFeeSetupAll,
  selectFeeSetupList,
  selectFeeSetupById,
  selectFeeSetupLoading,
  selectFeeSetupError,
  selectFeeSetupCreateSuccess,
  selectFeeSetupUpdateSuccess,
  selectFeeSetupDeleteSuccess,
} from './fee-setup.selector';
import { FeeSetupState } from './fee-setup.reducer';
import { FeeTypeFacade } from '../fee-type/fee-type.facade';
import { ClassFacade } from '../class/class.facade';
import { SchoolTermSessionFacade } from '../school-term-session/school-term-session.facade';
import { ProgrammeTypeStreamFacade } from '../programme-type-stream/programme-type-stream.facade';

@Injectable({ providedIn: 'root' })
export class FeeSetupFacade {
  feeSetupAll$: Observable<FeeSetupListInterface[] | null>;
  feeSetupList$: Observable<PaginatedResponseInterface<FeeSetupListInterface[]> | null>;
  feeSetupById$: Observable<FeeSetupListInterface | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;

  constructor(
    private store: Store<{ feeSetup: FeeSetupState }>,
    private feeTypeFacade: FeeTypeFacade,
    private classFacade: ClassFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private programmeTypeStreamFacade: ProgrammeTypeStreamFacade,
  ) {
    const hydrate = (
      row: FeeSetupListInterface,
      feeTypeMap: Map<string, FeeTypeListInterface>,
      classMap: Map<string, ClassListInterface>,
      stsMap: Map<string, SchoolTermSessionListInterface>,
      streamMap: Map<string, ProgrammeTypeStreamListInterface>,
    ): FeeSetupListInterface => ({
      ...row,
      feeType: row.feeType ?? (row.feeTypeId ? feeTypeMap.get(row.feeTypeId) : undefined),
      class: row.class ?? (row.classId ? classMap.get(row.classId) : undefined),
      schoolTermSession: row.schoolTermSession ?? (row.schoolTermSessionId ? stsMap.get(row.schoolTermSessionId) : undefined),
      stream: row.stream ?? (row.streamId ? streamMap.get(row.streamId) : undefined),
    });

    const feeTypeMap$ = this.feeTypeFacade.feeTypeAll$.pipe(
      map(types => new Map<string, FeeTypeListInterface>((types ?? []).map(t => [t.id, t])))
    );
    const classMap$ = this.classFacade.classAll$.pipe(
      map(classes => new Map<string, ClassListInterface>((classes ?? []).map(c => [c.id, c])))
    );
    const stsMap$ = this.schoolTermSessionFacade.schoolTermSessionAll$.pipe(
      map(sessions => new Map<string, SchoolTermSessionListInterface>((sessions ?? []).map(s => [s.id, s])))
    );
    const streamMap$ = this.programmeTypeStreamFacade.programmeTypeStreamAll$.pipe(
      map(streams => new Map<string, ProgrammeTypeStreamListInterface>((streams ?? []).map(s => [s.id, s])))
    );

    this.feeSetupList$ = combineLatest([
      this.store.select(selectFeeSetupList),
      feeTypeMap$, classMap$, stsMap$, streamMap$,
    ]).pipe(
      map(([list, feeTypeMap, classMap, stsMap, streamMap]) => {
        if (!list) return list;
        return { ...list, data: list.data.map(r => hydrate(r, feeTypeMap, classMap, stsMap, streamMap)) };
      })
    );

    this.feeSetupAll$ = combineLatest([
      this.store.select(selectFeeSetupAll),
      feeTypeMap$, classMap$, stsMap$, streamMap$,
    ]).pipe(
      map(([rows, feeTypeMap, classMap, stsMap, streamMap]) =>
        rows ? rows.map(r => hydrate(r, feeTypeMap, classMap, stsMap, streamMap)) : rows
      )
    );

    this.feeSetupById$ = combineLatest([
      this.store.select(selectFeeSetupById),
      feeTypeMap$, classMap$, stsMap$, streamMap$,
    ]).pipe(
      map(([row, feeTypeMap, classMap, stsMap, streamMap]) =>
        row ? hydrate(row, feeTypeMap, classMap, stsMap, streamMap) : row
      )
    );

    this.loading$ = this.store.select(selectFeeSetupLoading);
    this.error$ = this.store.select(selectFeeSetupError);
    this.createSuccess$ = this.store.select(selectFeeSetupCreateSuccess);
    this.updateSuccess$ = this.store.select(selectFeeSetupUpdateSuccess);
    this.deleteSuccess$ = this.store.select(selectFeeSetupDeleteSuccess);

    this.feeTypeFacade.getFeeTypeAll();
    this.classFacade.getClassAll({ nestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }] });
    this.schoolTermSessionFacade.getSchoolTermSessionAll();
    this.programmeTypeStreamFacade.getProgrammeTypeStreamAll();
  }

  getFeeSetupAll(query?: QueryInterface): void {
    this.store.dispatch(FeeSetupAction.getFeeSetupAll({ query }));
  }

  getFeeSetupList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(FeeSetupAction.getFeeSetupList({ pageQuery }));
  }

  getFeeSetupById(id: string): void {
    this.store.dispatch(FeeSetupAction.getFeeSetupById({ id }));
  }

  createFeeSetup(payload: FeeSetupFormInterface): void {
    this.store.dispatch(FeeSetupAction.createFeeSetup({ payload }));
  }

  updateFeeSetup(payload: FeeSetupFormInterface): void {
    this.store.dispatch(FeeSetupAction.updateFeeSetup({ payload }));
  }

  deleteFeeSetup(id: string): void {
    this.store.dispatch(FeeSetupAction.deleteFeeSetup({ id }));
  }

  invalidateCache(): void {
    this.store.dispatch(FeeSetupAction.invalidateCache());
  }
}
