import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalGovernmentAreaFacade } from '../../../store/local-government-area/local-government-area.facade';
import { LocalGovernmentAreaListInterface } from '../../../types/local-government-area';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-local-government-area',
  templateUrl: './local-government-area.component.html',
  styleUrls: ['./local-government-area.component.scss'],
})
export class LocalGovernmentAreaComponent implements OnInit {
  localGovernmentAreaList$: Observable<PaginatedResponseInterface<LocalGovernmentAreaListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localGovernmentAreaFacade: LocalGovernmentAreaFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.localGovernmentAreaList$ = this.localGovernmentAreaFacade.localGovernmentAreaList$;
    this.loading$ = this.localGovernmentAreaFacade.loading$;
  }

  ngOnInit() {
    this.loadLocalGovernmentAreas();
  }

  loadLocalGovernmentAreas() {
    this.localGovernmentAreaFacade.getLocalGovernmentAreaList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.localGovernmentAreaFacade.getLocalGovernmentAreaList(event);
  }

  onSearch(searchText: string) {
    this.localGovernmentAreaFacade.getLocalGovernmentAreaList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.localGovernmentAreaFacade.getLocalGovernmentAreaList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadLocalGovernmentAreas();
  }

  onView(row: LocalGovernmentAreaListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: LocalGovernmentAreaListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: LocalGovernmentAreaListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Local Government Area',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.localGovernmentAreaFacade.deleteLocalGovernmentArea(row.id);
        this.toastService.openToast('Local Government Area deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadLocalGovernmentAreas();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
