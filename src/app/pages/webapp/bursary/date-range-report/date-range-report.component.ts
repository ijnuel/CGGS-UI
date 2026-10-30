import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';
import { downloadBlob, toLocalDateString } from '../../../../services/helper.service';
import { environment } from '../../../../../environments/environment';
import { ReportPageConfig } from '../report-page-config';

@Component({
  selector: 'app-date-range-report',
  templateUrl: './date-range-report.component.html',
})
export class DateRangeReportComponent implements OnDestroy {
  readonly today = new Date();
  readonly config: ReportPageConfig;

  form: FormGroup<{
    startDate: FormControl<Date | null>;
    endDate: FormControl<Date | null>;
  }>;

  generating = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastNotificationService,
    route: ActivatedRoute,
  ) {
    this.config = route.snapshot.data as ReportPageConfig;
    const firstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.form = this.fb.group({
      startDate: [firstOfMonth as Date | null, Validators.required],
      endDate: [new Date() as Date | null, Validators.required],
    });
  }

  get rangeInvalid(): boolean {
    const { startDate, endDate } = this.form.value;
    return !!startDate && !!endDate && startDate > endDate;
  }

  generate(): void {
    this.form.markAllAsTouched();
    const startDate = toLocalDateString(this.form.value.startDate);
    const endDate = toLocalDateString(this.form.value.endDate);
    if (this.form.invalid || this.rangeInvalid || !startDate || !endDate) return;

    this.generating = true;
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);

    this.http
      .get(`${environment.baseUrl}/${this.config.endpoint}`, {
        params,
        responseType: 'blob',
        withCredentials: true,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          this.generating = false;
          downloadBlob(blob, `${this.config.fileName} ${startDate} to ${endDate}.xlsx`);
          this.toastService.openToast(this.config.successMessage, NotificationTypeEnums.SUCCESS);
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
