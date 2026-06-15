import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { ClassFacade } from '../../../store/class/class.facade';
import { ClassLevelFacade } from '../../../store/class-level/class-level.facade';
import { StaffFacade } from '../../../store/staff/staff.facade';
import * as ClassAction from '../../../store/class/class.actions';
import { ClassListInterface } from '../../../types/class';
import { ClassLevelListInterface } from '../../../types/class-level';
import { StaffListInterface } from '../../../types/staff';
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
export class ClassComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  classList$: Observable<PaginatedResponseInterface<ClassListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classFacade: ClassFacade,
    private classLevelFacade: ClassLevelFacade,
    private staffFacade: StaffFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.loading$ = this.classFacade.loading$;
    // Backend's Class/GetAllPaginated currently returns classLevel: null and staff: null
    // even when nestedProperties is sent. Join the lookups in-memory so the table can
    // render Description (programme + level + name) and Form Teacher.
    this.classList$ = combineLatest([
      this.classFacade.classList$,
      this.classLevelFacade.classLevelAll$,
      this.staffFacade.staffAll$,
    ]).pipe(
      map(([list, levels, staff]) => {
        if (!list) return list;
        const levelMap = new Map<string, ClassLevelListInterface>(
          (levels ?? []).map(l => [l.id, l])
        );
        const staffMap = new Map<string, StaffListInterface>(
          (staff ?? []).map(s => [s.id, s])
        );
        return {
          ...list,
          data: list.data.map(row => ({
            ...row,
            classLevel: row.classLevel ?? (row.classLevelId ? levelMap.get(row.classLevelId) : undefined),
            staff: row.staff ?? (row.staffId ? staffMap.get(row.staffId) : undefined),
          })),
        };
      })
    );

    this.actions$.pipe(
      ofType(ClassAction.deleteClassSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Class deleted successfully', NotificationTypeEnums.SUCCESS);
      this.classFacade.getClassList(this.lastQuery);
    });
  }

  ngOnInit(): void {
    this.classLevelFacade.getClassLevelAll({
      nestedProperties: [{ name: 'programmeType' }],
    });
    this.staffFacade.getStaffAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private readonly nestedProperties = [
    { name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] },
    { name: 'staff' },
  ];

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = { ...query, nestedProperties: this.nestedProperties };
    this.classFacade.getClassList(this.lastQuery);
  }

  onRefresh() {
    this.classFacade.getClassList(this.lastQuery);
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
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
