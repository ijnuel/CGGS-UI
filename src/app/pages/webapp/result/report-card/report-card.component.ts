import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentPortalService } from '../../../../services/student-portal.service';
import { openBlobInNewTab } from '../../../../services/helper.service';
import { ReportCardInterface } from '../../../../types/result';
import { TermEnum } from '../../../../types';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
})
export class ReportCardComponent implements OnInit, OnDestroy {
  loading = true;
  card: ReportCardInterface | null = null;
  downloading = false;
  studentId: string | null = null;

  private termId = '';
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private studentPortalService: StudentPortalService) {}

  ngOnInit(): void {
    this.termId = this.route.snapshot.paramMap.get('termId') ?? '';
    this.studentId = this.route.snapshot.queryParamMap.get('studentId');
    this.studentPortalService
      .getReportCard(this.termId, this.studentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (card) => { this.card = card; this.loading = false; },
        // The HTTP interceptor already shows the API's error message
        error: () => { this.loading = false; },
      });
  }

  get termLabel(): string {
    return this.card ? `${TermEnum[this.card.term]} Term ${this.card.session}` : '';
  }

  downloadPdf(): void {
    if (!this.card) return;
    this.downloading = true;
    this.studentPortalService
      .downloadResult(this.termId, this.card.studentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => { this.downloading = false; openBlobInNewTab(blob); },
        error: () => { this.downloading = false; },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
