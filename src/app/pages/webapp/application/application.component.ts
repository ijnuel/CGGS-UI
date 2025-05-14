import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { ApplicationFacade } from '../../../store/application/application.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ApplicationListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrl: './application.component.scss',
})
export class ApplicationComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  applicationList$: Observable<PaginatedResponseInterface<
    ApplicationListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private applicationFacade: ApplicationFacade) {
    this.applicationList$ = this.applicationFacade.selectApplicationList$;
    this.loading$ = this.applicationFacade.selectedLoading$;
  }

  ngOnInit() {
    this.applicationFacade.getApplicationList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.applicationFacade.getApplicationList(this.pageQuery);
  }
}
