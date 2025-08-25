import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResultFacade } from '../../../../store/result/result.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SubjectFacade } from '../../../../store/subject/subject.facade';
import { ResultMarkSheetInterface, AssessmentColumnInterface, StudentAssessmentRowInterface } from '../../../../types/result';
import { SchoolTermSessionListInterface, ClassListInterface, SubjectListInterface, PaginatedResponseInterface } from '../../../../types';

@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.scss']
})
export class UpdateResultComponent implements OnInit, OnDestroy {
  updateResultForm: FormGroup<{
    schoolTermSessionId: FormControl;
    classId: FormControl;
    subjectId: FormControl;
  }>;
  
  // Observables for dropdown data
  schoolTermSessions$: Observable<SchoolTermSessionListInterface[] | null>;
  classes$: Observable<ClassListInterface[] | null>;
  subjects$: Observable<SubjectListInterface[] | null>;
  
  // Result data
  resultMarkSheet$: Observable<ResultMarkSheetInterface | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // Processed data for display
  assessmentColumns: AssessmentColumnInterface[] = [];
  studentRows: StudentAssessmentRowInterface[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private resultFacade: ResultFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private classFacade: ClassFacade,
    private subjectFacade: SubjectFacade
  ) {
    this.updateResultForm = this.fb.group({
      schoolTermSessionId: ['', Validators.required],
      classId: ['', Validators.required],
      subjectId: ['', Validators.required]
    });

    // Initialize observables
    this.schoolTermSessions$ = this.schoolTermSessionFacade.schoolTermSessionAll$;
    this.classes$ = this.classFacade.classAll$;
    this.subjects$ = this.subjectFacade.subjectAll$;
    this.resultMarkSheet$ = this.resultFacade.resultMarkSheet$;
    this.loading$ = this.resultFacade.loading$;
    this.error$ = this.resultFacade.error$;
  }

  ngOnInit(): void {
    // Load dropdown data
    this.loadDropdownData();

    // Subscribe to marksheet changes to process data
    this.resultMarkSheet$
      .pipe(takeUntil(this.destroy$))
      .subscribe(marksheet => {
        if (marksheet) {
          this.processMarksheetData(marksheet);
        } else {
          this.assessmentColumns = [];
          this.studentRows = [];
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDropdownData(): void {
    // Load school term sessions
    this.schoolTermSessionFacade.getSchoolTermSessionAll();

    // Load classes
    this.classFacade.getClassAll();

    // Load subjects
    this.subjectFacade.getSubjectAll();
  }

  getMarksheet(): void {
    if (this.updateResultForm.valid) {
      const { schoolTermSessionId, classId, subjectId } = this.updateResultForm.value;
      this.resultFacade.getResultMarkSheet(schoolTermSessionId, classId, subjectId);
    }
  }

  onSchoolTermSessionChange(): void {
    // Reset class and subject when school term session changes
    this.updateResultForm.patchValue({
      classId: '',
      subjectId: ''
    });
  }

  onClassChange(): void {
    // Reset subject when class changes
    this.updateResultForm.patchValue({
      subjectId: ''
    });
  }

  // Getter method for form controls
  get formControl() {
    return this.updateResultForm.controls;
  }

  // Process marksheet data for grouped display
  processMarksheetData(marksheet: ResultMarkSheetInterface): void {
    if (!marksheet.studentResults || marksheet.studentResults.length === 0) {
      this.assessmentColumns = [];
      this.studentRows = [];
      return;
    }

    // Extract unique assessments and sort by score weight
    const assessmentMap = new Map<string, AssessmentColumnInterface>();
    
    marksheet.studentResults.forEach(result => {
      if (result.classSubjectAssessmentId && result.classSubjectAssessmentName && result.scoreWeight !== undefined) {
        assessmentMap.set(result.classSubjectAssessmentId, {
          id: result.classSubjectAssessmentId,
          name: result.classSubjectAssessmentName,
          scoreWeight: result.scoreWeight
        });
      }
    });

    this.assessmentColumns = Array.from(assessmentMap.values())
      .sort((a, b) => b.scoreWeight - a.scoreWeight); // Sort by score weight descending

    // Group students and their scores
    const studentMap = new Map<string, StudentAssessmentRowInterface>();
    
    marksheet.studentResults.forEach(result => {
      if (!studentMap.has(result.studentId)) {
        studentMap.set(result.studentId, {
          studentId: result.studentId,
          studentName: result.studentName,
          assessmentScores: {}
        });
      }
      
      const student = studentMap.get(result.studentId)!;
      if (result.classSubjectAssessmentId) {
        student.assessmentScores[result.classSubjectAssessmentId] = result.score;
      }
    });

    this.studentRows = Array.from(studentMap.values());
  }
} 