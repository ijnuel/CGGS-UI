import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { TeacherFacade } from '../../../store/teacher/teacher.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  TeacherListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrl: './teacher.component.scss',
})
export class TeacherComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  teacherList$: Observable<PaginatedResponseInterface<
    TeacherListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private teacherFacade: TeacherFacade) {
    this.teacherList$ = this.teacherFacade.selectTeacherList$;
    this.loading$ = this.teacherFacade.selectedLoading$;
  }

  ngOnInit() {
    this.teacherFacade.getTeacherList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.teacherFacade.getTeacherList(this.pageQuery);
  }
}
