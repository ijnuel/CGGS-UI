import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgrammeGradeRemarkFacade } from '../../../store/programme-grade-remark/programme-grade-remark.facade';
import { ProgrammeGradeRemarkListInterface } from '../../../types/programme-grade-remark';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-programme-grade-remark',
  templateUrl: './programme-grade-remark.component.html',
  styleUrls: ['./programme-grade-remark.component.scss'],
})
export class ProgrammeGradeRemarkComponent implements OnInit {
  programmeGradeRemarkList$: Observable<PaginatedResponseInterface<ProgrammeGradeRemarkListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private programmeGradeRemarkFacade: ProgrammeGradeRemarkFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.programmeGradeRemarkList$ = this.programmeGradeRemarkFacade.programmeGradeRemarkList$;
    this.loading$ = this.programmeGradeRemarkFacade.loading$;
  }

  ngOnInit() {
    this.loadProgrammeGradeRemarks();
  }

  loadProgrammeGradeRemarks() {
    this.programmeGradeRemarkFacade.getProgrammeGradeRemarkList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.programmeGradeRemarkFacade.getProgrammeGradeRemarkList(event);
  }

  onSearch(searchText: string) {
    this.programmeGradeRemarkFacade.getProgrammeGradeRemarkList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.programmeGradeRemarkFacade.getProgrammeGradeRemarkList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadProgrammeGradeRemarks();
  }

  onView(row: ProgrammeGradeRemarkListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: ProgrammeGradeRemarkListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: ProgrammeGradeRemarkListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Programme Grade Remark',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.programmeGradeRemarkFacade.deleteProgrammeGradeRemark(row.id);
        this.toastService.openToast('Programme Grade Remark deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadProgrammeGradeRemarks();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
