import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { StudentsFacade } from '../../../store/students/students.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentsListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  studentsList$: Observable<PaginatedResponseInterface<
    StudentsListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private studentsFacade: StudentsFacade) {
    this.studentsList$ = this.studentsFacade.selectStudentsList$;
    this.loading$ = this.studentsFacade.selectedLoading$;
  }

  ngOnInit() {
    this.studentsFacade.getStudentsList(this.pageQuery);
  }
  
  onPageChange(event: PageEvent) {
    this.pageQuery = {
      start: event.pageSize * event.pageIndex,
      recordsPerPage: event.pageSize,
      pageIndex: event.pageIndex
    }
    this.studentsFacade.getStudentsList(this.pageQuery);
  }
}
