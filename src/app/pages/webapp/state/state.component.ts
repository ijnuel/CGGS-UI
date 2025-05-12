import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { StateFacade } from '../../../store/state/state.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StateListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrl: './state.component.scss',
})
export class StateComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  stateList$: Observable<PaginatedResponseInterface<
    StateListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private stateFacade: StateFacade) {
    this.stateList$ = this.stateFacade.selectStateList$;
    this.loading$ = this.stateFacade.selectedLoading$;
  }

  ngOnInit() {
    this.stateFacade.getStateList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.stateFacade.getStateList(this.pageQuery);
  }
}
