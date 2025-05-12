import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { SchoolConfigurationFacade } from '../../../store/school-configuration/school-configuration.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  SchoolConfigurationListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-school-configuration',
    templateUrl: './school-configuration.component.html',
    styleUrl: './school-configuration.component.scss',
})
export class SchoolConfigurationComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  schoolConfigurationList$: Observable<PaginatedResponseInterface<
    SchoolConfigurationListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private schoolConfigurationFacade: SchoolConfigurationFacade) {
    this.schoolConfigurationList$ = this.schoolConfigurationFacade.selectSchoolConfigurationList$;
    this.loading$ = this.schoolConfigurationFacade.selectedLoading$;
  }

  ngOnInit() {
    this.schoolConfigurationFacade.getSchoolConfigurationList(this.pageQuery);
  }
  
  onPageChange(event: PageEvent) {
    this.pageQuery = {
      start: event.pageSize * event.pageIndex,
      recordsPerPage: event.pageSize,
      pageIndex: event.pageIndex
    }
    this.schoolConfigurationFacade.getSchoolConfigurationList(this.pageQuery);
  }
}
