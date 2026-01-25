import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, first, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SessionFacade } from '../../../../store/session/session.facade';
import { StudentClassFacade } from '../../../../store/student-class/student-class.facade';
import { StudentFacade } from '../../../../store/student/student.facade';
import { SessionListInterface, StudentClassListInterface, StudentListInterface, PaginatedResponseInterface, PageQueryInterface, ClassListInterface } from '../../../../types';
import { TableHeaderInterface } from '../../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.scss'],
})
export class ViewClassComponent implements OnInit, OnDestroy {
  class$: Observable<ClassListInterface | null>;
  sessions$: Observable<SessionListInterface[] | null>;
  studentClassList$: Observable<PaginatedResponseInterface<StudentClassListInterface[]> | null>;
  allStudents$: Observable<StudentListInterface[] | null>;
  loading$: Observable<boolean>;
  studentClassLoading$: Observable<boolean>;
  
  // Table configuration
  tableHeaderData: TableHeaderInterface[] = [
    {
      name: 'Student No',
      key: 'studentNo',
      filterable: true,
      type: 'text',
      align: 'left'
    },
    {
      name: 'Name',
      key: 'studentFullName',
      filterable: true,
      type: 'text',
      align: 'left'
    }
  ];

  // Component state
  selectedSessionId: string = '';
  selectedClassId: string = '';
  showAddStudentDialog = false;
  selectedStudentId: string = '';
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0
  };

  // Forms
  sessionForm: FormGroup<{
    sessionId: FormControl<string | null>;
  }>;
  studentForm: FormGroup<{
    studentId: FormControl<string | null>;
  }>;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private classFacade: ClassFacade,
    private sessionFacade: SessionFacade,
    private studentClassFacade: StudentClassFacade,
    private studentFacade: StudentFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.class$ = this.classFacade.classById$;
    this.sessions$ = this.sessionFacade.sessionAll$;
    this.studentClassList$ = this.studentClassFacade.studentClassList$;
    this.allStudents$ = this.studentFacade.studentsWithoutClass$;
    this.loading$ = this.studentClassFacade.loading$;
    this.studentClassLoading$ = this.studentClassFacade.loading$;

    // Initialize forms
    this.sessionForm = this.fb.group({
      sessionId: ['']
    });

    this.studentForm = this.fb.group({
      studentId: ['']
    });
  }

  ngOnInit() {
    const classId = this.route.snapshot.params['id'];
    if (classId) {
      this.selectedClassId = classId;
      this.classFacade.getClassById(classId);
    }

    // Load sessions
    this.sessionFacade.getSessionAll();

    this.sessions$.pipe(takeUntil(this.destroy$)).subscribe((sessions) => {
      if (sessions) {
        const currentSession = sessions.find(session => session.isCurrent);
        if (currentSession) {
          this.sessionForm.patchValue({
            sessionId: currentSession.id
          });
          this.selectedSessionId = currentSession.id;
          this.loadStudentsInClass();
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Form control getters
  get sessionFormControl() {
    return this.sessionForm.controls;
  }

  get studentFormControl() {
    return this.studentForm.controls;
  }

  onSessionChange(sessionId: string) {
    this.selectedSessionId = sessionId;
    this.loadStudentsInClass();
  }

  loadStudentsInClass() {
    if (this.selectedSessionId) {
      this.studentClassFacade.getStudentClassList({
        ...this.pageQuery,
        queryProperties: [
          { name: 'sessionId', value: this.selectedSessionId },
          { name: 'classId', value: this.selectedClassId }
        ]
      });
    }
  }

  onPageChange(event: PageQueryInterface) {
    this.pageQuery = event;
    this.loadStudentsInClass();
  }

  onSearch(searchText: string) {
    this.pageQuery = {
      ...this.pageQuery,
      searchText,
      pageIndex: 0
    };
    this.loadStudentsInClass();
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.pageQuery = {
      ...this.pageQuery,
      queryProperties: [
        { name: 'sessionId', value: this.selectedSessionId },
        { name: 'classId', value: this.selectedClassId },
        ...filters
      ],
      pageIndex: 0
    };
    this.loadStudentsInClass();
  }

  onRefresh() {
    this.loadStudentsInClass();
  }

  onView(row: StudentClassListInterface) {
    // Navigate to student view if needed
    console.log('View student:', row);
  }

  onEdit(row: StudentClassListInterface) {
    // Navigate to student edit if needed
    console.log('Edit student:', row);
  }

  onDelete(row: StudentClassListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove Student from Class',
        message: `Are you sure you want to remove this student from the class?`,
        confirmText: 'Remove',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && row.id) {
        this.studentClassFacade.deleteStudentClass(row.id);
        
        // Subscribe to success - only handle the first success event
        this.studentClassFacade.deleteSuccess$
          .pipe(
            filter(success => success === true),
            first(),
            takeUntil(this.destroy$)
          )
          .subscribe(() => {
            this.toastService.openToast('Student removed from class successfully', NotificationTypeEnums.SUCCESS);
            this.loadStudentsInClass();
          });
      }
    });
  }

  showAddStudent() {
    this.showAddStudentDialog = true;
    // Load all students to show in dropdown
    this.studentFacade.getStudentsWithoutClass(this.selectedSessionId);
  }

  hideAddStudent() {
    this.showAddStudentDialog = false;
    this.selectedStudentId = '';
  }

  onStudentSelect(studentId: string) {
    this.selectedStudentId = studentId;
  }

  addStudentToClass() {
    if (this.selectedStudentId && this.selectedSessionId && this.selectedClassId) {
      const payload = {
        studentId: this.selectedStudentId,
        sessionId: this.selectedSessionId,
        classId: this.selectedClassId
      };

      this.studentClassFacade.createStudentClass(payload);
      
      // Subscribe to success
      this.studentClassFacade.createSuccess$
        .pipe(takeUntil(this.destroy$))
        .subscribe(success => {
          if (success) {
            this.toastService.openToast('Student added to class successfully', NotificationTypeEnums.SUCCESS);
            // Reset the form
            this.studentForm.reset();
            this.selectedStudentId = '';
            this.hideAddStudent();
            this.loadStudentsInClass();
          }
        });
    }
  }
} 