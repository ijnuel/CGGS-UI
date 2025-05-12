import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { CountryFacade } from '../../../store/country/country.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  CountryListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
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
  
  onPageChange(event: PageEvent) {
    this.pageQuery = {
      start: event.pageSize * event.pageIndex,
      recordsPerPage: event.pageSize,
      pageIndex: event.pageIndex
    }
    this.countryFacade.getCountryList(this.pageQuery);
  }
}
