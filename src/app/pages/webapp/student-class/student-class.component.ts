import { Component } from '@angular/core';
import { tableHeader } from './table-header';
import { StudentClassFacade } from '../../../store/student-class/student-class.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  StudentClassListInterface,
} from '../../../types';

@Component({
    selector: 'app-student-class',
    templateUrl: './student-class.component.html',
    styleUrl: './student-class.component.scss',
})
export class StudentClassComponent {
  header = tableHeader;
  studentClassList$: Observable<PaginatedResponseInterface<
    StudentClassListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private studentClassFacade: StudentClassFacade) {
    this.studentClassList$ = this.studentClassFacade.studentClassList$;
    this.loading$ = this.studentClassFacade.loading$;
  }

  onQueryChange(query: PageQueryInterface) {
    this.studentClassFacade.getStudentClassList(query);
  }
}
