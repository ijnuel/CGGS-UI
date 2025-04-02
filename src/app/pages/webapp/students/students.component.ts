import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { StudentsFacade } from '../../../store/students/students.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentsListInterface,
} from '../../../types';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 15,
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
}
