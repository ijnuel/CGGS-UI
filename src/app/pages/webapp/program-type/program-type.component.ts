import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgramTypeFacade } from '../../../store/program-type/program-type.facade';
import { ProgramTypeListInterface } from '../../../types/program-type';
import { ClassFormInterface, ClassLevelFormInterface, ClassLevelListInterface, ClassListInterface, ClassSubjectAssessmentFormInterface, ClassSubjectAssessmentListInterface, ClassSubjectFormInterface, ClassSubjectListInterface, PaginatedResponseInterface, SubjectListInterface } from '../../../types';
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

@Component({
  selector: 'app-program-type',
  templateUrl: './program-type.component.html',
  styleUrls: ['./program-type.component.scss'],
})
export class ProgramTypeComponent implements OnInit {
  ProgramSetupLevel = ProgramSetupLevel;
  programTypeList$: Observable<PaginatedResponseInterface<ProgramTypeListInterface[]> | null>;
  programTypeAll$: Observable<ProgramTypeListInterface[] | null>;
  classLevelAll$: Observable<ClassLevelListInterface[] | null>;
  classAll$: Observable<ClassListInterface[] | null>;
  classSubjectAll$: Observable<ClassSubjectListInterface[] | null>;
  classSubjectAssessmentAll$: Observable<ClassSubjectAssessmentListInterface[] | null>;
  subjectAll$: Observable<SubjectListInterface[] | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  assessmentTypeTableHeaderData: TableHeaderInterface[] = assessmentTypeTableHeader;

  addFormVisibleFor: string | null = null;

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
  subjectAllSnapShot: SubjectListInterface[] = [];

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

    this.programTypeAll$.subscribe(data => {
      if (data) {
        this.programTypeAllSnapShot = [...data].sort((a, b) => a.level - b.level);
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

    this.subjectAll$.subscribe(data => {
      if (data) {
        this.subjectAllSnapShot = [...data].sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  loadProgramTypes(programSetupLevel: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE) {
    
        if (programSetupLevel == ProgramSetupLevel.PROGRAMTYPE) {
    this.programTypeFacade.getProgramTypeAll();
    this.subjectFacade.getSubjectAll();
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSLEVEL) {
    this.classLevelFacade.getClassLevelAll();
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSARM) {
    this.classFacade.getClassAll();
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECT) {
    this.classSubjectFacade.getClassSubjectAll();
        }
        if (programSetupLevel == ProgramSetupLevel.CLASSSUBJECTASSESSMENT) {
    this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
        }
  }

  onPageChange(event: PageQueryInterface) {
    this.programTypeFacade.getProgramTypeAll();
    // this.classLevelFacade.getClassLevelAll();
    // this.classFacade.getClassAll();
    // this.classSubjectFacade.getClassSubjectAll();
    // this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();

    this.programTypeFacade.getProgramTypeList(event);
  }

  onSearch(searchText: string) {
    this.programTypeFacade.getProgramTypeList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
      searchText
    });
  }

  onFilter(filters: { name: string; value: string }[]) {
    this.programTypeFacade.getProgramTypeList({
      start: 0,
      recordsPerPage: 10,
      pageIndex: 0,
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
          this.classSubjectFacade.getClassSubjectAll();
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

  onPanelOpened(propertyId: string, searchKey: ProgramSetupLevel = ProgramSetupLevel.PROGRAMTYPE) {
    if (searchKey == ProgramSetupLevel.CLASSLEVEL && this.classLevelAllSnapShot.length == 0) {
      this.classLevelFacade.getClassLevelAll();
    }
    if (searchKey == ProgramSetupLevel.CLASSARM && this.classAllSnapShot.length == 0) {
      this.classFacade.getClassAll();
    }
    if (searchKey == ProgramSetupLevel.CLASSSUBJECT && this.classSubjectAllSnapShot.length == 0) {
      this.classSubjectFacade.getClassSubjectAll();
    }
    if (searchKey == ProgramSetupLevel.CLASSSUBJECTASSESSMENT && this.classSubjectAssessmentAllSnapShot.length == 0) {
      this.classSubjectAssessmentFacade.getClassSubjectAssessmentAll();
    }
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
    //to be removed
    formData.sessionId = 'ccff4231-c508-4096-55cc-08ddab79f2d7';
    formData.term = 1;
    formData.id ? this.classSubjectFacade.updateClassSubject(formData) : this.classSubjectFacade.createClassSubject(formData);
    this.hideAddForm();
    this.classSubjectFacade.getClassSubjectAll();
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
}

export enum ProgramSetupLevel {
  PROGRAMTYPE = 'Program Type',
  CLASSLEVEL = 'Class Level',
  CLASSARM = 'Class Arm',
  CLASSSUBJECT = 'Class Subject',
  CLASSSUBJECTASSESSMENT = 'Class Subject Assessment',
}