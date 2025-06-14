import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgramTypeFacade } from '../../../store/program-type/program-type.facade';
import { ProgramTypeListInterface } from '../../../types/program-type';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';
import { ClassLevelFacade } from '../../../store/class-level/class-level.facade';

@Component({
  selector: 'app-program-type',
  templateUrl: './program-type.component.html',
  styleUrls: ['./program-type.component.scss'],
})
export class ProgramTypeComponent implements OnInit {
  programTypeList$: Observable<PaginatedResponseInterface<ProgramTypeListInterface[]> | null>;
  programTypeAll$: Observable<ProgramTypeListInterface[] | null>;
  sortedProgramTypes: ProgramTypeListInterface[] = [];
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private programTypeFacade: ProgramTypeFacade,
    private classLevelFacade: ClassLevelFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.programTypeList$ = this.programTypeFacade.programTypeList$;
    this.programTypeAll$ = this.programTypeFacade.programTypeAll$;
    this.loading$ = this.programTypeFacade.loading$;
  }

  ngOnInit() {
    this.loadProgramTypes();
    this.programTypeAll$.subscribe(data => {
      if (data) {
        this.sortedProgramTypes = [...data].sort((a, b) => a.level - b.level);
      }
    });
  }

  loadProgramTypes() {
    this.programTypeFacade.getProgramTypeAll();
    this.programTypeFacade.getProgramTypeList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.programTypeFacade.getProgramTypeAll();
    this.programTypeFacade.getProgramTypeList(event);
  }

  onSearch(searchText: string) {
    this.programTypeFacade.getProgramTypeList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.programTypeFacade.getProgramTypeList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadProgramTypes();
  }

  onView(row: ProgramTypeListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: ProgramTypeListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: ProgramTypeListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Program Type',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.programTypeFacade.deleteProgramType(row.id);
        this.toastService.openToast('Program Type deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadProgramTypes();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onProgramTypeOpened(programTypeId: string) {
    // this.classLevelFacade.getClassAll();
    throw new Error('Method not implemented.');
  }

}
