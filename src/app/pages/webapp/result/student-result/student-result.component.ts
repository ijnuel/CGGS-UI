import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ResultFacade } from '../../../../store/result/result.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { StudentFacade } from '../../../../store/student/student.facade';
import { AuthFacade } from '../../../../store/auth/auth.facade';
import { SchoolTermSessionListInterface, StudentListInterface } from '../../../../types';
import {
  ToastNotificationService,
  NotificationTypeEnums,
} from '../../../../services/toast-notification.service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss'],
})
export class StudentResultComponent implements OnInit, OnDestroy {
  form: FormGroup<{
    schoolTermSessionId: FormControl<string | null>;
    hideOverallPosition: FormControl<boolean | null>;
  }>;

  schoolTermSessions$: Observable<SchoolTermSessionListInterface[] | null>;
  generatingStudentResult$ = this.resultFacade.generatingStudentResult$;

  private student: StudentListInterface | null = null;
  private destroy$ = new Subject<void>();
  private hasAutoSelectedSession = false;

  constructor(
    private fb: FormBuilder,
    private resultFacade: ResultFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private studentFacade: StudentFacade,
    private authFacade: AuthFacade,
    private toastService: ToastNotificationService
  ) {
    this.form = this.fb.group({
      schoolTermSessionId: ['', Validators.required],
      hideOverallPosition: [false],
    });

    this.schoolTermSessions$ = this.schoolTermSessionFacade.schoolTermSessionAll$;
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.schoolTermSessionFacade.getSchoolTermSessionAll({
      nestedProperties: [{ name: 'session' }],
    });

    // Auto-select the current school term session
    this.schoolTermSessions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((sessions) => {
        if (this.hasAutoSelectedSession || !sessions || sessions.length === 0) return;
        const defaultSession = sessions.find((s) => s.isCurrent) ?? sessions[0];
        if (defaultSession && !this.formControl.schoolTermSessionId.value) {
          this.formControl.schoolTermSessionId.setValue(defaultSession.id);
          this.hasAutoSelectedSession = true;
        }
      });

    // Fetch the student record that belongs to the current user
    this.authFacade.selectedCurrentUser$
      .pipe(
        filter((user) => !!user),
        take(1)
      )
      .subscribe((user) => {
        this.studentFacade.getStudentByProperties({
          queryProperties: [{ name: 'userId', value: user!.userId }],
        });
      });

    this.studentFacade.studentByProperties$
      .pipe(takeUntil(this.destroy$))
      .subscribe((students) => {
        this.student = students?.[0] ?? null;
      });

    // Open PDF when result is ready
    this.resultFacade.generatedStudentResult$
      .pipe(
        filter((blob): blob is Blob => !!blob),
        takeUntil(this.destroy$)
      )
      .subscribe((blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        this.toastService.openToast('Result generated successfully', NotificationTypeEnums.SUCCESS);
        this.resultFacade.clearGeneratedStudentResult();
        setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
      });

    this.resultFacade.generateStudentResultError$
      .pipe(
        filter((error): error is string => !!error),
        takeUntil(this.destroy$)
      )
      .subscribe((error) => {
        this.toastService.openToast(error, NotificationTypeEnums.ERROR);
      });
  }

  generateResult(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.student) {
      this.toastService.openToast('Student profile not found. Please try again.', NotificationTypeEnums.ERROR);
      return;
    }
    const { schoolTermSessionId, hideOverallPosition } = this.form.value;
    if (schoolTermSessionId) {
      this.resultFacade.generateStudentResult(schoolTermSessionId, this.student.id, hideOverallPosition ?? false);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
