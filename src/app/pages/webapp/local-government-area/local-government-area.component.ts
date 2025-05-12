import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { LocalGovernmentAreaFacade } from '../../../store/local-government-area/local-government-area.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  LocalGovernmentAreaListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-local-government-area',
    templateUrl: './local-government-area.component.html',
    styleUrl: './local-government-area.component.scss',
})
export class LocalGovernmentAreaComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  localGovernmentAreaList$: Observable<PaginatedResponseInterface<
    LocalGovernmentAreaListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private localGovernmentAreaFacade: LocalGovernmentAreaFacade) {
    this.localGovernmentAreaList$ = this.localGovernmentAreaFacade.selectLocalGovernmentAreaList$;
    this.loading$ = this.localGovernmentAreaFacade.selectedLoading$;
  }

  ngOnInit() {
    this.localGovernmentAreaFacade.getLocalGovernmentAreaList(this.pageQuery);
  }
  
  onPageChange(event: PageEvent) {
    this.pageQuery = {
      start: event.pageSize * event.pageIndex,
      recordsPerPage: event.pageSize,
      pageIndex: event.pageIndex
    }
    this.localGovernmentAreaFacade.getLocalGovernmentAreaList(this.pageQuery);
  }
}
