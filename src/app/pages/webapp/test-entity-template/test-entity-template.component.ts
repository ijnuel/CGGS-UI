import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TestEntityTemplateFacade } from '../../../store/test-entity-template/test-entity-template.facade';
import { TestEntityTemplateListInterface } from '../../../types/test-entity-template';
import { PaginatedResponseInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-test-entity-template',
  templateUrl: './test-entity-template.component.html',
  styleUrls: ['./test-entity-template.component.scss'],
})
export class TestEntityTemplateComponent implements OnInit {
  testEntityTemplateList$: Observable<PaginatedResponseInterface<TestEntityTemplateListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testEntityTemplateFacade: TestEntityTemplateFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.testEntityTemplateList$ = this.testEntityTemplateFacade.testEntityTemplateList$;
    this.loading$ = this.testEntityTemplateFacade.loading$;
  }

  ngOnInit() {
    this.loadTestEntityTemplates();
  }

  loadTestEntityTemplates() {
    this.testEntityTemplateFacade.getTestEntityTemplateList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0
    });
  }

  onPageChange(event: PageQueryInterface) {
    this.testEntityTemplateFacade.getTestEntityTemplateList(event);
  }

  onSearch(searchText: string) {
    this.testEntityTemplateFacade.getTestEntityTemplateList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.testEntityTemplateFacade.getTestEntityTemplateList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      queryProperties: filters
    });
  }

  onRefresh() {
    this.loadTestEntityTemplates();
  }

  onView(row: TestEntityTemplateListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: TestEntityTemplateListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: TestEntityTemplateListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Test Entity Template',
        message: `Are you sure you want to delete "${row.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.testEntityTemplateFacade.deleteTestEntityTemplate(row.id);
        this.toastService.openToast('Test Entity Template deleted successfully', NotificationTypeEnums.SUCCESS);
        this.loadTestEntityTemplates();
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
