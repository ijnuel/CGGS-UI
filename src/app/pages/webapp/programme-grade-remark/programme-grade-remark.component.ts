import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ProgrammeGradeRemarkFacade } from '../../../store/programme-grade-remark/programme-grade-remark.facade';
import {
  PaginatedResponseInterface,
  PageQueryInterface,
  ProgrammeGradeRemarkListInterface,
  ProgramTypeListInterface,
} from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';
import { GradeRemarkDialogComponent } from './grade-remark-dialog/grade-remark-dialog.component';
import { ProgramTypeFacade } from '../../../store/program-type/program-type.facade';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-programme-grade-remark',
  templateUrl: './programme-grade-remark.component.html',
  styleUrls: ['./programme-grade-remark.component.scss'],
})
export class ProgrammeGradeRemarkComponent implements OnInit, OnDestroy {
  programmeGradeRemarkList$: Observable<PaginatedResponseInterface<ProgrammeGradeRemarkListInterface[]> | null>;
  loading$: Observable<boolean>;
  programTypes$: Observable<ProgramTypeListInterface[] | null>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  filterForm: FormGroup<{
    programTypeId: FormControl<string | null>;
  }>;

  selectedProgramTypeId: string | null = null;
  pageQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };
  currentRemarks: ProgrammeGradeRemarkListInterface[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private programmeGradeRemarkFacade: ProgrammeGradeRemarkFacade,
    private programTypeFacade: ProgramTypeFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService,
    private fb: FormBuilder
  ) {
    this.programmeGradeRemarkList$ = this.programmeGradeRemarkFacade.programmeGradeRemarkList$;
    this.loading$ = this.programmeGradeRemarkFacade.loading$;
    this.programTypes$ = this.programTypeFacade.programTypeAll$;
    this.filterForm = this.fb.group({
      programTypeId: [''],
    });
  }

  ngOnInit() {
    this.programTypeFacade.getProgramTypeAll();

    this.programmeGradeRemarkList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.currentRemarks = response?.data ?? [];
      });

    this.programmeGradeRemarkFacade.deleteSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success)
      )
      .subscribe(() => {
        this.toastService.openToast('Programme grade remark deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadProgrammeGradeRemarks();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProgramTypeChange(programTypeId: string): void {
    this.selectedProgramTypeId = programTypeId || null;
    if (this.selectedProgramTypeId) {
      this.loadProgrammeGradeRemarks({
        start: 0,
        recordsPerPage: this.pageQuery.recordsPerPage,
        pageIndex: 0,
      });
    } else {
      this.currentRemarks = [];
    }
  }

  onPageChange(event: PageQueryInterface) {
    this.loadProgrammeGradeRemarks(event);
  }

  onRefresh(): void {
    if (!this.selectedProgramTypeId) {
      return;
    }
    this.loadProgrammeGradeRemarks({
      start: 0,
      pageIndex: 0,
      recordsPerPage: this.pageQuery.recordsPerPage,
    });
  }

  openGradeRemarkDialog(remark?: ProgrammeGradeRemarkListInterface): void {
    if (!this.selectedProgramTypeId) {
      return;
    }

    const dialogRef = this.dialog.open(GradeRemarkDialogComponent, {
      width: '480px',
      data: {
        programTypeId: this.selectedProgramTypeId,
        existingRemarks: this.currentRemarks,
        remark,
      },
    });

    dialogRef.afterClosed().subscribe((shouldReload) => {
      if (shouldReload) {
        this.loadProgrammeGradeRemarks();
      }
    });
  }

  onEdit(row: ProgrammeGradeRemarkListInterface) {
    this.openGradeRemarkDialog(row);
  }

  onDelete(row: ProgrammeGradeRemarkListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Grade Remark',
        message: `Are you sure you want to delete grade "${row.grade}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.programmeGradeRemarkFacade.deleteProgrammeGradeRemark(row.id);
      }
    });
  }

  private loadProgrammeGradeRemarks(overrides?: Partial<PageQueryInterface>): void {
    if (!this.selectedProgramTypeId) {
      return;
    }

    const merged: PageQueryInterface = {
      start: overrides?.start ?? this.pageQuery.start ?? 0,
      recordsPerPage: overrides?.recordsPerPage ?? this.pageQuery.recordsPerPage ?? 10,
      pageIndex: overrides?.pageIndex ?? this.pageQuery.pageIndex ?? 0,
      searchText: overrides?.searchText ?? this.pageQuery.searchText,
      queryProperties: [{ name: 'programTypeId', value: this.selectedProgramTypeId }],
    };

    this.pageQuery = merged;
    this.programmeGradeRemarkFacade.getProgrammeGradeRemarkList(merged);
  }
}
