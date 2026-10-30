import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';
import { downloadBlob, toLocalDateString } from '../../../../services/helper.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-cash-book',
  templateUrl: './cash-book.component.html',
})
export class CashBookComponent implements OnDestroy {
  readonly today = new Date();

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
  ) {
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
      .get(`${environment.baseUrl}/BursaryReport/GenerateCashBook`, {
        params,
        responseType: 'blob',
        withCredentials: true,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          this.generating = false;
          downloadBlob(blob, `Cash Book ${startDate} to ${endDate}.xlsx`);
          this.toastService.openToast('Cash book generated successfully', NotificationTypeEnums.SUCCESS);
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
