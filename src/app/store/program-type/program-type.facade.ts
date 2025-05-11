import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ProgramTypeActions from './program-type.actions';
import * as ProgramTypeSelector from './program-type.selector';
import { PageQueryInterface, ProgramTypeFormInterface } from '../../types';

@Injectable()
export class ProgramTypeFacade {
  selectProgramTypeList$ = this.store.pipe(
    select(ProgramTypeSelector.selectProgramTypeList)
  );

  selectProgramTypeById$ = this.store.pipe(
    select(ProgramTypeSelector.selectProgramTypeById)
  );

  selectedLoading$ = this.store.pipe(select(ProgramTypeSelector.selectLoading));

  selectedError$ = this.store.pipe(select(ProgramTypeSelector.selectError));

  constructor(private readonly store: Store) {}

  getProgramTypeList(pageQuery: PageQueryInterface) {
    this.store.dispatch(ProgramTypeActions.getProgramTypeList({ pageQuery }));
  }

  getProgramTypeById(programTypeId: string) {
    this.store.dispatch(ProgramTypeActions.getProgramTypeById({ programTypeId }));
  }

  createProgramType(payload: ProgramTypeFormInterface) {
    this.store.dispatch(ProgramTypeActions.createProgramType({ payload }));
  }

  updateProgramType(payload: ProgramTypeFormInterface) {
    this.store.dispatch(ProgramTypeActions.editProgramType({ payload }));
  }
}
