import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CountryListInterface,
  CountryFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as CountryAction from './country.actions';
import {
  selectCountryList,
  selectCountryAll,
  selectCountryByProperties,
  selectCountryById,
  selectExists,
  selectCount,
  selectCountryLoading,
  selectCountryError,
  selectCountryCreateSuccess,
  selectCountryUpdateSuccess,
} from './country.selector';
import { CountryState } from './country.reducer';

@Injectable({
  providedIn: 'root',
})
export class CountryFacade {
  countryList$: Observable<PaginatedResponseInterface<CountryListInterface[]> | null>;
  countryAll$: Observable<CountryListInterface[] | null>;
  countryByProperties$: Observable<CountryListInterface[] | null>;
  countryById$: Observable<CountryListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ country: CountryState }>) {
    this.countryList$ = this.store.select(selectCountryList);
    this.countryAll$ = this.store.select(selectCountryAll);
    this.countryByProperties$ = this.store.select(selectCountryByProperties);
    this.countryById$ = this.store.select(selectCountryById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectCountryLoading);
    this.error$ = this.store.select(selectCountryError);
    this.createSuccess$ = this.store.select(selectCountryCreateSuccess);
    this.updateSuccess$ = this.store.select(selectCountryUpdateSuccess);
  }

  getCountryList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(CountryAction.getCountryList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getCountryAll(): void {
    this.store.dispatch(CountryAction.getCountryAll());
  }

  getCountryById(countryId: string): void {
    this.store.dispatch(CountryAction.getCountryById({ countryId }));
  }

  getCountryByProperties(properties: Partial<CountryFormInterface>): void {
    this.store.dispatch(CountryAction.getCountryByProperties({ properties }));
  }

  countryExists(properties: Partial<CountryFormInterface>): void {
    this.store.dispatch(CountryAction.countryExists({ properties }));
  }

  countryCount(): void {
    this.store.dispatch(CountryAction.countryCount());
  }

  createCountry(country: CountryFormInterface): void {
    this.store.dispatch(CountryAction.createCountry({ payload: country }));
  }

  updateCountry(country: CountryFormInterface): void {
    this.store.dispatch(CountryAction.updateCountry({ payload: country }));
  }

  deleteCountry(countryId: string): void {
    this.store.dispatch(CountryAction.deleteCountry({ countryId }));
  }

  createManyCountrys(countrys: CountryFormInterface[]): void {
    this.store.dispatch(CountryAction.createManyCountrys({ payload: countrys }));
  }

  updateManyCountrys(countrys: CountryFormInterface[]): void {
    this.store.dispatch(CountryAction.updateManyCountrys({ payload: countrys }));
  }

  deleteManyCountrys(countryIds: string[]): void {
    this.store.dispatch(CountryAction.deleteManyCountrys({ countryIds }));
  }
}
