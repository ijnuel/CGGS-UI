import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { ClassLevelFacade } from '../../../store/class-level/class-level.facade';
import * as ClassLevelAction from '../../../store/class-level/class-level.actions';
import { ClassLevelListInterface } from '../../../types/class-level';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-class-level',
  templateUrl: './class-level.component.html',
  styleUrls: ['./class-level.component.scss'],
})
export class ClassLevelComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  classLevelList$: Observable<PaginatedResponseInterface<ClassLevelListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classLevelFacade: ClassLevelFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.classLevelList$ = this.classLevelFacade.classLevelList$;
    this.loading$ = this.classLevelFacade.loading$;

    this.actions$.pipe(
      ofType(ClassLevelAction.deleteClassLevelSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Class Level deleted successfully', NotificationTypeEnums.SUCCESS);
      this.classLevelFacade.getClassLevelList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.classLevelFacade.getClassLevelList(query);
  }

  onRefresh() {
    this.classLevelFacade.getClassLevelList(this.lastQuery);
  }

  onView(row: ClassLevelListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: ClassLevelListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: ClassLevelListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Class Level',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classLevelFacade.deleteClassLevel(row.id);
      }
    });
  }
}
