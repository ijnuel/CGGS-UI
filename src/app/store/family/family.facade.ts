import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as FamilyActions from './family.actions';
import * as FamilySelector from './family.selector';
import { PageQueryInterface, FamilyFormInterface } from '../../types';

@Injectable()
export class FamilyFacade {
  selectFamilyList$ = this.store.pipe(
    select(FamilySelector.selectFamilyList)
  );

  selectFamilyById$ = this.store.pipe(
    select(FamilySelector.selectFamilyById)
  );

  selectedLoading$ = this.store.pipe(select(FamilySelector.selectLoading));

  selectedError$ = this.store.pipe(select(FamilySelector.selectError));

  constructor(private readonly store: Store) {}

  getFamilyList(pageQuery: PageQueryInterface) {
    this.store.dispatch(FamilyActions.getFamilyList({ pageQuery }));
  }

  getFamilyById(familyId: string) {
    this.store.dispatch(FamilyActions.getFamilyById({ familyId }));
  }

  createFamily(payload: FamilyFormInterface) {
    this.store.dispatch(FamilyActions.createFamily({ payload }));
  }

  updateFamily(payload: FamilyFormInterface) {
    this.store.dispatch(FamilyActions.editFamily({ payload }));
  }
}
