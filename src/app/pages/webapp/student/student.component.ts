import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { StudentFacade } from '../../../store/student/student.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentsListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit {
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

  constructor(private studentsFacade: StudentFacade) {
    this.studentsList$ = this.studentsFacade.selectStudentsList$;
    this.loading$ = this.studentsFacade.selectedLoading$;
  }

  ngOnInit() {
    this.studentsFacade.getStudentsList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.studentsFacade.getStudentsList(this.pageQuery);
  }
}
