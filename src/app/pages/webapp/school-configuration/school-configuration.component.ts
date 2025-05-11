import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { SchoolConfigurationFacade } from '../../../store/school-configuration/school-configuration.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  SchoolConfigurationListInterface,
} from '../../../types';

@Component({
    selector: 'app-school-configuration',
    templateUrl: './school-configuration.component.html',
    styleUrl: './school-configuration.component.scss',
})
export class SchoolConfigurationComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 15,
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
}
