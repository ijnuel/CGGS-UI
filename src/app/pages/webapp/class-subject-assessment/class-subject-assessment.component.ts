import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassSubjectAssessmentFacade } from '../../../store/class-subject-assessment/class-subject-assessment.facade';
import { ClassSubjectAssessmentListInterface } from '../../../types/class-subject-assessment';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
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
export class ClassSubjectAssessmentComponent implements OnInit {
  classSubjectAssessmentList$: Observable<PaginatedResponseInterface<ClassSubjectAssessmentListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classSubjectAssessmentFacade: ClassSubjectAssessmentFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.classSubjectAssessmentList$ = this.classSubjectAssessmentFacade.classSubjectAssessmentList$;
    this.loading$ = this.classSubjectAssessmentFacade.loading$;
  }

  ngOnInit() {
    this.loadClassSubjectAssessments();
  }

  loadClassSubjectAssessments() {
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentList(event);
  }

  onSearch(searchText: string) {
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadClassSubjectAssessments();
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
        this.toastService.openToast('Class Subject Assessment deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadClassSubjectAssessments();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
