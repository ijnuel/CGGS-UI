import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultFacade } from '../../../../store/result/result.facade';
import { StudentClassSubjectAssessmentScoreFacade } from '../../../../store/student-class-subject-assessment-score/student-class-subject-assessment-score.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SubjectFacade } from '../../../../store/subject/subject.facade';
import { StudentAssessmentScoreInterface, AssessmentColumnInterface, StudentAssessmentRowInterface } from '../../../../types/result';
import { StudentClassSubjectAssessmentScoreFormInterface } from '../../../../types/student-class-subject-assessment-score';
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
  resultMarkSheet$: Observable<StudentAssessmentScoreInterface[] | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // Processed data for display
  assessmentColumns: AssessmentColumnInterface[] = [];
  studentRows: StudentAssessmentRowInterface[] = [];

  // Edit mode state
  isEditMode = false;
  originalStudentRows: StudentAssessmentRowInterface[] = [];
  invalidScores: Set<string> = new Set(); // Track invalid scores

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private resultFacade: ResultFacade,
    private studentClassSubjectAssessmentScoreFacade: StudentClassSubjectAssessmentScoreFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private classFacade: ClassFacade,
    private subjectFacade: SubjectFacade,
    private router: Router,
    private route: ActivatedRoute
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

    // Check for query parameters and load data if available
    this.checkQueryParamsAndLoadData();

    // Subscribe to marksheet changes to process data
    this.resultMarkSheet$
      .pipe(takeUntil(this.destroy$))
      .subscribe(marksheet => {
        console.log(marksheet);
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
      
      // Update URL with query parameters
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          schoolTermSessionId,
          classId,
          subjectId
        },
        queryParamsHandling: 'merge'
      });

      // Get marksheet data
      this.resultFacade.getResultMarkSheet(schoolTermSessionId, classId, subjectId);
    }
  }

  private checkQueryParamsAndLoadData(): void {
    this.route.queryParams.subscribe(params => {
      const { schoolTermSessionId, classId, subjectId } = params;
      
      if (schoolTermSessionId && classId && subjectId) {
        // Patch form with URL parameters
        this.updateResultForm.patchValue({
          schoolTermSessionId,
          classId,
          subjectId
        });

        // Get marksheet data
        this.resultFacade.getResultMarkSheet(schoolTermSessionId, classId, subjectId);
      }
    });
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
  processMarksheetData(marksheet: StudentAssessmentScoreInterface[]): void {
    console.log(marksheet);
    if (!marksheet || marksheet.length === 0) {
      this.assessmentColumns = [];
      this.studentRows = [];
      return;
    }

    // Extract unique assessments and sort by score weight
    const assessmentMap = new Map<string, AssessmentColumnInterface>();
    
    marksheet.forEach(result => {
      const assessment = result.classSubjectAssessment;
      if (assessment) {
        assessmentMap.set(assessment.id, {
          id: assessment.id,
          name: assessment.assessmentType,
          scoreWeight: assessment.scoreWeigth
        });
      }
    });

    this.assessmentColumns = Array.from(assessmentMap.values())
      .sort((a, b) => a.scoreWeight - b.scoreWeight); // Sort by score weight ascending

    // Group students and their scores
    const studentMap = new Map<string, StudentAssessmentRowInterface>();
    
    marksheet.forEach(result => {
      const student = result.student;
      if (!studentMap.has(student.id)) {
        studentMap.set(student.id, {
          studentNo: student.studentNo,
          studentId: student.id,
          studentName: `${student.firstName} ${student.lastName}`,
          assessmentScores: {}
        });
      }
      
      const studentRow = studentMap.get(student.id)!;
      const assessment = result.classSubjectAssessment;
      if (assessment) {
        studentRow.assessmentScores[assessment.id] = result.score;
      }
    });

    this.studentRows = Array.from(studentMap.values());
    this.originalStudentRows = JSON.parse(JSON.stringify(this.studentRows)); // Deep copy for backup
  }

  // Edit mode methods
  startEdit(): void {
    this.isEditMode = true;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.studentRows = JSON.parse(JSON.stringify(this.originalStudentRows)); // Restore original data
    this.invalidScores.clear(); // Clear invalid scores
  }

  saveChanges(): void {
    // Check if there are any invalid scores
    if (this.invalidScores.size > 0) {
      // Don't save if there are invalid scores
      return;
    }

    // Convert the edited data back to the format expected by the API
    const updatePayload: StudentClassSubjectAssessmentScoreFormInterface[] = [];
    
    this.studentRows.forEach(student => {
      Object.keys(student.assessmentScores).forEach(assessmentId => {
        const score = student.assessmentScores[assessmentId];
        if (score !== null && score !== undefined) {
          updatePayload.push({
            studentId: student.studentId,
            classSubjectAssessmentId: assessmentId,
            score: score
          });
        }
      });
    });

    if (updatePayload.length > 0) {
      this.studentClassSubjectAssessmentScoreFacade.updateManyStudentClassSubjectAssessmentScores(updatePayload);
      this.isEditMode = false;
      this.originalStudentRows = JSON.parse(JSON.stringify(this.studentRows)); // Update backup
      this.invalidScores.clear(); // Clear invalid scores
    }
  }

  // Method to update a specific score with validation
  updateScore(studentId: string, assessmentId: string, newScore: number | null): void {
    const student = this.studentRows.find(s => s.studentId === studentId);
    if (student) {
      // Get the assessment to check score weight
      const assessment = this.assessmentColumns.find(a => a.id === assessmentId);
      const scoreKey = `${studentId}-${assessmentId}`;
      
      if (assessment && newScore !== null && newScore > assessment.scoreWeight) {
        // Mark as invalid and don't update the score
        this.invalidScores.add(scoreKey);
        return;
      } else {
        // Remove from invalid scores if it was previously invalid
        this.invalidScores.delete(scoreKey);
      }
      
      student.assessmentScores[assessmentId] = newScore;
    }
  }

  // Method to get max score for an assessment
  getMaxScore(assessmentId: string): number {
    const assessment = this.assessmentColumns.find(a => a.id === assessmentId);
    return assessment ? assessment.scoreWeight : 100;
  }

  // Method to validate score input
  validateScore(event: any, assessmentId: string): void {
    const input = event.target;
    const value = parseInt(input.value);
    const maxScore = this.getMaxScore(assessmentId);
    
    if (value > maxScore) {
      input.value = maxScore;
      input.setCustomValidity(`Score cannot exceed ${maxScore}`);
    } else {
      input.setCustomValidity('');
    }
  }

  // Method to check if a score is invalid
  isScoreInvalid(studentId: string, assessmentId: string): boolean {
    return this.invalidScores.has(`${studentId}-${assessmentId}`);
  }

  // Method to get error message for invalid score
  getScoreErrorMessage(studentId: string, assessmentId: string): string {
    const maxScore = this.getMaxScore(assessmentId);
    return `Score cannot exceed ${maxScore}`;
  }
} 