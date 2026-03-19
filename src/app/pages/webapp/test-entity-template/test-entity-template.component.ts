import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TestEntityTemplateFacade } from '../../../store/test-entity-template/test-entity-template.facade';
import { TestEntityTemplateListInterface } from '../../../types/test-entity-template';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
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
export class TestEntityTemplateComponent {
  testEntityTemplateList$: Observable<PaginatedResponseInterface<TestEntityTemplateListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

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

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.testEntityTemplateFacade.getTestEntityTemplateList(query);
  }

  onRefresh() {
    this.testEntityTemplateFacade.getTestEntityTemplateList(this.lastQuery);
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
        message: `Are you sure you want to delete "${row.testName}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.testEntityTemplateFacade.deleteTestEntityTemplate(row.id);
        this.toastService.openToast('Test Entity Template deleted successfully', NotificationTypeEnums.SUCCESS);
        this.testEntityTemplateFacade.getTestEntityTemplateList(this.lastQuery);
      }
    });
  }
}
