import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, first, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SessionFacade } from '../../../../store/session/session.facade';
import { StudentClassFacade } from '../../../../store/student-class/student-class.facade';
import { StudentFacade } from '../../../../store/student/student.facade';
import { ProgrammeTypeStreamFacade } from '../../../../store/programme-type-stream/programme-type-stream.facade';
import {
  SessionListInterface, StudentClassListInterface, StudentListInterface,
  PaginatedResponseInterface, PageQueryInterface, ClassListInterface,
  ProgrammeTypeStreamListInterface,
} from '../../../../types';
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

  tableHeaderData: TableHeaderInterface[] = [
    { name: 'Student No', key: 'studentNo', nestedKey: 'student.studentNo', sortable: true, filterable: true, type: 'text', align: 'left' },
    { name: 'First Name', key: 'firstName', nestedKey: 'student.firstName', sortable: true, filterable: true, type: 'text', align: 'left' },
    { name: 'Last Name', key: 'lastName', nestedKey: 'student.lastName', sortable: true, filterable: true, type: 'text', align: 'left' },
    { name: 'Email', key: 'email', nestedKey: 'student.email', sortable: true, filterable: true, type: 'text', align: 'left' },
  ];

  selectedSessionId: string = '';
  selectedClassId: string = '';
  showAddStudentDialog = false;

  currentClass: ClassListInterface | null = null;
  allStreams: ProgrammeTypeStreamListInterface[] = [];
  availableStreams: ProgrammeTypeStreamListInterface[] = [];

  pageQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  sessionForm: FormGroup<{ sessionId: FormControl<string | null> }>;
  studentForm: FormGroup<{ studentId: FormControl<string | null>; streamId: FormControl<string | null> }>;

  getStudentLabelFn = (s: StudentListInterface): string =>
    [s.firstName, s.middleName, s.lastName].filter(Boolean).join(' ') || s.studentNo || s.id;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private classFacade: ClassFacade,
    private sessionFacade: SessionFacade,
    private studentClassFacade: StudentClassFacade,
    private studentFacade: StudentFacade,
    private programmeTypeStreamFacade: ProgrammeTypeStreamFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService,
    private location: Location,
  ) {
    this.class$ = this.classFacade.classAll$.pipe(map(classes => classes?.[0] ?? null));
    this.sessions$ = this.sessionFacade.sessionAll$;
    this.studentClassList$ = this.studentClassFacade.studentClassList$;
    this.allStudents$ = this.studentFacade.studentsWithoutClass$;
    this.loading$ = this.studentClassFacade.loading$;
    this.studentClassLoading$ = this.studentClassFacade.loading$;

    this.sessionForm = this.fb.group({ sessionId: [''] });
    this.studentForm = this.fb.group({
      studentId: ['', Validators.required],
      streamId: [null as string | null],
    });
  }

  ngOnInit() {
    const classId = this.route.snapshot.params['id'];
    if (classId) {
      this.selectedClassId = classId;
      this.classFacade.getClassAll({
        queryProperties: [{ name: 'id', value: classId }],
        nestedProperties: [{ name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }]
      });
    }

    this.sessionFacade.getSessionAll();
    this.programmeTypeStreamFacade.getProgrammeTypeStreamAll();

    this.class$.pipe(takeUntil(this.destroy$)).subscribe(cls => {
      this.currentClass = cls;
      this.refreshAvailableStreams();
    });

    this.programmeTypeStreamFacade.programmeTypeStreamAll$.pipe(takeUntil(this.destroy$)).subscribe(streams => {
      this.allStreams = streams ?? [];
      this.refreshAvailableStreams();
    });

    this.sessions$.pipe(takeUntil(this.destroy$)).subscribe(sessions => {
      if (sessions) {
        const currentSession = sessions.find(s => s.isCurrent);
        if (currentSession && !this.selectedSessionId) {
          this.sessionForm.patchValue({ sessionId: currentSession.id });
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

  get sessionFormControl() { return this.sessionForm.controls; }
  get studentFormControl() { return this.studentForm.controls; }

  private refreshAvailableStreams() {
    const programTypeId = this.currentClass?.classLevel?.programmeTypeId;
    this.availableStreams = programTypeId
      ? this.allStreams.filter(s => s.programTypeId === programTypeId)
      : [];

    if (this.availableStreams.length > 0) {
      this.studentForm.controls.streamId.setValidators(Validators.required);
    } else {
      this.studentForm.controls.streamId.clearValidators();
      this.studentForm.controls.streamId.setValue(null, { emitEvent: false });
    }
    this.studentForm.controls.streamId.updateValueAndValidity({ emitEvent: false });
  }

  onSessionChange(sessionId: string) {
    this.selectedSessionId = sessionId;
    this.loadStudentsInClass();
  }

  loadStudentsInClass() {
    if (this.selectedSessionId) {
      this.studentClassFacade.getStudentClassList({
        ...this.pageQuery,
        nestedProperties: [{ name: 'student' }],
        queryProperties: [
          { name: 'sessionId', value: this.selectedSessionId },
          { name: 'classId', value: this.selectedClassId },
        ]
      });
    }
  }

  onQueryChange(query: PageQueryInterface) {
    this.pageQuery = {
      ...query,
      nestedProperties: [{ name: 'student' }],
      queryProperties: [
        { name: 'sessionId', value: this.selectedSessionId },
        { name: 'classId', value: this.selectedClassId },
        ...(query.queryProperties ?? []).filter(p => p.name !== 'sessionId' && p.name !== 'classId'),
      ],
    };
    this.studentClassFacade.getStudentClassList(this.pageQuery);
  }

  onRefresh() { this.loadStudentsInClass(); }
  onView(_row: StudentClassListInterface) {}
  onEdit(_row: StudentClassListInterface) {}

  onDelete(row: StudentClassListInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove Student from Class',
        message: 'Are you sure you want to remove this student from the class?',
        confirmText: 'Remove',
        cancelText: 'Cancel',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && row.id) {
        this.studentClassFacade.deleteStudentClass(row.id);
        this.studentClassFacade.deleteSuccess$.pipe(
          filter(s => s === true), first(), takeUntil(this.destroy$)
        ).subscribe(() => {
          this.toastService.openToast('Student removed from class successfully', NotificationTypeEnums.SUCCESS);
          this.loadStudentsInClass();
        });
      }
    });
  }

  showAddStudent() {
    this.showAddStudentDialog = true;
    this.studentForm.reset();
    this.studentFacade.getStudentsWithoutClass(this.selectedSessionId);
  }

  hideAddStudent() {
    this.showAddStudentDialog = false;
    this.studentForm.reset();
  }

  addStudentToClass() {
    this.studentForm.markAllAsTouched();
    if (!this.studentForm.valid) return;

    const { studentId, streamId } = this.studentForm.getRawValue();
    if (!studentId || !this.selectedSessionId || !this.selectedClassId) return;

    this.studentClassFacade.createStudentClass({
      studentId,
      sessionId: this.selectedSessionId,
      classId: this.selectedClassId,
      streamId: streamId ?? undefined,
    });

    this.studentClassFacade.createSuccess$.pipe(
      filter(s => s === true), first(), takeUntil(this.destroy$)
    ).subscribe(() => {
      this.toastService.openToast('Student added to class successfully', NotificationTypeEnums.SUCCESS);
      this.hideAddStudent();
      this.loadStudentsInClass();
    });
  }

  goBack(): void { this.location.back(); }
}
