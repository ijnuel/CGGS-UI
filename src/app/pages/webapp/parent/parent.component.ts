import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { ParentFacade } from '../../../store/parent/parent.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ParentListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.scss',
})
export class ParentComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  parentList$: Observable<PaginatedResponseInterface<
    ParentListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private parentFacade: ParentFacade) {
    this.parentList$ = this.parentFacade.selectParentList$;
    this.loading$ = this.parentFacade.selectedLoading$;
  }

  ngOnInit() {
    this.parentFacade.getParentList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.parentFacade.getParentList(this.pageQuery);
  }
}
