import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { ClassSubjectFacade } from '../../../store/class-subject/class-subject.facade';
import * as ClassSubjectAction from '../../../store/class-subject/class-subject.actions';
import { ClassSubjectListInterface } from '../../../types/class-subject';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-class-subject',
  templateUrl: './class-subject.component.html',
  styleUrls: ['./class-subject.component.scss'],
})
export class ClassSubjectComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  classSubjectList$: Observable<PaginatedResponseInterface<ClassSubjectListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classSubjectFacade: ClassSubjectFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.classSubjectList$ = this.classSubjectFacade.classSubjectList$;
    this.loading$ = this.classSubjectFacade.loading$;

    this.actions$.pipe(
      ofType(ClassSubjectAction.deleteClassSubjectSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Class Subject deleted successfully', NotificationTypeEnums.SUCCESS);
      this.classSubjectFacade.getClassSubjectList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.classSubjectFacade.getClassSubjectList(query);
  }

  onRefresh() {
    this.classSubjectFacade.getClassSubjectList(this.lastQuery);
  }

  onView(row: ClassSubjectListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: ClassSubjectListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: ClassSubjectListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Class Subject',
        message: `Are you sure you want to delete "${row.subject?.name!}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classSubjectFacade.deleteClassSubject(row.id);
      }
    });
  }
}
