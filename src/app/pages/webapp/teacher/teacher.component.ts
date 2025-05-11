import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { TeacherFacade } from '../../../store/teacher/teacher.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  TeacherListInterface,
} from '../../../types';

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrl: './teacher.component.scss',
})
export class TeacherComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 15,
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
}
