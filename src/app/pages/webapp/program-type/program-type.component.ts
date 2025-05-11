import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { ProgramTypeFacade } from '../../../store/program-type/program-type.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ProgramTypeListInterface,
} from '../../../types';

@Component({
    selector: 'app-program-type',
    templateUrl: './program-type.component.html',
    styleUrl: './program-type.component.scss',
})
export class ProgramTypeComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 15,
  };
  programTypeList$: Observable<PaginatedResponseInterface<
    ProgramTypeListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private programTypeFacade: ProgramTypeFacade) {
    this.programTypeList$ = this.programTypeFacade.selectProgramTypeList$;
    this.loading$ = this.programTypeFacade.selectedLoading$;
  }

  ngOnInit() {
    this.programTypeFacade.getProgramTypeList(this.pageQuery);
  }
}
