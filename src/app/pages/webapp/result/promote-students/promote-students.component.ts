import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ResultFacade } from '../../../../store/result/result.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SessionFacade } from '../../../../store/session/session.facade';
import { ClassListInterface, SessionListInterface } from '../../../../types';
import { PromotionResultInterface } from '../../../../types/result';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';
import { getClassLabel } from '../../../../services/helper.service';

@Component({
  selector: 'app-promote-students',
  templateUrl: './promote-students.component.html',
  styleUrls: ['./promote-students.component.scss'],
})
export class PromoteStudentsComponent implements OnInit, OnDestroy {
  form: FormGroup<{
    classId: FormControl<string | null>;
    sessionId: FormControl<string | null>;
  }>;

  classes$: Observable<ClassListInterface[] | null>;
  sessions$: Observable<SessionListInterface[] | null>;
  promoting$ = this.resultFacade.promotingStudents$;
  classLabelFn = (cls: ClassListInterface): string => getClassLabel(cls) || cls?.name || '';
  promotionResult$: Observable<PromotionResultInterface | null>;
  promotionError$: Observable<string | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private resultFacade: ResultFacade,
    private classFacade: ClassFacade,
    private sessionFacade: SessionFacade,
    private toastService: ToastNotificationService,
  ) {
    this.form = this.fb.group({
      classId: ['', Validators.required],
      sessionId: ['', Validators.required],
    });

    this.classes$ = this.classFacade.classAll$;
    this.sessions$ = this.sessionFacade.sessionAll$;
    this.promotionResult$ = this.resultFacade.promotionResult$;
    this.promotionError$ = this.resultFacade.promotionError$;
  }

  ngOnInit(): void {
    this.classFacade.getClassAll({
      nestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }],
    });
    this.sessionFacade.getSessionAll();

    this.sessions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(sessions => {
        if (!sessions || this.form.controls.sessionId.value) return;
        const current = sessions.find(s => s.isCurrent) ?? sessions[0];
        if (current) this.form.controls.sessionId.setValue(current.id);
      });

    this.promotionError$
      .pipe(
        filter((e): e is string => !!e),
        takeUntil(this.destroy$),
      )
      .subscribe(error => {
        this.toastService.openToast(error, NotificationTypeEnums.ERROR);
      });
  }

  promote(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { classId, sessionId } = this.form.value;
    if (classId && sessionId) {
      this.resultFacade.clearPromotionResult();
      this.resultFacade.promoteStudents(classId, sessionId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.resultFacade.clearPromotionResult();
  }
}
