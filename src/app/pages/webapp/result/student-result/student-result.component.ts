import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentPortalService } from '../../../../services/student-portal.service';
import { openBlobInNewTab } from '../../../../services/helper.service';
import { StudentResultsOverviewInterface, TermResultSummaryInterface } from '../../../../types/result';
import { TermEnum } from '../../../../types';

interface SubjectRow {
  subjectName: string;
  scores: (number | null)[]; // aligned with the term columns
  change: number | null; // latest score minus the one before it
  sparkPoints: { x: number; y: number; label: string }[];
  sparkPath: string;
}

// Sparkline geometry. Every subject shares one vertical scale (the student's lowest to highest
// score, padded) so slopes are comparable between rows yet large enough to read.
const SPARK_WIDTH = 120;
const SPARK_HEIGHT = 36;
const SPARK_PAD = 5;

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss'],
})
export class StudentResultComponent implements OnInit, OnDestroy {
  readonly sparkWidth = SPARK_WIDTH;
  readonly sparkHeight = SPARK_HEIGHT;

  loading = true;
  overview: StudentResultsOverviewInterface | null = null;
  termsNewestFirst: TermResultSummaryInterface[] = [];
  subjectRows: SubjectRow[] = [];
  downloadingTermId: string | null = null;
  studentId: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private studentPortalService: StudentPortalService) {}

  ngOnInit(): void {
    // A family can pass the child they are viewing; a student uses their own record
    this.studentId = this.route.snapshot.queryParamMap.get('studentId');
    this.studentPortalService
      .getResults(this.studentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (overview) => {
          this.overview = overview;
          this.termsNewestFirst = [...overview.terms].reverse();
          this.subjectRows = this.buildSubjectRows(overview);
          this.loading = false;
        },
        // The HTTP interceptor already shows the API's error message
        error: () => { this.loading = false; },
      });
  }

  termLabel(term: { term: number; sessionName: string }): string {
    return `${TermEnum[term.term]} Term ${term.sessionName}`;
  }

  shortTermLabel(term: { term: number; sessionName: string }): string {
    return `${TermEnum[term.term]} ${term.sessionName}`;
  }

  downloadPdf(term: TermResultSummaryInterface): void {
    if (!this.overview) return;
    this.downloadingTermId = term.schoolTermSessionId;
    this.studentPortalService
      .downloadResult(term.schoolTermSessionId, this.overview.studentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => { this.downloadingTermId = null; openBlobInNewTab(blob); },
        error: () => { this.downloadingTermId = null; },
      });
  }

  private buildSubjectRows(overview: StudentResultsOverviewInterface): SubjectRow[] {
    const termIds = overview.terms.map((t) => t.schoolTermSessionId);
    const step = termIds.length > 1 ? (SPARK_WIDTH - SPARK_PAD * 2) / (termIds.length - 1) : 0;
    const allScores = overview.subjects.flatMap((s) => s.points.map((p) => p.score));
    const low = Math.max(0, Math.floor(Math.min(...allScores) - 5));
    const high = Math.min(100, Math.ceil(Math.max(...allScores) + 5));
    const range = Math.max(high - low, 1);

    return overview.subjects.map((subject) => {
      const scores = termIds.map((id) => subject.points.find((p) => p.schoolTermSessionId === id)?.score ?? null);
      const sparkPoints = scores
        .map((score, i) => score === null ? null : {
          x: SPARK_PAD + i * step,
          y: SPARK_HEIGHT - SPARK_PAD - ((Math.min(Math.max(score, low), high) - low) / range) * (SPARK_HEIGHT - SPARK_PAD * 2),
          label: `${this.termLabel(overview.terms[i])}: ${score}`,
        })
        .filter((p): p is { x: number; y: number; label: string } => p !== null);
      const taken = scores.filter((s): s is number => s !== null);

      return {
        subjectName: subject.subjectName,
        scores,
        change: taken.length > 1 ? Math.round((taken[taken.length - 1] - taken[taken.length - 2]) * 100) / 100 : null,
        sparkPoints,
        sparkPath: sparkPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' '),
      };
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
