import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { SessionFacade } from '../../../store/session/session.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  SessionListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrl: './session.component.scss',
})
export class SessionComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  sessionList$: Observable<PaginatedResponseInterface<
    SessionListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private sessionFacade: SessionFacade) {
    this.sessionList$ = this.sessionFacade.selectSessionList$;
    this.loading$ = this.sessionFacade.selectedLoading$;
  }

  ngOnInit() {
    this.sessionFacade.getSessionList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.sessionFacade.getSessionList(this.pageQuery);
  }
}
