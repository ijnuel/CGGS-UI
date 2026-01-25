import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassSubjectFacade } from '../../../store/class-subject/class-subject.facade';
import { ClassSubjectListInterface } from '../../../types/class-subject';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
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
export class ClassSubjectComponent implements OnInit {
  classSubjectList$: Observable<PaginatedResponseInterface<ClassSubjectListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classSubjectFacade: ClassSubjectFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.classSubjectList$ = this.classSubjectFacade.classSubjectList$;
    this.loading$ = this.classSubjectFacade.loading$;
  }

  ngOnInit() {
    this.loadClassSubjects();
  }

  loadClassSubjects() {
    this.classSubjectFacade.getClassSubjectList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.classSubjectFacade.getClassSubjectList(event);
  }

  onSearch(searchText: string) {
    this.classSubjectFacade.getClassSubjectList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.classSubjectFacade.getClassSubjectList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadClassSubjects();
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
        this.toastService.openToast('Class Subject deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadClassSubjects();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
