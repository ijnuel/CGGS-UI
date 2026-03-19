import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FamilyFacade } from '../../../store/family/family.facade';
import { FamilyListInterface } from '../../../types/family';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent {
  familyList$: Observable<PaginatedResponseInterface<FamilyListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private familyFacade: FamilyFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.familyList$ = this.familyFacade.familyList$;
    this.loading$ = this.familyFacade.loading$;
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.familyFacade.getFamilyList(query);
  }

  onRefresh() {
    this.familyFacade.getFamilyList(this.lastQuery);
  }

  onView(row: FamilyListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: FamilyListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: FamilyListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Family',
        message: `Are you sure you want to delete "${row.lastName}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.familyFacade.deleteFamily(row.id);
        this.toastService.openToast('Family deleted successfully', NotificationTypeEnums.SUCCESS);
        this.familyFacade.getFamilyList(this.lastQuery);
      }
    });
  }
}
