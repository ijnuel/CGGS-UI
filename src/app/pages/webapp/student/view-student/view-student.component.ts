import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentFacade } from '../../../../store/student/student.facade';
import { StudentListInterface } from '../../../../types';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  student$: Observable<StudentListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private studentFacade: StudentFacade,
    private router: Router
  ) {
    this.student$ = this.studentFacade.studentAll$.pipe(
      map(students => students?.[0] ?? null)
    );
  }

  ngOnInit() {
    const studentId = this.route.snapshot.params['id'];
    if (studentId) {
      this.studentFacade.getStudentAll({
        queryProperties: [{ name: 'id', value: studentId }],
        nestedProperties: [{ name: 'studentClasses' }]
      });
    }
  }
} 