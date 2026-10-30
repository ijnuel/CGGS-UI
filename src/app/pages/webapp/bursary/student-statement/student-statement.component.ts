import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentFacade } from '../../../../store/student/student.facade';
import { StudentListInterface } from '../../../../types';
import { openBlobInNewTab } from '../../../../services/helper.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-student-statement',
  templateUrl: './student-statement.component.html',
})
export class StudentStatementComponent implements OnInit, OnDestroy {
  studentControl = new FormControl<string | null>(null, Validators.required);
  students: StudentListInterface[] = [];
  generating = false;

  studentLabelFn = (s: StudentListInterface): string =>
    `${s.lastName ?? ''} ${s.firstName ?? ''}`.trim() + (s.studentNo ? ` (${s.studentNo})` : '');

  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private studentFacade: StudentFacade,
  ) {}

  ngOnInit(): void {
    this.studentFacade.getStudentAll();
    this.studentFacade.studentAll$
      .pipe(takeUntil(this.destroy$))
      .subscribe(students => { this.students = students ?? []; });
  }

  generate(): void {
    const studentId = this.studentControl.value;
    if (!studentId) {
      this.studentControl.markAsTouched();
      return;
    }

    this.generating = true;
    this.http
      .get(`${environment.baseUrl}/BursaryReport/GenerateStudentStatement`, {
        params: new HttpParams().set('studentId', studentId),
        responseType: 'blob',
        withCredentials: true,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          this.generating = false;
          openBlobInNewTab(blob);
        },
        // The HTTP interceptor already shows the API's error message
        error: () => { this.generating = false; },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
