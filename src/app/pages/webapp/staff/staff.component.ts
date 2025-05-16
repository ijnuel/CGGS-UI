import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { StaffFacade } from '../../../store/staff/staff.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StaffListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrl: './staff.component.scss',
})
export class StaffComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  staffList$: Observable<PaginatedResponseInterface<
    StaffListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private staffFacade: StaffFacade) {
    this.staffList$ = this.staffFacade.selectStaffList$;
    this.loading$ = this.staffFacade.selectedLoading$;
  }

  ngOnInit() {
    this.staffFacade.getStaffList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.staffFacade.getStaffList(this.pageQuery);
  }
}
