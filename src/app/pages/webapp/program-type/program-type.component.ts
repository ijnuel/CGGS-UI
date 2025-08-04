import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgramTypeFacade } from '../../../store/program-type/program-type.facade';
import { ProgramTypeListInterface } from '../../../types/program-type';
import { ClassFormInterface, ClassLevelFormInterface, ClassLevelListInterface, ClassListInterface, ClassSubjectAssessmentFormInterface, ClassSubjectAssessmentListInterface, ClassSubjectFormInterface, ClassSubjectListInterface, DropdownListInterface, PaginatedResponseInterface, ProgramSetupLevelConfig, SchoolTermSessionListInterface, SessionListInterface, SubjectListInterface } from '../../../types';
import { PageQueryInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
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
  schoolTermSessionAll$: Observable<SchoolTermSessionListInterface[] | null>;
  sessionAll$: Observable<SessionListInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  assessmentTypeTableHeaderData: TableHeaderInterface[] = assessmentTypeTableHeader;

  addFormVisibleFor: string | null = null;
  schoolTermSessionControl = new FormControl("");
  addClassLevelForm: FormGroup<{
    id: FormControl;
    level: FormControl;
  }>;
  addClassArmForm: FormGroup<{
    id: FormControl;
    name: FormControl;
  }>;
  addClassSubjectForm: FormGroup<{
    id: FormControl;
    subjectId: FormControl;
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
    private sessionFacade: SessionFacade,
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
    this.schoolTermSessionAll$ = this.schoolTermSessionFacade.schoolTermSessionAll$;
    this.sessionAll$ = this.sessionFacade.sessionAll$;
    this.loading$ = this.programTypeFacade.loading$;

    this.addClassLevelForm = this.fb.group({
      id: [''],
      level: [null, [Validators.required, Validators.min(1)]]
    });
    this.addClassArmForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(255)]],
    });
    this.addClassSubjectForm = this.fb.group({
      id: [''],
      subjectId: ['', [Validators.required, Validators.maxLength(255)]],
    });
    this.addClassSubjectAssessmentForm = this.fb.group({
      id: [''],
      assessmentType: ['', [Validators.required, Validators.maxLength(255)]],
      scoreWeigth: [null, [Validators.required, Validators.min(1)]]
    });
  }

  showAddForm(propertyId: string) {
    this.addFormVisibleFor = propertyId;
  }

  hideAddForm() {
    this.addFormVisibleFor = null;
    this.resetForms();
  }

  resetForms() {
    this.addClassLevelForm.patchValue({
      id: '',
      level: null
    });
    this.addClassArmForm.patchValue({
      id: '',
      name: ''
    });
    this.addClassSubjectForm.patchValue({
      id: '',
      subjectId: ''
    });
    this.addClassSubjectAssessmentForm.patchValue({
      id: '',
      assessmentType: '',
      scoreWeigth: null,
    });

  }


  ngOnInit() {
    this.loadProgramTypes();

    this.getSnapShots();

    this.createSuccessActions();

    this.programTypeConfig = this.buildProgramTypeConfig();
  }

  private createSuccessActions() {
    this.classLevelFacade.createSuccess$.subscribe(data => {
      if (data) {
        this.classLevelFacade.getClassLevelAll();
      }
    });

    this.classFacade.createSuccess$.subscribe(data => {
      if (data) {
        this.classFacade.getClassAll();
      }
    });

    this.classSubjectFacade.createSuccess$.subscribe(data => {
      if (data) {
        this.classSubjectFacade.getClassSubjectAll(this.getQueryProperties());
      }
    });

    this.classSubjectAssessmentFacade.createSuccess$.subscribe(data => {
      if (data) {
        this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
      }
    });
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

    this.subjectAll$.subscribe(data => {
      if (data) {
        this.subjectAllSnapShot = [...data].sort((a, b) => a.name.localeCompare(b.name)).map(x => { return { name: x.name, description: x.name, id: x.id, value: x.id } as DropdownListInterface; });
      }
    });

    this.classLevelAll$.subscribe(data => {
      if (data) {
        this.classLevelAllSnapShot = [...data].sort((a, b) => a.level - b.level);
      }
    });

    this.classAll$.subscribe(data => {
      if (data) {
        this.classAllSnapShot = [...data].sort((a, b) => a.name.localeCompare(b.name));
      }
    });

    this.classSubjectAll$.subscribe(data => {
      if (data) {
        this.classSubjectAllSnapShot = [...data];
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
  }

  loadProgramTypes(programSetupLevel: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE) {

    if (programSetupLevel == ProgramSetupLevel.PROGRAMTYPE) {
      this.programTypeFacade.getProgramTypeAll();
      this.subjectFacade.getSubjectAll();
      this.schoolTermSessionFacade.getSchoolTermSessionAll();
      this.sessionFacade.getSessionAll();
    }
    if (programSetupLevel == ProgramSetupLevel.CLASSLEVEL) {
      this.classLevelFacade.getClassLevelAll();
    }
    if (programSetupLevel == ProgramSetupLevel.CLASSARM) {
      this.classFacade.getClassAll();
    }
    if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECT) {
      this.classSubjectFacade.getClassSubjectAll(this.getQueryProperties());
    }
    if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECTASSESSMENT) {
      this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
    }
  }
  getSessionName(sessionId: string) : string {
    return this.sessionAllSnapShot.find(x => x.id == sessionId)?.name!;
  }

  getQueryProperties(): any {
    return [{ Name: 'schoolTermSessionId', Value: this.schoolTermSessionId }];
  }
  
  onPageChange(event: PageQueryInterface) {
    this.programTypeFacade.getProgramTypeAll();
    // this.classLevelFacade.getClassLevelAll();
    // this.classFacade.getClassAll();
    // this.classSubjectFacade.getClassSubjectAll();
    // this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();

    const { start, recordsPerPage, searchText, queryProperties } = event;
    this.programTypeFacade.getProgramTypeList({
      start,
      recordsPerPage,
      searchText,
      queryProperties: queryProperties ? JSON.stringify(queryProperties) : undefined
    });
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
      queryProperties: JSON.stringify(filters)
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
          name: item.name
        });
        propertyId = item.classLevelId;
      }
      if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECT) {
        let item = row as ClassSubjectListInterface;
        this.addClassSubjectForm.patchValue({
          id: item.id,
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

      this.showAddForm(propertyId)
    }
  }

  onDelete(row: any, programSetupLevel: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Delete ${programSetupLevel}`,
        message: `Are you sure you want to delete "${row.name}"?`,
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
          this.classLevelFacade.getClassLevelAll();
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSARM) {
          this.classFacade.deleteClass(row.id);
          this.classFacade.getClassAll();
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECT) {
          this.classSubjectFacade.deleteClassSubject(row.id);
          this.classSubjectFacade.getClassSubjectAll(this.getQueryProperties());
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECTASSESSMENT) {
          this.classSubjectAssessmentFacade.deleteClassSubjectAssessment(row.id);
          this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
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
    this.classSubjectFacade.getClassSubjectAll(this.getQueryProperties());
  }

  getSubjects(): DropdownListInterface[] {
    return this.subjectAllSnapShot;
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
    return this.subjectAllSnapShot.find(s => s.id == subjectId)?.name!;
  }

  submitClassLevel(programType: ProgramTypeListInterface) {
    this.addClassLevelForm.markAllAsTouched();

    if (!this.addClassLevelForm.valid) return;

    let formData = this.addClassLevelForm.value as ClassLevelFormInterface;
    formData.programmeTypeId = programType.id;
    formData.name = programType.name;
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
    this.classFacade.getClassAll();
  }

  submitClassSubject(classArm: ClassListInterface) {
    this.addClassSubjectForm.markAllAsTouched();

    if (!this.addClassSubjectForm.valid) return;

    let formData = this.addClassSubjectForm.value as ClassSubjectFormInterface;
    formData.classId = classArm.id;
    formData.schoolTermSessionId = this.schoolTermSessionId;
    formData.id ? this.classSubjectFacade.updateClassSubject(formData) : this.classSubjectFacade.createClassSubject(formData);
    this.hideAddForm();
    this.classSubjectFacade.getClassSubjectAll(this.getQueryProperties());
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
      showAddButton: true,
      childConfig: {
        label: ProgramSetupLevel.CLASSLEVEL,
        formGroup: this.addClassArmForm,
        submitHandler: (classLevel: any) => this.submitClassArm(classLevel),
        childItemsFn: (classLevelId: string) => this.getClasses(classLevelId),
        getName: (item: any) => `${item.name} ${item.level}`,
        showAddButton: true,
        childConfig: {
          label: ProgramSetupLevel.CLASSARM,
          formGroup: this.addClassSubjectForm,
          submitHandler: (classArm: any) => this.submitClassSubject(classArm),
          childItemsFn: (classId: string) => this.getClassSubjects(classId),
          getName: (item: any) => `${item.description}`,
          showAddButton: true,
          dropDownOptions: [{ key: "subjects", dropDownListFn: () => this.getSubjects() }],
          childConfig: {
            label: ProgramSetupLevel.CLASSSUBJECT,
            formGroup: this.addClassSubjectAssessmentForm,
            submitHandler: (classSubject: any) => this.submitClassSubjectAssessment(classSubject),
            childItemsFn: (classSubjectId: string) => [], // No further child
            getName: (item: any) => this.getSubjectName(item.subjectId),
            showAddButton: true,
            showTable: true,
            tableHeaderData: this.assessmentTypeTableHeaderData,
            getTableData: (classSubjectId: string) => this.getClassSubjectAssessments(classSubjectId),
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
        this.addFormVisibleFor = item.programmeTypeId;
        break;
      case ProgramSetupLevel.CLASSARM:
        this.addClassArmForm.patchValue({ id: item.id, name: item.name });
        this.addFormVisibleFor = item.classLevelId;
        break;
      case ProgramSetupLevel.CLASSSUBJECT:
        this.addClassSubjectForm.patchValue({ id: item.id, subjectId: item.subjectId });
        this.addFormVisibleFor = item.classId;
        break;
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT:
        this.addClassSubjectAssessmentForm.patchValue({ id: item.id, assessmentType: item.assessmentType, scoreWeigth: item.scoreWeigth });
        this.addFormVisibleFor = item.classSubjectId;
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
        this.classSubjectFacade.getClassSubjectAll(this.getQueryProperties());
        break;
      case ProgramSetupLevel.CLASSLEVEL:
        this.classFacade.getClassAll();
        break;
      case ProgramSetupLevel.PROGRAMTYPE:
        this.classLevelFacade.getClassLevelAll();
        break;
    }
  }
  onPanelShowAddForm(event: { id: string, level: ProgramSetupLevel }) {
    this.addFormVisibleFor = event.id;
  }
  onPanelHideAddForm(event: { level: ProgramSetupLevel }) {
    this.hideAddForm();
  }
  onPanelSubmit(event: { item: any, level: ProgramSetupLevel, config: ProgramSetupLevelConfig }) {
    event.config.submitHandler(event.item);
  }
}