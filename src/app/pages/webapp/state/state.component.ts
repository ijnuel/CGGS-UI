import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StateFacade } from '../../../store/state/state.facade';
import { StateListInterface } from '../../../types/state';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
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
export class StateComponent implements OnInit {
  stateList$: Observable<PaginatedResponseInterface<StateListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stateFacade: StateFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.stateList$ = this.stateFacade.stateList$;
    this.loading$ = this.stateFacade.loading$;
  }

  ngOnInit() {
    this.loadStates();
  }

  loadStates() {
    this.stateFacade.getStateList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.stateFacade.getStateList(event);
  }

  onSearch(searchText: string) {
    this.stateFacade.getStateList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.stateFacade.getStateList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadStates();
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
        this.toastService.openToast('State deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadStates();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
