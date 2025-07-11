import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as SharedActions from './shared.actions';
import * as SharedSelector from './shared.selector';

@Injectable()
export class SharedFacade {
  selectGenderList$ = this.store.pipe(select(SharedSelector.selectGenderList));

  selectTermList$ = this.store.pipe(select(SharedSelector.selectTermList));

  selectReligionList$ = this.store.pipe(
    select(SharedSelector.selectReligionList)
  );

  selectCountryList$ = this.store.pipe(
    select(SharedSelector.selectCountryList)
  );

  selectStateList$ = this.store.pipe(select(SharedSelector.selectStateList));

  selectLgaList$ = this.store.pipe(select(SharedSelector.selectLgaList));

  selectedLoading$ = this.store.pipe(select(SharedSelector.selectLoading));

  selectedError$ = this.store.pipe(select(SharedSelector.selectError));

  constructor(private readonly store: Store) {}

  getGenderList() {
    this.store.dispatch(SharedActions.getGenderList());
  }

  getTermList() {
    this.store.dispatch(SharedActions.getTermList());
  }

  getReligionList() {
    this.store.dispatch(SharedActions.getReligionList());
  }

  getCountryList() {
    this.store.dispatch(SharedActions.getCountryList());
  }

  getStateList(countryId: string) {
    console.log(countryId);
    this.store.dispatch(SharedActions.getStateList({ countryId }));
  }

  getLgaList(stateId: string) {
    this.store.dispatch(SharedActions.getLgaList({ stateId }));
  }
}
