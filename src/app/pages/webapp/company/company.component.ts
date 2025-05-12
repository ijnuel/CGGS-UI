import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { CompanyFacade } from '../../../store/company/company.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  CompanyListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  companyList$: Observable<PaginatedResponseInterface<
    CompanyListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private companyFacade: CompanyFacade) {
    this.companyList$ = this.companyFacade.selectCompanyList$;
    this.loading$ = this.companyFacade.selectedLoading$;
  }

  ngOnInit() {
    this.companyFacade.getCompanyList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.companyFacade.getCompanyList(this.pageQuery);
  }
}
