import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { ClassLevelFacade } from '../../../store/class-level/class-level.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  ClassLevelListInterface,
} from '../../../types';

@Component({
    selector: 'app-class-level',
    templateUrl: './class-level.component.html',
    styleUrl: './class-level.component.scss',
})
export class ClassLevelComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 15,
  };
  classLevelList$: Observable<PaginatedResponseInterface<
    ClassLevelListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private classLevelFacade: ClassLevelFacade) {
    this.classLevelList$ = this.classLevelFacade.selectClassLevelList$;
    this.loading$ = this.classLevelFacade.selectedLoading$;
  }

  ngOnInit() {
    this.classLevelFacade.getClassLevelList(this.pageQuery);
  }
}
