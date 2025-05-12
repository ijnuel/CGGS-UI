import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { StudentClassFacade } from '../../../store/student-class/student-class.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentClassListInterface,
} from '../../../types';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-student-class',
    templateUrl: './student-class.component.html',
    styleUrl: './student-class.component.scss',
})
export class StudentClassComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };
  studentClassList$: Observable<PaginatedResponseInterface<
    StudentClassListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private studentClassFacade: StudentClassFacade) {
    this.studentClassList$ = this.studentClassFacade.selectStudentClassList$;
    this.loading$ = this.studentClassFacade.selectedLoading$;
  }

  ngOnInit() {
    this.studentClassFacade.getStudentClassList(this.pageQuery);
  }
  
  onPageChange(pageQuery: PageQueryInterface) {
    this.pageQuery = pageQuery;
    this.studentClassFacade.getStudentClassList(this.pageQuery);
  }
}
