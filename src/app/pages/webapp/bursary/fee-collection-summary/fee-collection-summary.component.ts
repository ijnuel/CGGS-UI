import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionFacade } from '../../../../store/session/session.facade';
import { SessionListInterface, TermEnum } from '../../../../types';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';
import { downloadBlob } from '../../../../services/helper.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-fee-collection-summary',
  templateUrl: './fee-collection-summary.component.html',
})
export class FeeCollectionSummaryComponent implements OnInit, OnDestroy {
  form: FormGroup<{
    sessionId: FormControl<string | null>;
    term: FormControl<TermEnum | null>;
  }>;

  sessions: SessionListInterface[] = [];
  terms = [
    { value: TermEnum.First, description: 'First Term' },
    { value: TermEnum.Second, description: 'Second Term' },
    { value: TermEnum.Third, description: 'Third Term' },
  ];
  generating = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sessionFacade: SessionFacade,
    private toastService: ToastNotificationService,
  ) {
    this.form = this.fb.group({
      sessionId: ['', Validators.required],
      term: [null as TermEnum | null],
    });
  }

  ngOnInit(): void {
    this.sessionFacade.getSessionAll();
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
    const { sessionId, term } = this.form.value;
    if (this.form.invalid || !sessionId) return;

    this.generating = true;
    let params = new HttpParams().set('sessionId', sessionId);
    if (term) params = params.set('term', term);

    this.http
      .get(`${environment.baseUrl}/BursaryReport/GenerateFeeCollectionSummary`, {
        params,
        responseType: 'blob',
        withCredentials: true,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          this.generating = false;
          downloadBlob(blob, 'Fee Collection Summary.xlsx');
          this.toastService.openToast('Fee collection summary generated successfully', NotificationTypeEnums.SUCCESS);
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
