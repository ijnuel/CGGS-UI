import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ProgramTypeFacade } from '../../../store/program-type/program-type.facade';
import { ProgramTypeListInterface } from '../../../types/program-type';
import { ClassFormInterface, ClassLevelFormInterface, ClassLevelListInterface, ClassListInterface, ClassSubjectAssessmentFormInterface, ClassSubjectAssessmentListInterface, ClassSubjectFormInterface, ClassSubjectListInterface, DropdownListInterface, PaginatedResponseInterface, ProgramSetupLevelConfig, QueryInterface, SchoolTermSessionListInterface, SessionListInterface, StaffListInterface, SubjectListInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ProgramSetupFormDialogComponent, ProgramSetupFormDialogData } from './program-setup-form-dialog/program-setup-form-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { assessmentTypeTableHeader, tableHeader } from './table-header';
import { ClassLevelFacade } from '../../../store/class-level/class-level.facade';
import { ClassFacade } from '../../../store/class/class.facade';
import { ClassSubjectFacade } from '../../../store/class-subject/class-subject.facade';
import { ClassSubjectAssessmentFacade } from '../../../store/class-subject-assessment/class-subject-assessment.facade';
import { SubjectFacade } from '../../../store/subject/subject.facade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgramSetupLevel } from '../../../types';
import { SchoolTermSessionFacade } from '../../../store/school-term-session/school-term-session.facade';
import { SessionFacade } from '../../../store/session/session.facade';
import { SharedFacade } from '../../../store/shared/shared.facade';
import { StaffFacade } from '../../../store/staff/staff.facade';

@Component({
  selector: 'app-program-type',
  templateUrl: './program-type.component.html',
  styleUrls: ['./program-type.component.scss'],
})
export class ProgramTypeComponent implements OnInit {

  schoolTermSessionId: string = "";

  ProgramSetupLevel = ProgramSetupLevel;
  programTypeList$: Observable<PaginatedResponseInterface<ProgramTypeListInterface[]> | null>;
  programTypeAll$: Observable<ProgramTypeListInterface[] | null>;
  classLevelAll$: Observable<ClassLevelListInterface[] | null>;
  classAll$: Observable<ClassListInterface[] | null>;
  classSubjectAll$: Observable<ClassSubjectListInterface[] | null>;
  classSubjectAssessmentAll$: Observable<ClassSubjectAssessmentListInterface[] | null>;
  subjectAll$: Observable<SubjectListInterface[] | null>;
  subjectTypeAll$: Observable<DropdownListInterface[] | null>;
  schoolTermSessionAll$: Observable<SchoolTermSessionListInterface[] | null>;
  sessionAll$: Observable<SessionListInterface[] | null>;
  staffAll$: Observable<StaffListInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  assessmentTypeTableHeaderData: TableHeaderInterface[] = assessmentTypeTableHeader;

  // Legacy accordion state (kept for backward compat with submit methods)
  addFormVisibleFor: string | null = null;
  visibleFormIsEdit: boolean = false;
  schoolTermSessionControl = new FormControl("");

  // Drill-down navigation state
  currentLevel: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE;
  selectedProgramType: ProgramTypeListInterface | null = null;
  selectedClassLevel: ClassLevelListInterface | null = null;
  selectedClassArm: ClassListInterface | null = null;
  selectedClassSubject: ClassSubjectListInterface | null = null;

  // Subject search
  groupedCurrentSubjects: { type: string; items: ClassSubjectListInterface[] }[] = [];
  private _subjectSearchText = '';
  get subjectSearchText(): string { return this._subjectSearchText; }
  set subjectSearchText(value: string) {
    this._subjectSearchText = value;
    this.updateGroupedSubjects();
  }
  addClassLevelForm: FormGroup<{
    id: FormControl;
    level: FormControl;
  }>;
  addClassArmForm: FormGroup<{
    id: FormControl;
    name: FormControl;
    staffId: FormControl;
  }>;
  addClassSubjectForm: FormGroup<{
    id: FormControl;
    subjectId: FormControl;
    staffId: FormControl;
  }>;
  addClassSubjectAssessmentForm: FormGroup<{
    id: FormControl;
    assessmentType: FormControl;
    scoreWeigth: FormControl;
  }>;


  programTypeAllSnapShot: ProgramTypeListInterface[] = [];
  classLevelAllSnapShot: ClassLevelListInterface[] = [];
  classAllSnapShot: ClassListInterface[] = [];
  classSubjectAllSnapShot: ClassSubjectListInterface[] = [];
  classSubjectAssessmentAllSnapShot: ClassSubjectAssessmentListInterface[] = [];
  subjectAllSnapShot: DropdownListInterface[] = [];
  subjectTypeSnapShot: DropdownListInterface[] = [];
  staffAllSnapShot: StaffListInterface[] = [];
  schoolTermSessionAllSnapShot: SchoolTermSessionListInterface[] = [];
  sessionAllSnapShot: SessionListInterface[] = [];
  programTypeConfig!: ProgramSetupLevelConfig;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private programTypeFacade: ProgramTypeFacade,
    private classLevelFacade: ClassLevelFacade,
    private classFacade: ClassFacade,
    private classSubjectFacade: ClassSubjectFacade,
    private classSubjectAssessmentFacade: ClassSubjectAssessmentFacade,
    private subjectFacade: SubjectFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private sharedFacade: SharedFacade,
    private sessionFacade: SessionFacade,
    private staffFacade: StaffFacade,
    private dialog: MatDialog,
    private toastService: ToastNotificationService
  ) {
    this.programTypeList$ = this.programTypeFacade.programTypeList$;
    this.programTypeAll$ = this.programTypeFacade.programTypeAll$;
    this.classLevelAll$ = this.classLevelFacade.classLevelAll$;
    this.classAll$ = this.classFacade.classAll$;
    this.classSubjectAll$ = this.classSubjectFacade.classSubjectAll$;
    this.classSubjectAssessmentAll$ = this.classSubjectAssessmentFacade.classSubjectAssessmentAll$;
    this.subjectAll$ = this.subjectFacade.subjectAll$;
    this.subjectTypeAll$ = this.sharedFacade.selectSubjectTypeList$;
    this.schoolTermSessionAll$ = this.schoolTermSessionFacade.schoolTermSessionAll$;
    this.sessionAll$ = this.sessionFacade.sessionAll$;
    this.staffAll$ = this.staffFacade.staffAll$;
    this.loading$ = this.programTypeFacade.loading$;

    this.addClassLevelForm = this.fb.group({
      id: [''],
      level: [null, [Validators.required, Validators.min(1)]]
    });
    this.addClassArmForm = this.fb.group({
      id: [''],
      staffId: [null],
      name: ['', [Validators.required, Validators.maxLength(255)]],
    });
    this.addClassSubjectForm = this.fb.group({
      id: [''],
      staffId: [null],
      subjectId: ['', [Validators.required, Validators.maxLength(255)]],
    });
    this.addClassSubjectAssessmentForm = this.fb.group({
      id: [''],
      assessmentType: ['', [Validators.required, Validators.maxLength(255)]],
      scoreWeigth: [null, [Validators.required, Validators.min(1)]]
    });
  }

  showAddForm(propertyId: string, visibleFormIsEdit: boolean = false) {
    console.log(visibleFormIsEdit)
    this.addFormVisibleFor = propertyId;
    this.visibleFormIsEdit = visibleFormIsEdit;
  }

  hideAddForm() {
    this.addFormVisibleFor = null;
    this.visibleFormIsEdit = false;
    this.resetForms();
  }

  resetForms() {
    this.addClassLevelForm.reset();
    this.addClassArmForm.reset();
    this.addClassSubjectForm.reset();
    this.addClassSubjectAssessmentForm.reset();
  }


  ngOnInit() {
    this.loadProgramTypes();

    this.getSnapShots();

    this.createSuccessActions();

    this.programTypeConfig = this.buildProgramTypeConfig();

    this.restoreFromQueryParams();
  }

  private createSuccessActions() {
    // Class Level
    this.classLevelFacade.createSuccess$.subscribe(ok => { if (ok) this.classLevelFacade.getClassLevelAll(); });
    this.classLevelFacade.updateSuccess$.subscribe(ok => { if (ok) this.classLevelFacade.getClassLevelAll(); });
    this.classLevelFacade.deleteSuccess$.subscribe(ok => { if (ok) this.classLevelFacade.getClassLevelAll(); });

    // Class (arm)
    this.classFacade.createSuccess$.subscribe(ok => { if (ok) this.classFacade.getClassAll(this.getClassQueryParameters()); });
    this.classFacade.updateSuccess$.subscribe(ok => { if (ok) this.classFacade.getClassAll(this.getClassQueryParameters()); });
    this.classFacade.deleteSuccess$.subscribe(ok => { if (ok) this.classFacade.getClassAll(this.getClassQueryParameters()); });

    // Class Subject
    this.classSubjectFacade.createSuccess$.subscribe(ok => { if (ok) this.classSubjectFacade.getClassSubjectAll(this.getClassSubjectQueryParameters()); });
    this.classSubjectFacade.updateSuccess$.subscribe(ok => { if (ok) this.classSubjectFacade.getClassSubjectAll(this.getClassSubjectQueryParameters()); });
    this.classSubjectFacade.deleteSuccess$.subscribe(ok => { if (ok) this.classSubjectFacade.getClassSubjectAll(this.getClassSubjectQueryParameters()); });

    // Assessment
    this.classSubjectAssessmentFacade.createSuccess$.subscribe(ok => { if (ok) this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll(); });
    this.classSubjectAssessmentFacade.updateSuccess$.subscribe(ok => { if (ok) this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll(); });
    this.classSubjectAssessmentFacade.deleteSuccess$.subscribe(ok => { if (ok) this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll(); });
  }

  private getSnapShots() {
    this.programTypeAll$.subscribe(data => {
      if (data) {
        this.programTypeAllSnapShot = [...data].sort((a, b) => a.level - b.level);
      }
    });

    this.schoolTermSessionAll$.subscribe(data => {
      if (data) {
        this.schoolTermSessionAllSnapShot = [...data];
        if (this.schoolTermSessionId === "") {
          this.setSessionTermControls(this.schoolTermSessionAllSnapShot.find(x => x.isCurrent)?.id || this.schoolTermSessionAllSnapShot.find(x => x)?.id!);
        }
      }
    });

    this.sessionAll$.subscribe(data => {
      if (data) {
        this.sessionAllSnapShot = [...data];
      }
    });

    this.staffAll$.subscribe(data => {
      if (data) {
        this.staffAllSnapShot = [...data];
      }
    });

    this.subjectAll$.subscribe(data => {
      if (data) {
        this.subjectAllSnapShot = [...data].sort((a, b) => a.name!.localeCompare(b.name!)).map(x => { return { name: x.name!, description: x.subjectType, value: x.id } as DropdownListInterface; });
      }
    });

    this.subjectTypeAll$.subscribe(data => {
      if (data) {
        this.subjectTypeSnapShot = [...data] as DropdownListInterface[];
      }
    });

    this.classLevelAll$.subscribe(data => {
      if (data) {
        this.classLevelAllSnapShot = [...data].sort((a, b) => a.level - b.level);
      }
    });

    this.classAll$.subscribe(data => {
      if (data) {
        this.classAllSnapShot = [...data].sort((a, b) => a.name!.localeCompare(b.name!));
      }
    });

    this.classSubjectAll$.subscribe(data => {
      if (data) {
        this.classSubjectAllSnapShot = [...data];
        this.updateGroupedSubjects();
      }
    });

    this.classSubjectAssessmentAll$.subscribe(data => {
      if (data) {
        this.classSubjectAssessmentAllSnapShot = [...data].sort((a, b) => a.scoreWeigth - b.scoreWeigth);
      }
    });
  }
  setSessionTermControls(sessionTermId: string) {
    this.schoolTermSessionId = sessionTermId;
    this.schoolTermSessionControl.setValue(sessionTermId);
    // Eagerly load session-dependent levels for accurate counts
    this.classSubjectFacade.getClassSubjectAll(this.getClassSubjectQueryParameters());
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
  }

  loadProgramTypes(programSetupLevel: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE) {

    if (programSetupLevel == ProgramSetupLevel.PROGRAMTYPE) {
      this.programTypeFacade.getProgramTypeAll();
      this.subjectFacade.getSubjectAll();
      this.schoolTermSessionFacade.getSchoolTermSessionAll({ nestedProperties: [{ name: 'session' }] });
      this.sharedFacade.getSubjectTypeList();
      this.sessionFacade.getSessionAll();
      this.staffFacade.getStaffAll();
      // Eagerly load session-independent levels for accurate counts
      this.classLevelFacade.getClassLevelAll();
      this.classFacade.getClassAll(this.getClassQueryParameters());
    }
    if (programSetupLevel == ProgramSetupLevel.CLASSLEVEL) {
      this.classLevelFacade.getClassLevelAll();
    }
    if (programSetupLevel == ProgramSetupLevel.CLASSARM) {
      this.classFacade.getClassAll(this.getClassQueryParameters());
    }
    if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECT) {
      this.classSubjectFacade.getClassSubjectAll(this.getClassSubjectQueryParameters());
    }
    if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECTASSESSMENT) {
      this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
    }
  }

  getClassSubjectQueryParameters(): QueryInterface {
    return {
      nestedProperties: [
        {name: "subject"},
        {name: "staff", innerNestedProperties: [{ name: "nationAlity" }]},
      ],
      queryProperties: [{ name: 'schoolTermSessionId', value: this.schoolTermSessionId }]
    };
  }

  getClassQueryParameters(): QueryInterface {
    return {
      nestedProperties: [
        { name: 'classLevel', innerNestedProperties: [{ name: 'programmeType' }] }
      ]
    };
  }

  getClassName(item: ClassListInterface): string {
    const programmeType = item?.classLevel?.programmeType?.name ?? '';
    const level = item?.classLevel?.level ?? '';
    const name = item?.name ?? '';
    return [programmeType, level, name].filter(Boolean).join(' ');
  }

  onSearch(searchText: string) {
    this.programTypeFacade.getProgramTypeList({
      start: 0,
      recordsPerPage: 10,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.programTypeFacade.getProgramTypeList({
      start: 0,
      recordsPerPage: 10,
      queryProperties: filters
    });
  }

  onRefresh(programSetupLevel: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE) {
    this.loadProgramTypes(programSetupLevel);
  }

  onView(row: ProgramTypeListInterface) {
    this.router.navigate(['view', row.id], { relativeTo: this.route });
  }

  onEdit(row: any, programSetupLevel: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE) {
    if (programSetupLevel == ProgramSetupLevel.PROGRAMTYPE) {
      row = row as ProgramTypeListInterface;
      this.router.navigate(['edit', row.id], { relativeTo: this.route });
    }
    else {
      let propertyId = '';
      if (programSetupLevel == ProgramSetupLevel.CLASSLEVEL) {
        let item = row as ClassLevelListInterface;
        this.addClassLevelForm.patchValue({
          id: item.id,
          level: item.level
        });
        propertyId = item.programmeTypeId;
      }
      if (programSetupLevel == ProgramSetupLevel.CLASSARM) {
        let item = row as ClassListInterface;
        this.addClassArmForm.patchValue({
          id: item.id,
          staffId: item.staffId,
          name: item.name
        });
        propertyId = item.classLevelId;
      }
      if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECT) {
        let item = row as ClassSubjectListInterface;
        this.addClassSubjectForm.patchValue({
          id: item.id,
          staffId: item.staffId,
          subjectId: item.subjectId
        });
        propertyId = item.classId;
      }
      if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECTASSESSMENT) {
        let item = row as ClassSubjectAssessmentListInterface;
        this.addClassSubjectAssessmentForm.patchValue({
          id: item.id,
          assessmentType: item.assessmentType,
          scoreWeigth: item.scoreWeigth
        });
        propertyId = item.classSubjectId;
      }

      this.showAddForm(propertyId, true);
    }
  }

  onDelete(row: any, programSetupLevel: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Delete ${programSetupLevel}`,
        message: `Are you sure you want to delete "${row.description || row.name || row.assessmentType || ''}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        if (programSetupLevel == ProgramSetupLevel.PROGRAMTYPE) {
          this.programTypeFacade.deleteProgramType(row.id);
          this.programTypeFacade.getProgramTypeAll();
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSLEVEL) {
          this.classLevelFacade.deleteClassLevel(row.id);
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSARM) {
          this.classFacade.deleteClass(row.id);
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECT) {
          this.classSubjectFacade.deleteClassSubject(row.id);
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECTASSESSMENT) {
          this.classSubjectAssessmentFacade.deleteClassSubjectAssessment(row.id);
        }
        this.toastService.openToast(`${programSetupLevel} deleted successfully`, NotificationTypeEnums.SUCCESS);
      }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSessionTermChange(sessionTermId: string) {
    this.setSessionTermControls(sessionTermId);
  }

  getSubjects(classId: string, isEditMode: boolean = false): DropdownListInterface[] {
    const classSubjectIds = this.getClassSubjects(classId).map(x => x.subjectId);
    return this.subjectAllSnapShot.filter(x => isEditMode || !classSubjectIds.includes(x.value.toString()));
  }

  getSubjectTypes(): DropdownListInterface[] {
    return this.subjectTypeSnapShot;
  }

  getStaffs(): StaffListInterface[] {
    return this.staffAllSnapShot;
  }

  getClassLevels(programTypeId: string): ClassLevelListInterface[] {
    return this.classLevelAllSnapShot.filter(x => x.programmeTypeId == programTypeId);
  }

  getClasses(classLevelId: string): ClassListInterface[] {
    return this.classAllSnapShot.filter(x => x.classLevelId == classLevelId);
  }

  getClassSubjects(classId: string): ClassSubjectListInterface[] {
    return this.classSubjectAllSnapShot.filter(x => x.classId == classId);
  }

  getClassSubjectAssessments(classSubjectId: string): ClassSubjectAssessmentListInterface[] {
    return this.classSubjectAssessmentAllSnapShot.filter(x => x.classSubjectId == classSubjectId);
  }

  getSubjectName(subjectId: string): string {
    return this.subjectAllSnapShot.find(s => s.value == subjectId)?.name!;
  }

  getStaffName(staffId: string): string {
    let staff = this.staffAllSnapShot.find(s => s.id == staffId);
    return staff ? `${staff?.lastName} ${staff?.firstName}` : '';
  }

  getSubjectWithStaffName(subjectId: string, staffId: string): string {
    let output = this.getSubjectName(subjectId);
    return this.appendStaffName(output, staffId);
  }

  appendStaffName(item: string, staffId: string): string {
    let staffName = this.getStaffName(staffId);
    if (staffName) {
      item += ` _____ (${staffName})`
    }
    return item;
  }

  getSubjectType(subjectId: string): DropdownListInterface {
    let subject = this.subjectAllSnapShot.find(s => s.value == subjectId);
    if (!subject) {
      return { value: '', name: '', description: ''  } as DropdownListInterface;
    }
    return this.subjectTypeSnapShot.find(s => s.value === subject.description)!;
  }

  submitClassLevel(programType: ProgramTypeListInterface) {
    this.addClassLevelForm.markAllAsTouched();

    if (!this.addClassLevelForm.valid) return;

    let formData = this.addClassLevelForm.value as ClassLevelFormInterface;
    formData.programmeTypeId = programType.id;
    formData.name = programType.name!;
    formData.id ? this.classLevelFacade.updateClassLevel(formData) : this.classLevelFacade.createClassLevel(formData);
    this.hideAddForm();
    this.classLevelFacade.getClassLevelAll();

  }

  submitClassArm(classLevel: ClassLevelListInterface) {
    this.addClassArmForm.markAllAsTouched();

    if (!this.addClassArmForm.valid) return;

    let formData = this.addClassArmForm.value as ClassFormInterface;
    formData.classLevelId = classLevel.id;
    formData.id ? this.classFacade.updateClass(formData) : this.classFacade.createClass(formData);
    this.hideAddForm();
    this.classFacade.getClassAll(this.getClassQueryParameters());
  }

  submitClassSubject(classArm: ClassListInterface) {
    this.addClassSubjectForm.markAllAsTouched();

    if (!this.addClassSubjectForm.valid) return;

    let formData = this.addClassSubjectForm.value as ClassSubjectFormInterface;
    formData.classId = classArm.id;
    formData.schoolTermSessionId = this.schoolTermSessionId;
    formData.id ? this.classSubjectFacade.updateClassSubject(formData) : this.classSubjectFacade.createClassSubject(formData);
    this.hideAddForm();
    this.classSubjectFacade.getClassSubjectAll(this.getClassSubjectQueryParameters());
  }

  submitClassSubjectAssessment(classSubject: ClassSubjectListInterface) {
    this.addClassSubjectAssessmentForm.markAllAsTouched();

    if (!this.addClassSubjectAssessmentForm.valid) return;

    let formData = this.addClassSubjectAssessmentForm.value as ClassSubjectAssessmentFormInterface;
    formData.classSubjectId = classSubject.id;
    formData.id ? this.classSubjectAssessmentFacade.updateClassSubjectAssessment(formData) : this.classSubjectAssessmentFacade.createClassSubjectAssessment(formData);
    this.hideAddForm();
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
  }

  buildProgramTypeConfig(): ProgramSetupLevelConfig {
    return {
      label: ProgramSetupLevel.PROGRAMTYPE,
      formGroup: this.addClassLevelForm,
      submitHandler: (programType: any) => this.submitClassLevel(programType),
      childItemsFn: (programTypeId: string) => this.getClassLevels(programTypeId),
      showTable: (item: any) => false,
      getName: (item: any) => `${item.level}) ${item.name}`,
      showAddButton: (item: any) => true,
      childConfig: {
        label: ProgramSetupLevel.CLASSLEVEL,
        formGroup: this.addClassArmForm,
        submitHandler: (classLevel: any) => this.submitClassArm(classLevel),
        childItemsFn: (classLevelId: string) => this.getClasses(classLevelId),
        showTable: (item: any) => false,
        getName: (item: any) => `${item.name} ${item.level}`,
        showAddButton: (item: any) => true,
        dropDownOptions: (classIdLevelId: string) => [
          { key: "staffs", dropDownListFn: () => this.getStaffs() }
        ],
        childConfig: {
          label: ProgramSetupLevel.CLASSARM,
          formGroup: this.addClassSubjectForm,
          submitHandler: (classArm: any) => this.submitClassSubject(classArm),
          childItemsFn: (classId: string) => this.getClassSubjects(classId),
          showTable: (item: any) => false,
          getName: (item: any) => this.appendStaffName(this.getClassName(item), item.staffId),
          showAddButton: (item: any) => true,
          dropDownOptions: (classId: string) => [
            { key: "subjects", dropDownListFn: () => this.getSubjects(classId) }, 
            { key: "staffs", dropDownListFn: () => this.getStaffs() }, 
            { key: "subjectTypes", dropDownListFn: () => this.getSubjectTypes() }
          ],
          childConfig: {
            label: ProgramSetupLevel.CLASSSUBJECT,
            formGroup: this.addClassSubjectAssessmentForm,
            submitHandler: (classSubject: any) => this.submitClassSubjectAssessment(classSubject),
            childItemsFn: (classSubjectId: string) => [], // No further child
            getName: (item: any) => this.getSubjectWithStaffName(item.subjectId, item.staffId),
            showAddButton: (item: any) => this.getSubjectType(item.subjectId).value === 1,
            showTable: (item: any) => this.getSubjectType(item.subjectId).value === 1, // Assuming 1 is the value for subject type that requires assessment
            tableHeaderData: this.assessmentTypeTableHeaderData,
            getTableData: (classSubjectId: string) => this.getClassSubjectAssessments(classSubjectId),
            childConfig: {
              label: ProgramSetupLevel.CLASSSUBJECTASSESSMENT,
              submitHandler: (programType: any) => { return; }, // No further child, can be customized;
              childItemsFn: (classSubjectId: string) => [], // No further child
            }
          },
        },
      },
    };
  }

  // Generic handlers for add, edit, delete, refresh, and submit
  onPanelEdit(event: { item: any, level: ProgramSetupLevel }) {
    const { item, level } = event;
    switch (level) {
      case ProgramSetupLevel.PROGRAMTYPE:
        // Navigate to edit page for program type
        this.router.navigate(['edit', item.id], { relativeTo: this.route });
        break;
      case ProgramSetupLevel.CLASSLEVEL:
        this.addClassLevelForm.patchValue({ id: item.id, level: item.level });
        this.showAddForm(item.programmeTypeId, true);
        break;
      case ProgramSetupLevel.CLASSARM:
        this.addClassArmForm.patchValue({ id: item.id, name: item.name, staffId: item.staffId });
        this.showAddForm(item.classLevelId, true);
        break;
      case ProgramSetupLevel.CLASSSUBJECT:
        this.addClassSubjectForm.patchValue({ id: item.id, subjectId: item.subjectId, staffId: item.staffId });
        this.showAddForm(item.classId, true);
        break;
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT:
        this.addClassSubjectAssessmentForm.patchValue({ id: item.id, assessmentType: item.assessmentType, scoreWeigth: item.scoreWeigth });
        this.showAddForm(item.classSubjectId, true);
        break;
    }
  }
  onPanelDelete(event: { item: any, level: ProgramSetupLevel }) {
    const { item, level } = event;
    let programSetupLevel = level;
    this.onDelete(item, programSetupLevel);
  }
  onPanelAdd(event: { item: any, level: ProgramSetupLevel }) {
    // Not used in this context, but could be implemented for custom add logic
  }
  onPanelRefresh(event: { item: any, level: ProgramSetupLevel }) {
    const { level } = event;
    switch (level) {
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT:
        break;
      case ProgramSetupLevel.CLASSSUBJECT:
        this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
        break;
      case ProgramSetupLevel.CLASSARM:
        this.classSubjectFacade.getClassSubjectAll(this.getClassSubjectQueryParameters());
        break;
      case ProgramSetupLevel.CLASSLEVEL:
        this.classFacade.getClassAll(this.getClassQueryParameters());
        break;
      case ProgramSetupLevel.PROGRAMTYPE:
        this.classLevelFacade.getClassLevelAll();
        break;
    }
  }
  onPanelShowAddForm(event: { id: string, level: ProgramSetupLevel }) {
    this.showAddForm(event.id, false);
  }
  onPanelHideAddForm(event: { level: ProgramSetupLevel }) {
    this.hideAddForm();
  }
  onPanelSubmit(event: { item: any, level: ProgramSetupLevel, config: ProgramSetupLevelConfig }) {
    event.config.submitHandler(event?.item);
  }

  // ── Drill-down navigation ─────────────────────────────────────────────

  get currentItems(): any[] {
    switch (this.currentLevel) {
      case ProgramSetupLevel.PROGRAMTYPE:
        return this.programTypeAllSnapShot;
      case ProgramSetupLevel.CLASSLEVEL:
        return this.selectedProgramType ? this.getClassLevels(this.selectedProgramType.id) : [];
      case ProgramSetupLevel.CLASSARM:
        return this.selectedClassLevel ? this.getClasses(this.selectedClassLevel.id) : [];
      case ProgramSetupLevel.CLASSSUBJECT:
        return this.selectedClassArm ? this.getClassSubjects(this.selectedClassArm.id) : [];
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT:
        return this.selectedClassSubject ? this.getClassSubjectAssessments(this.selectedClassSubject.id) : [];
      default:
        return [];
    }
  }

  get currentLevelLabel(): string {
    switch (this.currentLevel) {
      case ProgramSetupLevel.PROGRAMTYPE: return 'Programme Type';
      case ProgramSetupLevel.CLASSLEVEL: return 'Class Level';
      case ProgramSetupLevel.CLASSARM: return 'Class';
      case ProgramSetupLevel.CLASSSUBJECT: return 'Subject';
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT: return 'Assessment';
      default: return '';
    }
  }

  get breadcrumbs(): { label: string; level: ProgramSetupLevel }[] {
    const crumbs: { label: string; level: ProgramSetupLevel }[] = [
      { label: 'Programme Types', level: ProgramSetupLevel.PROGRAMTYPE }
    ];
    if (this.currentLevel === ProgramSetupLevel.PROGRAMTYPE) return crumbs;
    crumbs.push({ label: this.selectedProgramType?.name || '...', level: ProgramSetupLevel.CLASSLEVEL });
    if (this.currentLevel === ProgramSetupLevel.CLASSLEVEL) return crumbs;
    crumbs.push({ label: `${this.selectedClassLevel?.name} ${this.selectedClassLevel?.level}`, level: ProgramSetupLevel.CLASSARM });
    if (this.currentLevel === ProgramSetupLevel.CLASSARM) return crumbs;
    crumbs.push({ label: this.selectedClassArm?.name || '' + ' Subjects', level: ProgramSetupLevel.CLASSSUBJECT });
    if (this.currentLevel === ProgramSetupLevel.CLASSSUBJECT) return crumbs;
    crumbs.push({ label: this.getSubjectName(this.selectedClassSubject?.subjectId ?? '') ?? '...', level: ProgramSetupLevel.CLASSSUBJECTASSESSMENT });
    return crumbs;
  }

  drillInto(item: any): void {
    this.closeForm();
    this.subjectSearchText = '';
    switch (this.currentLevel) {
      case ProgramSetupLevel.PROGRAMTYPE:
        this.selectedProgramType = item;
        this.currentLevel = ProgramSetupLevel.CLASSLEVEL;
        this.loadProgramTypes(ProgramSetupLevel.CLASSLEVEL);
        break;
      case ProgramSetupLevel.CLASSLEVEL:
        this.selectedClassLevel = item;
        this.currentLevel = ProgramSetupLevel.CLASSARM;
        this.loadProgramTypes(ProgramSetupLevel.CLASSARM);
        break;
      case ProgramSetupLevel.CLASSARM:
        this.selectedClassArm = item;
        this.currentLevel = ProgramSetupLevel.CLASSSUBJECT;
        this.loadProgramTypes(ProgramSetupLevel.CLASSSUBJECT);
        this.updateGroupedSubjects();
        break;
      case ProgramSetupLevel.CLASSSUBJECT:
        if (this.canDrillInto(item)) {
          this.selectedClassSubject = item;
          this.currentLevel = ProgramSetupLevel.CLASSSUBJECTASSESSMENT;
          this.loadProgramTypes(ProgramSetupLevel.CLASSSUBJECTASSESSMENT);
        }
        break;
    }
    this.updateQueryParams();
  }

  navigateToLevel(level: ProgramSetupLevel): void {
    this.closeForm();
    this.currentLevel = level;
    if (level === ProgramSetupLevel.PROGRAMTYPE) {
      this.selectedProgramType = null;
      this.selectedClassLevel = null;
      this.selectedClassArm = null;
      this.selectedClassSubject = null;
    } else if (level === ProgramSetupLevel.CLASSLEVEL) {
      this.selectedClassLevel = null;
      this.selectedClassArm = null;
      this.selectedClassSubject = null;
    } else if (level === ProgramSetupLevel.CLASSARM) {
      this.selectedClassArm = null;
      this.selectedClassSubject = null;
    } else if (level === ProgramSetupLevel.CLASSSUBJECT) {
      this.selectedClassSubject = null;
      this.updateGroupedSubjects();
    }
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    const params: any = {};
    if (this.currentLevel !== ProgramSetupLevel.PROGRAMTYPE) {
      params['level'] = this.currentLevel;
    }
    if (this.selectedProgramType) params['ptId'] = this.selectedProgramType.id;
    if (this.selectedClassLevel) params['clId'] = this.selectedClassLevel.id;
    if (this.selectedClassArm) params['caId'] = this.selectedClassArm.id;
    if (this.selectedClassSubject) params['csId'] = this.selectedClassSubject.id;
    if (this.schoolTermSessionId) params['stId'] = this.schoolTermSessionId;
    this.router.navigate([], { relativeTo: this.route, queryParams: params, replaceUrl: true });
  }

  private restoreFromQueryParams(): void {
    const params = this.route.snapshot.queryParams;
    const level = params['level'] as ProgramSetupLevel;
    const ptId = params['ptId'];
    const clId = params['clId'];
    const caId = params['caId'];
    const csId = params['csId'];

    if (!level || !ptId) return;

    this.programTypeAll$.pipe(
      filter(data => !!data && data.length > 0),
      take(1)
    ).subscribe(pts => {
      const pt = pts?.find(p => p.id === ptId);
      if (!pt) return;
      this.selectedProgramType = pt;
      this.currentLevel = ProgramSetupLevel.CLASSLEVEL;

      if (level === ProgramSetupLevel.CLASSLEVEL || !clId) return;

      this.classLevelAll$.pipe(
        filter(data => !!data && data.length > 0),
        take(1)
      ).subscribe(cls => {
        const cl = cls?.find(c => c.id === clId);
        if (!cl) return;
        this.selectedClassLevel = cl;
        this.currentLevel = ProgramSetupLevel.CLASSARM;

        if (level === ProgramSetupLevel.CLASSARM || !caId) return;

        this.classAll$.pipe(
          filter(data => !!data && data.length > 0),
          take(1)
        ).subscribe(classes => {
          const ca = classes?.find(c => c.id === caId);
          if (!ca) return;
          this.selectedClassArm = ca;
          this.currentLevel = ProgramSetupLevel.CLASSSUBJECT;

          if (level === ProgramSetupLevel.CLASSSUBJECT || !csId) return;

          this.classSubjectAll$.pipe(
            filter(data => !!data && data.length > 0),
            take(1)
          ).subscribe(subjects => {
            const cs = subjects?.find(s => s.id === csId);
            if (!cs) return;
            this.selectedClassSubject = cs;
            this.currentLevel = ProgramSetupLevel.CLASSSUBJECTASSESSMENT;
          });
        });
      });
    });
  }

  canDrillInto(item: any): boolean {
    if (this.currentLevel === ProgramSetupLevel.CLASSSUBJECT) {
      return this.getSubjectType(item.subjectId)?.value === 1;
    }
    return this.currentLevel !== ProgramSetupLevel.CLASSSUBJECTASSESSMENT;
  }

  // ── Dialog form ───────────────────────────────────────────────────────

  openAddForm(): void {
    this.openFormDialog(null);
  }

  openEditForm(item: any): void {
    let initialValue: any;
    switch (this.currentLevel) {
      case ProgramSetupLevel.CLASSLEVEL:
        initialValue = { id: item.id, level: item.level };
        break;
      case ProgramSetupLevel.CLASSARM:
        initialValue = { id: item.id, name: item.name, staffId: item.staffId };
        break;
      case ProgramSetupLevel.CLASSSUBJECT:
        initialValue = { id: item.id, subjectId: item.subjectId, staffId: item.staffId };
        break;
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT:
        initialValue = { id: item.id, assessmentType: item.assessmentType, scoreWeigth: item.scoreWeigth };
        break;
    }
    this.openFormDialog(initialValue);
  }

  private openFormDialog(initialValue: any): void {
    const isEditMode = initialValue !== null;
    const dialogRef = this.dialog.open(ProgramSetupFormDialogComponent, {
      width: '500px',
      data: {
        level: this.currentLevel,
        isEditMode,
        initialValue,
        subjects: this.getSubjectsForCurrentArm(isEditMode),
        staffs: this.getStaffs()
      } as ProgramSetupFormDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleDialogResult(result);
      }
    });
  }

  private handleDialogResult(formValue: any): void {
    switch (this.currentLevel) {
      case ProgramSetupLevel.CLASSLEVEL: {
        const formData = formValue as ClassLevelFormInterface;
        formData.programmeTypeId = this.selectedProgramType!.id;
        formData.name = this.selectedProgramType!.name!;
        formData.id ? this.classLevelFacade.updateClassLevel(formData) : this.classLevelFacade.createClassLevel(formData);
        break;
      }
      case ProgramSetupLevel.CLASSARM: {
        const formData = formValue as ClassFormInterface;
        formData.classLevelId = this.selectedClassLevel!.id;
        formData.id ? this.classFacade.updateClass(formData) : this.classFacade.createClass(formData);
        break;
      }
      case ProgramSetupLevel.CLASSSUBJECT: {
        const formData = formValue as ClassSubjectFormInterface;
        formData.classId = this.selectedClassArm!.id;
        formData.schoolTermSessionId = this.schoolTermSessionId;
        formData.id ? this.classSubjectFacade.updateClassSubject(formData) : this.classSubjectFacade.createClassSubject(formData);
        break;
      }
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT: {
        const formData = formValue as ClassSubjectAssessmentFormInterface;
        formData.classSubjectId = this.selectedClassSubject!.id;
        formData.id ? this.classSubjectAssessmentFacade.updateClassSubjectAssessment(formData) : this.classSubjectAssessmentFacade.createClassSubjectAssessment(formData);
        break;
      }
    }
  }

  closeForm(): void {
    // No-op: dialogs close themselves; kept for drillInto/navigateToLevel call compatibility
  }

  hasChildren(item: any): boolean {
    switch (this.currentLevel) {
      case ProgramSetupLevel.PROGRAMTYPE:
        return this.getClassLevels(item.id).length > 0;
      case ProgramSetupLevel.CLASSLEVEL:
        return this.getClasses(item.id).length > 0;
      case ProgramSetupLevel.CLASSARM:
        return this.getClassSubjects(item.id).length > 0;
      case ProgramSetupLevel.CLASSSUBJECT:
        return this.getClassSubjectAssessments(item.id).length > 0;
      default:
        return false;
    }
  }

  deleteCurrentItem(item: any): void {
    this.onDelete(item, this.currentLevel);
  }

  getSubjectsForCurrentArm(isEditMode: boolean = false): DropdownListInterface[] {
    return this.selectedClassArm ? this.getSubjects(this.selectedClassArm.id, isEditMode) : this.subjectAllSnapShot;
  }

  // ── Card display helpers ──────────────────────────────────────────────

  getItemDisplayName(item: any): string {
    switch (this.currentLevel) {
      case ProgramSetupLevel.PROGRAMTYPE: return item.name ?? '';
      case ProgramSetupLevel.CLASSLEVEL: return `${item.name} ${item.level}`;
      case ProgramSetupLevel.CLASSARM: return item.name ?? '';
      case ProgramSetupLevel.CLASSSUBJECT: return this.getSubjectName(item.subjectId) ?? '';
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT: return item.assessmentType ?? '';
      default: return item.name ?? '';
    }
  }

  updateGroupedSubjects(): void {
    const subjects = this.currentItems as ClassSubjectListInterface[];
    const search = this._subjectSearchText.toLowerCase().trim();
    const filtered = search
      ? subjects.filter(s => (this.getSubjectName(s.subjectId) ?? '').toLowerCase().includes(search))
      : subjects;
    const groups = new Map<string, ClassSubjectListInterface[]>();
    for (const s of filtered) {
      const typeName = this.getSubjectType(s.subjectId)?.name ?? 'Other';
      if (!groups.has(typeName)) groups.set(typeName, []);
      groups.get(typeName)!.push(s);
    }
    this.groupedCurrentSubjects = Array.from(groups.entries()).map(([type, items]) => ({ type, items }));
  }

  getItemSubtitle(item: any): string {
    switch (this.currentLevel) {
      case ProgramSetupLevel.PROGRAMTYPE:
        return `${this.getClassLevels(item.id).length} level(s)`;
      case ProgramSetupLevel.CLASSLEVEL:
        return `${this.getClasses(item.id).length} class(es)`;
      case ProgramSetupLevel.CLASSARM: {
        const count = this.getClassSubjects(item.id).length;
        const tutor = this.getStaffName(item.staffId);
        return [tutor ? `Tutor: ${tutor}` : null, `${count} subject(s)`].filter(Boolean).join(' · ');
      }
      case ProgramSetupLevel.CLASSSUBJECT: {
        const teacher = this.getStaffName(item.staffId);
        return teacher ? `Teacher: ${teacher}` : '';
      }
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT:
        return `Score weight: ${item.scoreWeigth}`;
      default:
        return '';
    }
  }
}