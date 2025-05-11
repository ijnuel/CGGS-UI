import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CountryActions from './country.actions';
import * as CountrySelector from './country.selector';
import { PageQueryInterface, CountryFormInterface } from '../../types';

@Injectable()
export class CountryFacade {
  selectCountryList$ = this.store.pipe(
    select(CountrySelector.selectCountryList)
  );

  selectCountryById$ = this.store.pipe(
    select(CountrySelector.selectCountryById)
  );

  selectedLoading$ = this.store.pipe(select(CountrySelector.selectLoading));

  selectedError$ = this.store.pipe(select(CountrySelector.selectError));

  constructor(private readonly store: Store) {}

  getCountryList(pageQuery: PageQueryInterface) {
    this.store.dispatch(CountryActions.getCountryList({ pageQuery }));
  }

  getCountryById(countryId: string) {
    this.store.dispatch(CountryActions.getCountryById({ countryId }));
  }

  createCountry(payload: CountryFormInterface) {
    this.store.dispatch(CountryActions.createCountry({ payload }));
  }

  updateCountry(payload: CountryFormInterface) {
    this.store.dispatch(CountryActions.editCountry({ payload }));
  }
}
