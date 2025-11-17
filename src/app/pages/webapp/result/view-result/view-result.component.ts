import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ResultFacade } from '../../../../store/result/result.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import {
  ClassListInterface,
  SchoolTermSessionListInterface,
} from '../../../../types';
import {
  ToastNotificationService,
  NotificationTypeEnums,
} from '../../../../services/toast-notification.service';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss'],
})
export class ViewResultComponent implements OnInit, OnDestroy {
  viewResultForm: FormGroup<{
    schoolTermSessionId: FormControl<string | null>;
    classId: FormControl<string | null>;
  }>;

  schoolTermSessions$: Observable<SchoolTermSessionListInterface[] | null>;
  classes$: Observable<ClassListInterface[] | null>;
  generating$ = this.resultFacade.generatingClassResult$;
  generateError$ = this.resultFacade.generateClassResultError$;

  private destroy$ = new Subject<void>();
  private hasAutoSelectedSchoolTermSession = false;

  constructor(
    private fb: FormBuilder,
    private resultFacade: ResultFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private classFacade: ClassFacade,
    private toastService: ToastNotificationService
  ) {
    this.viewResultForm = this.fb.group({
      schoolTermSessionId: ['', Validators.required],
      classId: ['', Validators.required],
    });

    this.schoolTermSessions$ = this.schoolTermSessionFacade.schoolTermSessionAll$;
    this.classes$ = this.classFacade.classAll$;
  }

  ngOnInit(): void {
    this.schoolTermSessionFacade.getSchoolTermSessionAll();
    this.classFacade.getClassAll();

    this.schoolTermSessions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((sessions) => {
        if (this.hasAutoSelectedSchoolTermSession || !sessions || sessions.length === 0) {
          return;
        }
        const defaultSession = sessions.find((session) => session.isCurrent) ?? sessions[0];
        if (defaultSession && !this.formControl.schoolTermSessionId.value) {
          this.formControl.schoolTermSessionId.setValue(defaultSession.id);
          this.hasAutoSelectedSchoolTermSession = true;
        }
      });

    this.resultFacade.generatedClassResult$
      .pipe(
        filter((blob): blob is Blob => !!blob),
        takeUntil(this.destroy$)
      )
      .subscribe((blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        this.toastService.openToast('Result generated successfully', NotificationTypeEnums.SUCCESS);
        this.resultFacade.clearGeneratedClassResult();

        setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
      });

    this.generateError$
      .pipe(
        filter((error): error is string => !!error),
        takeUntil(this.destroy$)
      )
      .subscribe((error) => {
        this.toastService.openToast(error, NotificationTypeEnums.ERROR);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get formControl() {
    return this.viewResultForm.controls;
  }

  generateResult(): void {
    if (this.viewResultForm.invalid) {
      this.viewResultForm.markAllAsTouched();
      return;
    }

    const { schoolTermSessionId, classId } = this.viewResultForm.value;
    if (schoolTermSessionId && classId) {
      this.resultFacade.generateClassResult(schoolTermSessionId, classId);
    }
  }
}

