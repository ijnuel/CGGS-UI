import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { ClassFacade } from '../../../store/class/class.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassListInterface,
} from '../../../types';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrl: './class.component.scss',
})
export class ClassComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 15,
  };
  classList$: Observable<PaginatedResponseInterface<
    ClassListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private classFacade: ClassFacade) {
    this.classList$ = this.classFacade.selectClassList$;
    this.loading$ = this.classFacade.selectedLoading$;
  }

  ngOnInit() {
    this.classFacade.getClassList(this.pageQuery);
  }
}
