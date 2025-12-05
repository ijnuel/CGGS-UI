import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassFacade } from '../../../store/class/class.facade';
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
export class ClassComponent implements OnInit {
  classList$: Observable<PaginatedResponseInterface<ClassListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classFacade: ClassFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.classList$ = this.classFacade.classList$;
    this.loading$ = this.classFacade.loading$;
  }

  ngOnInit() {
    this.loadClasss();
  }

  loadClasss() {
    this.classFacade.getClassList({
      start: 0,
      recordsPerPage: 100,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.classFacade.getClassList(event);
  }

  onSearch(searchText: string) {
    this.classFacade.getClassList({
      start: 0,
      recordsPerPage: 100,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.classFacade.getClassList({
      start: 0,
      recordsPerPage: 100,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadClasss();
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
        this.toastService.openToast('Class deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadClasss();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
