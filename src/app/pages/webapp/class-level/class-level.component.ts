import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassLevelFacade } from '../../../store/class-level/class-level.facade';
import { ClassLevelListInterface } from '../../../types/class-level';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
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
export class ClassLevelComponent implements OnInit {
  classLevelList$: Observable<PaginatedResponseInterface<ClassLevelListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classLevelFacade: ClassLevelFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.classLevelList$ = this.classLevelFacade.classLevelList$;
    this.loading$ = this.classLevelFacade.loading$;
  }

  ngOnInit() {
    this.loadClassLevels();
  }

  loadClassLevels() {
    this.classLevelFacade.getClassLevelList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.classLevelFacade.getClassLevelList(event);
  }

  onSearch(searchText: string) {
    this.classLevelFacade.getClassLevelList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.classLevelFacade.getClassLevelList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadClassLevels();
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
        this.toastService.openToast('Class Level deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadClassLevels();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
