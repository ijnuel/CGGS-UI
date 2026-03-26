import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { ClassSubjectAssessmentFacade } from '../../../store/class-subject-assessment/class-subject-assessment.facade';
import * as ClassSubjectAssessmentAction from '../../../store/class-subject-assessment/class-subject-assessment.actions';
import { ClassSubjectAssessmentListInterface } from '../../../types/class-subject-assessment';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-class-subject-assessment',
  templateUrl: './class-subject-assessment.component.html',
  styleUrls: ['./class-subject-assessment.component.scss'],
})
export class ClassSubjectAssessmentComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  classSubjectAssessmentList$: Observable<PaginatedResponseInterface<ClassSubjectAssessmentListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classSubjectAssessmentFacade: ClassSubjectAssessmentFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.classSubjectAssessmentList$ = this.classSubjectAssessmentFacade.classSubjectAssessmentList$;
    this.loading$ = this.classSubjectAssessmentFacade.loading$;

    this.actions$.pipe(
      ofType(ClassSubjectAssessmentAction.deleteClassSubjectAssessmentSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Class Subject Assessment deleted successfully', NotificationTypeEnums.SUCCESS);
      this.classSubjectAssessmentFacade.getClassSubjectAssessmentList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentList(query);
  }

  onRefresh() {
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentList(this.lastQuery);
  }

  onView(row: ClassSubjectAssessmentListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: ClassSubjectAssessmentListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: ClassSubjectAssessmentListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Class Subject Assessment',
        message: `Are you sure you want to delete "${row.assessmentType}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classSubjectAssessmentFacade.deleteClassSubjectAssessment(row.id);
      }
    });
  }
}
