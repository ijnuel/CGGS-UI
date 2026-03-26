import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { SubjectFacade } from '../../../store/subject/subject.facade';
import * as SubjectAction from '../../../store/subject/subject.actions';
import { SubjectListInterface } from '../../../types/subject';
import { DropdownListInterface, PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';
import { SharedFacade } from '../../../store/shared/shared.facade';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  subjectList$: Observable<PaginatedResponseInterface<SubjectListInterface[]> | null>;
  subjectTypeList$: Observable<DropdownListInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  subjectTypeList: DropdownListInterface[] = [];
  subjectList: SubjectListInterface[] = [];
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subjectFacade: SubjectFacade,
    private sharedFacade: SharedFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.subjectList$ = this.subjectFacade.subjectList$;
    this.subjectTypeList$ = this.sharedFacade.selectSubjectTypeList$;
    this.loading$ = this.subjectFacade.loading$;

    this.actions$.pipe(
      ofType(SubjectAction.deleteSubjectSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Subject deleted successfully', NotificationTypeEnums.SUCCESS);
      this.subjectFacade.getSubjectList(this.lastQuery);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.sharedFacade.getSubjectTypeList();

    this.subjectList$.subscribe(x => {
      this.subjectList = this.getTableData(x?.data ?? []);
    });

    this.subjectTypeList$.subscribe(x => {
      this.subjectTypeList = x ?? [];
      this.subjectList = this.getTableData(this.subjectList);
    });
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.subjectFacade.getSubjectList(query);
  }

  onRefresh() {
    this.subjectFacade.getSubjectList(this.lastQuery);
  }

  onView(row: SubjectListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: SubjectListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: SubjectListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Subject',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectFacade.deleteSubject(row.id);
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  
    getTableData(data: SubjectListInterface[]) : SubjectListInterface[] {
      return data.map(config => {
        return {
          ...config,
          subjectType: this.subjectTypeList.find(x => x.value == config.subjectType)?.description
        }
      }) as SubjectListInterface[];
    }
}
