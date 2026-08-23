import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudentFacade } from '../../../../store/student/student.facade';

@Component({
  selector: 'app-student-bulk-import-dialog',
  templateUrl: './student-bulk-import-dialog.component.html',
})
export class StudentBulkImportDialogComponent {
  downloadLoading$: Observable<boolean>;
  importLoading$: Observable<boolean>;
  importSuccess$: Observable<boolean>;
  importCreated$: Observable<number>;
  importErrors$: Observable<string[]>;

  importFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<StudentBulkImportDialogComponent>,
    private studentFacade: StudentFacade,
  ) {
    this.downloadLoading$ = this.studentFacade.downloadLoading$;
    this.importLoading$ = this.studentFacade.importLoading$;
    this.importSuccess$ = this.studentFacade.importSuccess$;
    this.importCreated$ = this.studentFacade.importCreated$;
    this.importErrors$ = this.studentFacade.importErrors$;
  }

  downloadTemplate(): void {
    this.studentFacade.downloadStudentTemplate();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.importFile = input.files?.[0] ?? null;
  }

  uploadFile(): void {
    if (!this.importFile) return;
    this.studentFacade.importStudents(this.importFile);
  }

  close(): void {
    this.dialogRef.close();
  }
}
