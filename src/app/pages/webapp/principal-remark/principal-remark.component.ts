import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { PrincipalRemarkFacade } from '../../../store/principal-remark/principal-remark.facade';
import { PrincipalRemarkListInterface } from '../../../types/principal-remark';
import { PaginatedResponseInterface, PageQueryInterface, ProgramTypeListInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';
import { PrincipalRemarkDialogComponent } from './principal-remark-dialog/principal-remark-dialog.component';
import { ProgramTypeFacade } from '../../../store/program-type/program-type.facade';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-principal-remark',
  templateUrl: './principal-remark.component.html',
  styleUrls: ['./principal-remark.component.scss'],
})
export class PrincipalRemarkComponent implements OnInit, OnDestroy {
  principalRemarkList$: Observable<PaginatedResponseInterface<PrincipalRemarkListInterface[]> | null>;
  loading$: Observable<boolean>;
  programTypes$: Observable<ProgramTypeListInterface[] | null>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  filterForm: FormGroup<{
    programTypeId: FormControl<string | null>;
  }>;

  selectedProgramTypeId: string | null = null;
  pageQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };
  currentRemarks: PrincipalRemarkListInterface[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private principalRemarkFacade: PrincipalRemarkFacade,
    private programTypeFacade: ProgramTypeFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService,
    private fb: FormBuilder
  ) {
    this.principalRemarkList$ = this.principalRemarkFacade.principalRemarkList$;
    this.loading$ = this.principalRemarkFacade.loading$;
    this.programTypes$ = this.programTypeFacade.programTypeAll$;
    this.filterForm = this.fb.group({
      programTypeId: [''],
    });
  }

  ngOnInit() {
    this.programTypeFacade.getProgramTypeAll();

    this.principalRemarkList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.currentRemarks = response?.data ?? [];
      });

    this.principalRemarkFacade.deleteSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success)
      )
      .subscribe(() => {
        this.toastService.openToast('Principal Remark deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadPrincipalRemarks();
      });

    this.principalRemarkFacade.createSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success)
      )
      .subscribe(() => {
        this.loadPrincipalRemarks();
      });

    this.principalRemarkFacade.updateSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success)
      )
      .subscribe(() => {
        this.loadPrincipalRemarks();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProgramTypeChange(programTypeId: string): void {
    this.selectedProgramTypeId = programTypeId || null;
    if (this.selectedProgramTypeId) {
      this.loadPrincipalRemarks({
        start: 0,
        recordsPerPage: this.pageQuery.recordsPerPage,
        pageIndex: 0,
      });
    } else {
      this.currentRemarks = [];
    }
  }

  loadPrincipalRemarks(overrides?: Partial<PageQueryInterface>) {
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
    this.principalRemarkFacade.getPrincipalRemarkList(merged);
  }

  onPageChange(event: PageQueryInterface) {
    this.loadPrincipalRemarks(event);
  }

  onSearch(searchText: string) {
    this.loadPrincipalRemarks({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText,
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.loadPrincipalRemarks({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters,
    });
  }

  onRefresh(): void {
    if (!this.selectedProgramTypeId) {
      return;
    }
    this.loadPrincipalRemarks({
      start: 0,
      pageIndex: 0,
      recordsPerPage: this.pageQuery.recordsPerPage,
    });
  }

  openPrincipalRemarkDialog(remark?: PrincipalRemarkListInterface): void {
    if (!this.selectedProgramTypeId) {
      return;
    }

    const dialogRef = this.dialog.open(PrincipalRemarkDialogComponent, {
      width: '480px',
      data: {
        programTypeId: this.selectedProgramTypeId,
        existingRemarks: this.currentRemarks,
        remark,
      },
    });

    dialogRef.afterClosed().subscribe((shouldReload) => {
      if (shouldReload) {
        this.loadPrincipalRemarks();
      }
    });
  }

  onEdit(row: PrincipalRemarkListInterface) {
    this.openPrincipalRemarkDialog(row);
  }

  onDelete(row: PrincipalRemarkListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Principal Remark',
        message: `Are you sure you want to delete the remark for score range ${row.minimumScore.toFixed(2)} - ${row.maximumScore.toFixed(2)}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.principalRemarkFacade.deletePrincipalRemark(row.id);
      }
    });
  }
}
