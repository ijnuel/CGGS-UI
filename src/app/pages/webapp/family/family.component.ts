import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { FamilyFacade } from '../../../store/family/family.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  FamilyListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-family',
    templateUrl: './family.component.html',
    styleUrl: './family.component.scss',
})
export class FamilyComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  familyList$: Observable<PaginatedResponseInterface<
    FamilyListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private familyFacade: FamilyFacade) {
    this.familyList$ = this.familyFacade.selectFamilyList$;
    this.loading$ = this.familyFacade.selectedLoading$;
  }

  ngOnInit() {
    this.familyFacade.getFamilyList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.familyFacade.getFamilyList(this.pageQuery);
  }
}
