import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SessionFacade } from '../../../../store/session/session.facade';
import { ClassListInterface, SessionListInterface } from '../../../../types';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';
import { getClassLabel } from '../../../../services/helper.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-debtors-report',
  templateUrl: './debtors-report.component.html',
})
export class DebtorsReportComponent implements OnInit, OnDestroy {
  form: FormGroup<{
    sessionId: FormControl<string | null>;
    classId: FormControl<string | null>;
    consolidated: FormControl<boolean | null>;
  }>;

  sessions: SessionListInterface[] = [];
  classes: ClassListInterface[] = [];
  generating = false;

  classLabelFn = (cls: ClassListInterface): string => getClassLabel(cls) || cls?.name || '';

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private classFacade: ClassFacade,
    private sessionFacade: SessionFacade,
    private toastService: ToastNotificationService,
  ) {
    this.form = this.fb.group({
      sessionId: ['', Validators.required],
      classId: [null as string | null],
      consolidated: [false],
    });
  }

  ngOnInit(): void {
    this.classFacade.getClassAll({
      nestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }],
    });
    this.sessionFacade.getSessionAll();

    this.classFacade.classAll$
      .pipe(takeUntil(this.destroy$))
      .subscribe(classes => { this.classes = classes ?? []; });

    this.sessionFacade.sessionAll$
      .pipe(takeUntil(this.destroy$))
      .subscribe(sessions => {
        this.sessions = sessions ?? [];
        if (!this.form.controls.sessionId.value) {
          const current = this.sessions.find(s => s.isCurrent) ?? this.sessions[0];
          if (current) this.form.controls.sessionId.setValue(current.id);
        }
      });
  }

  generate(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { sessionId, classId, consolidated } = this.form.value;
    if (!sessionId) return;

    this.generating = true;
    let params = new HttpParams().set('sessionId', sessionId);
    if (classId) params = params.set('classId', classId);
    if (consolidated) params = params.set('consolidated', 'true');

    this.http
      .get(`${environment.baseUrl}/Result/GenerateDebtorsReport`, {
        params,
        responseType: 'blob',
        withCredentials: true,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          this.generating = false;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Debtors Report.xlsx';
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 5000);
          this.toastService.openToast('Debtors report generated successfully', NotificationTypeEnums.SUCCESS);
        },
        error: (err) => {
          this.generating = false;
          const msg = err?.error?.message ?? err?.message ?? 'Failed to generate report';
          this.toastService.openToast(msg, NotificationTypeEnums.ERROR);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
