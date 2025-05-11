import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { CountryFacade } from '../../../store/country/country.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  CountryListInterface,
} from '../../../types';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 15,
  };
  countryList$: Observable<PaginatedResponseInterface<
    CountryListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private countryFacade: CountryFacade) {
    this.countryList$ = this.countryFacade.selectCountryList$;
    this.loading$ = this.countryFacade.selectedLoading$;
  }

  ngOnInit() {
    this.countryFacade.getCountryList(this.pageQuery);
  }
}
