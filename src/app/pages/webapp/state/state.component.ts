import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { StateFacade } from '../../../store/state/state.facade';
import * as StateAction from '../../../store/state/state.actions';
import { StateListInterface } from '../../../types/state';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  stateList$: Observable<PaginatedResponseInterface<StateListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stateFacade: StateFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.stateList$ = this.stateFacade.stateList$;
    this.loading$ = this.stateFacade.loading$;

    this.actions$.pipe(
      ofType(StateAction.deleteStateSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('State deleted successfully', NotificationTypeEnums.SUCCESS);
      this.stateFacade.getStateList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.stateFacade.getStateList(query);
  }

  onRefresh() {
    this.stateFacade.getStateList(this.lastQuery);
  }

  onView(row: StateListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: StateListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: StateListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete State',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stateFacade.deleteState(row.id);
      }
    });
  }
}
