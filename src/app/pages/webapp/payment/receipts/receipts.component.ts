import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentPortalService } from '../../../../services/student-portal.service';
import { openBlobInNewTab } from '../../../../services/helper.service';
import { StudentReceiptInterface } from '../../../../types/fee';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
})
export class ReceiptsComponent implements OnInit, OnDestroy {
  receipts: StudentReceiptInterface[] = [];
  loading = true;
  downloadingId: string | null = null;
  studentId: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private studentPortalService: StudentPortalService) {}

  ngOnInit(): void {
    // A family arrives with the child they were viewing; a student uses their own record
    this.studentId = this.route.snapshot.queryParamMap.get('studentId');
    this.studentPortalService
      .getReceipts(this.studentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (receipts) => { this.receipts = receipts; this.loading = false; },
        // The HTTP interceptor already shows the API's error message
        error: () => { this.loading = false; },
      });
  }

  download(receipt: StudentReceiptInterface): void {
    this.downloadingId = receipt.transactionId;
    this.studentPortalService
      .downloadReceipt(receipt.transactionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => { this.downloadingId = null; openBlobInNewTab(blob); },
        error: () => { this.downloadingId = null; },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
