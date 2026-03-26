import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { ClassFacade } from '../../../store/class/class.facade';
import * as ClassAction from '../../../store/class/class.actions';
import { ClassListInterface } from '../../../types/class';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  classList$: Observable<PaginatedResponseInterface<ClassListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 100, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classFacade: ClassFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.classList$ = this.classFacade.classList$;
    this.loading$ = this.classFacade.loading$;

    this.actions$.pipe(
      ofType(ClassAction.deleteClassSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Class deleted successfully', NotificationTypeEnums.SUCCESS);
      this.classFacade.getClassList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private readonly nestedProperties = [
    { name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }
  ];

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = { ...query, nestedProperties: this.nestedProperties };
    this.classFacade.getClassList(this.lastQuery);
  }

  onRefresh() {
    this.classFacade.getClassList(this.lastQuery);
  }

  onView(row: ClassListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: ClassListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: ClassListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Class',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classFacade.deleteClass(row.id);
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
