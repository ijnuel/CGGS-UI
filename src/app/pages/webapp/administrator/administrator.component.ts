import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { AdministratorFacade } from '../../../store/administrator/administrator.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  AdministratorListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-administrator',
    templateUrl: './administrator.component.html',
    styleUrl: './administrator.component.scss',
})
export class AdministratorComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  administratorList$: Observable<PaginatedResponseInterface<
    AdministratorListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private administratorFacade: AdministratorFacade) {
    this.administratorList$ = this.administratorFacade.selectAdministratorList$;
    this.loading$ = this.administratorFacade.selectedLoading$;
  }

  ngOnInit() {
    this.administratorFacade.getAdministratorList(this.pageQuery);
  }
  
  onPageChange(event: PageEvent) {
    this.pageQuery = {
      start: event.pageSize * event.pageIndex,
      recordsPerPage: event.pageSize,
      pageIndex: event.pageIndex
    }
    this.administratorFacade.getAdministratorList(this.pageQuery);
  }
}
