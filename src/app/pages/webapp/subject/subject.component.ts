import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SubjectFacade } from '../../../store/subject/subject.facade';
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
export class SubjectComponent implements OnInit {
  subjectList$: Observable<PaginatedResponseInterface<SubjectListInterface[]> | null>;
  subjectTypeList$: Observable<DropdownListInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  subjectTypeList: DropdownListInterface[] = [];
  subjectList: SubjectListInterface[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subjectFacade: SubjectFacade,
    private sharedFacade: SharedFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.subjectList$ = this.subjectFacade.subjectList$;
    this.subjectTypeList$ = this.sharedFacade.selectSubjectTypeList$;
    this.loading$ = this.subjectFacade.loading$;
  }

  ngOnInit() {
    this.sharedFacade.getSubjectTypeList();
    this.loadSubjects();
    
    this.subjectList$.subscribe(x => {
      this.subjectList = this.getTableData(x?.data ?? []);
      console.log('Subject List:', this.subjectList);
    });

    this.subjectTypeList$.subscribe(x => {
      this.subjectTypeList = x! ?? [];
      console.log('Subject Type List:', this.subjectTypeList);
      this.subjectList = this.getTableData(this.subjectList);
      console.log('Subject List:', this.subjectList);
    })
  }

  loadSubjects() {
    this.subjectFacade.getSubjectList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.subjectFacade.getSubjectList(event);
  }

  onSearch(searchText: string) {
    this.subjectFacade.getSubjectList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.subjectFacade.getSubjectList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadSubjects();
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
        this.toastService.openToast('Subject deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadSubjects();
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
