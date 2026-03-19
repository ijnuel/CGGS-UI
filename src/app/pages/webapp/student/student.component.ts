import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentFacade } from '../../../store/student/student.facade';
import { StudentListInterface } from '../../../types/student';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { tableHeader } from './table-header';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  studentList$: Observable<PaginatedResponseInterface<StudentListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentFacade: StudentFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.studentList$ = this.studentFacade.studentList$;
    this.loading$ = this.studentFacade.loading$;
  }

  onQueryChange(query: PageQueryInterface) {
    this.studentFacade.getStudentList(query);
  }

  onView(row: StudentListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: StudentListInterface) {
    this.router.navigate(['edit', row.id], { relativeTo: this.route });
  }

  onDelete(row: StudentListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Student',
        message: `Are you sure you want to delete "${row.firstName} ${row.lastName}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentFacade.deleteStudent(row.id);
        this.toastService.openToast('Student deleted successfully', NotificationTypeEnums.SUCCESS);
      }
    });
  }
}
