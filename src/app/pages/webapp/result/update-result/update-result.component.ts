import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, filter, first, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultFacade } from '../../../../store/result/result.facade';
import { StudentClassSubjectAssessmentScoreFacade } from '../../../../store/student-class-subject-assessment-score/student-class-subject-assessment-score.facade';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { ClassFacade } from '../../../../store/class/class.facade';
import { SubjectFacade } from '../../../../store/subject/subject.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { StudentAssessmentScoreInterface, AssessmentColumnInterface, StudentAssessmentRowInterface } from '../../../../types/result';
import { StudentClassSubjectAssessmentScoreFormInterface } from '../../../../types/student-class-subject-assessment-score';
import { SchoolTermSessionListInterface, ClassListInterface, SubjectListInterface, PaginatedResponseInterface, DropdownListInterface } from '../../../../types';
import { ToastNotificationService, NotificationTypeEnums } from '../../../../services/toast-notification.service';

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
  skillGrades$: Observable<DropdownListInterface[] | null>;
  
  // Result data
  resultMarkSheet$: Observable<StudentAssessmentScoreInterface[] | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  saving$: Observable<boolean>;

  // Processed data for display
  assessmentColumns: AssessmentColumnInterface[] = [];
  studentRows: StudentAssessmentRowInterface[] = [];

  // Edit mode state
  isEditMode = false;
  originalStudentRows: StudentAssessmentRowInterface[] = [];
  invalidScores: Set<string> = new Set(); // Track invalid scores

  // Subject type handling
  selectedSubjectType: string = '1'; // Default to type 1
  skillGradesList: DropdownListInterface[] = [];

  private destroy$ = new Subject<void>();
  private schoolTermSessionsLoaded = false;

  constructor(
    private fb: FormBuilder,
    private resultFacade: ResultFacade,
    private studentClassSubjectAssessmentScoreFacade: StudentClassSubjectAssessmentScoreFacade,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private classFacade: ClassFacade,
    private subjectFacade: SubjectFacade,
    private sharedFacade: SharedFacade,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastNotificationService
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
    this.skillGrades$ = this.sharedFacade.selectSkillGradeList$.pipe(
      map(skillGrades => this.sortSkillGradesByValue(skillGrades))
    );
    this.resultMarkSheet$ = this.resultFacade.resultMarkSheet$;
    this.loading$ = this.resultFacade.loading$;
    this.error$ = this.resultFacade.error$;
    this.saving$ = this.studentClassSubjectAssessmentScoreFacade.loading$;
  }

  ngOnInit(): void {
    // Load dropdown data
    this.loadDropdownData();

    // Check for query parameters and load data if available
    this.checkQueryParamsAndLoadData();

    // Default school term session selection
    this.schoolTermSessions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((sessions) => {
        if (!sessions || sessions.length === 0 || this.schoolTermSessionsLoaded) {
          return;
        }
        const defaultSession = sessions.find((session) => session.isCurrent) ?? sessions[0];
        if (defaultSession && !this.formControl.schoolTermSessionId.value) {
          this.formControl.schoolTermSessionId.setValue(defaultSession.id);
          this.onSchoolTermSessionChange();
          this.schoolTermSessionsLoaded = true;
        }
      });

    // Subscribe to skill grades to populate the local list
    this.skillGrades$
      .pipe(takeUntil(this.destroy$))
      .subscribe(skillGrades => {
        if (skillGrades) {
          this.skillGradesList = skillGrades;
        }
      });

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

    // Subscribe to update success - show toast when save succeeds
    this.studentClassSubjectAssessmentScoreFacade.updateManySuccess$
      .pipe(
        filter(success => success === true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.toastService.openToast('Results saved successfully', NotificationTypeEnums.SUCCESS);
        // Exit edit mode and update backup only after successful save
        this.isEditMode = false;
        this.originalStudentRows = JSON.parse(JSON.stringify(this.studentRows)); // Update backup
        this.invalidScores.clear(); // Clear invalid scores
      });

    // Subscribe to update errors - show toast when save fails
    // Use withLatestFrom to check if we just finished saving (loading went from true to false)
    this.studentClassSubjectAssessmentScoreFacade.error$
      .pipe(
        filter(error => error !== null && error !== ''),
        distinctUntilChanged(),
        withLatestFrom(this.saving$),
        filter(([error, isSaving]) => !isSaving), // Only show error if not currently saving
        takeUntil(this.destroy$)
      )
      .subscribe(([error]) => {
        this.toastService.openToast(`Failed to save results: ${error}`, NotificationTypeEnums.ERROR);
        // Keep edit mode active on error so user can retry or manually cancel
        // Don't exit edit mode - let user decide whether to retry or discard
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

    // Load skill grades
    this.sharedFacade.getSkillGradeList();
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

        // Update subject type when loading from URL
        this.updateSelectedSubjectType(subjectId);

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
    this.selectedSubjectType = '1'; // Reset to default
    
    // Auto-fetch marksheet if all fields are selected
    this.autoFetchMarksheetIfReady();
  }

  onClassChange(): void {
    // Reset subject when class changes
    this.updateResultForm.patchValue({
      subjectId: ''
    });
    this.selectedSubjectType = '1'; // Reset to default
    
    // Auto-fetch marksheet if all fields are selected
    this.autoFetchMarksheetIfReady();
  }

  onSubjectChange(): void {
    // Update selected subject type when subject changes
    const subjectId = this.updateResultForm.get('subjectId')?.value;
    if (subjectId) {
      this.updateSelectedSubjectType(subjectId);
    }
    
    // Auto-fetch marksheet if all fields are selected
    this.autoFetchMarksheetIfReady();
  }

  private updateSelectedSubjectType(subjectId: string): void {
    this.subjects$.pipe(takeUntil(this.destroy$)).subscribe(subjects => {
      if (subjects) {
        const selectedSubject = subjects.find(s => s.id === subjectId);
        if (selectedSubject) {
          this.selectedSubjectType = selectedSubject.subjectType;
        }
      }
    });
  }

  // Getter method for form controls
  get formControl() {
    return this.updateResultForm.controls;
  }

  // Process marksheet data for grouped display
  processMarksheetData(marksheet: StudentAssessmentScoreInterface[]): void {
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
          assessmentScores: {},
          skillGrades: {},
          assessmentEntryIds: {}
        });
      }
      
      const studentRow = studentMap.get(student.id)!;
      const assessment = result.classSubjectAssessment;
      if (assessment) {
        studentRow.assessmentScores[assessment.id] = result.score;
        studentRow.skillGrades[assessment.id] = result.skillGrade;
        studentRow.assessmentEntryIds![assessment.id] = result.id;
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
    // Check if there are any invalid scores (only for subject type 1)
    console.log(this.invalidScores);
    if (this.selectedSubjectType == '1' && this.invalidScores.size > 0) {
      // Don't save if there are invalid scores
      return;
    }

    // Convert the edited data back to the format expected by the API
    const updatePayload: StudentClassSubjectAssessmentScoreFormInterface[] = [];
    
    this.studentRows.forEach(student => {
      Object.keys(student.assessmentScores).forEach(assessmentId => {
        const score = student.assessmentScores[assessmentId];
        const skillGrade = student.skillGrades[assessmentId];
        
        if (this.selectedSubjectType == '1') {
          // For subject type 1, use numeric scores
          if (score !== null && score !== undefined) {
            updatePayload.push({
              id: student.assessmentEntryIds ? student.assessmentEntryIds[assessmentId] || undefined : undefined,
              studentId: student.studentId,
              classSubjectAssessmentId: assessmentId,
              score: score,
              skillGrade: null
            });
          }
        } else {
          // For other subject types, use skill grades
          if (skillGrade !== null && skillGrade !== undefined) {
            updatePayload.push({
              id: student.assessmentEntryIds ? student.assessmentEntryIds[assessmentId] || undefined : undefined,
              studentId: student.studentId,
              classSubjectAssessmentId: assessmentId,
              score: 0, // Default score for non-type-1 subjects
              skillGrade: skillGrade
            });
          }
        }
      });
    });

    if (updatePayload.length > 0) {
      this.studentClassSubjectAssessmentScoreFacade.updateManyStudentClassSubjectAssessmentScores(updatePayload);
      // Don't exit edit mode yet - wait for save to complete
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

  // Method to update a specific skill grade
  updateSkillGrade(studentId: string, assessmentId: string, newGrade: number | string | null): void {
    const student = this.studentRows.find(s => s.studentId === studentId);
    if (student) {
      student.skillGrades[assessmentId] = newGrade as number | null;
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

  // Method to check if subject type is 1 (numeric scores)
  isNumericSubjectType(): boolean {
    return this.selectedSubjectType == '1';
  }

  // Method to sort skill grades by value in descending order (largest first)
  private sortSkillGradesByValue(skillGrades: DropdownListInterface[] | null): DropdownListInterface[] | null {
    if (!skillGrades) {
      return null;
    }
    
    return [...skillGrades].sort((a, b) => {
      // Convert values to numbers for proper numeric sorting
      const valueA = typeof a.value === 'string' ? parseFloat(a.value) : a.value;
      const valueB = typeof b.value === 'string' ? parseFloat(b.value) : b.value;
      
      // Sort in descending order (largest first)
      return valueB - valueA;
    });
  }

  // Method to get skill grade label by value
  getSkillGradeLabel(gradeValue: number | string | null): string | null {
    if (gradeValue === null || gradeValue === undefined) {
      return null;
    }

    const matchingGrade = this.skillGradesList.find(grade => 
      grade.value === gradeValue || grade.value.toString() === gradeValue.toString()
    );

    return matchingGrade ? matchingGrade.name : null;
  }

  // Method to automatically fetch marksheet when all required fields are selected
  private autoFetchMarksheetIfReady(): void {
    const { schoolTermSessionId, classId, subjectId } = this.updateResultForm.value;
    
    if (schoolTermSessionId && classId && subjectId) {
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
      // this.resultFacade.getResultMarkSheet(schoolTermSessionId, classId, subjectId);
    }
  }
} 