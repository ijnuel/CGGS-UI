import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SchoolConfigurationFacade } from '../../../store/school-configuration/school-configuration.facade';
import { SchoolConfigurationListInterface } from '../../../types/school-configuration';
import { PaginatedResponseInterface, SessionListInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';
import { SessionFacade } from '../../../store/session/session.facade';

@Component({
  selector: 'app-school-configuration',
  templateUrl: './school-configuration.component.html',
  styleUrls: ['./school-configuration.component.scss'],
})
export class SchoolConfigurationComponent implements OnInit {
  schoolConfigurationList$: Observable<PaginatedResponseInterface<SchoolConfigurationListInterface[]> | null>;
  sessionList$: Observable<SessionListInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  sessionList: SessionListInterface[] = [];
  schoolConfigurationList: SchoolConfigurationListInterface[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private schoolConfigurationFacade: SchoolConfigurationFacade,
    private sessionFacade: SessionFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.sessionList$ = this.sessionFacade.sessionAll$;
    this.schoolConfigurationList$ = this.schoolConfigurationFacade.schoolConfigurationList$;
    this.loading$ = this.schoolConfigurationFacade.loading$;
  }

  ngOnInit() {
    this.sessionFacade.getSessionAll();
    this.loadSchoolConfigurations();

    this.sessionList$.subscribe(x => {
      this.sessionList = x ?? [];
      this.schoolConfigurationList = this.getTableData(this.schoolConfigurationList ?? []);
    });

    this.schoolConfigurationList$.subscribe(x => {
      this.schoolConfigurationList = this.getTableData(x?.data ?? []);
    })
  }

  loadSchoolConfigurations() {
    this.schoolConfigurationFacade.getSchoolConfigurationList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.schoolConfigurationFacade.getSchoolConfigurationList(event);
  }

  onSearch(searchText: string) {
    this.schoolConfigurationFacade.getSchoolConfigurationList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.schoolConfigurationFacade.getSchoolConfigurationList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadSchoolConfigurations();
  }

  onView(row: SchoolConfigurationListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: SchoolConfigurationListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: SchoolConfigurationListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete School Configuration',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.schoolConfigurationFacade.deleteSchoolConfiguration(row.id);
        this.toastService.openToast('School Configuration deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadSchoolConfigurations();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getTableData(data: SchoolConfigurationListInterface[]) : SchoolConfigurationListInterface[] {
    return data.map(config => {
      return {
        ...config,
        session: this.sessionList.find(x => x.id == config.sessionId)?.name
      }
    }) as SchoolConfigurationListInterface[];
  }
}
