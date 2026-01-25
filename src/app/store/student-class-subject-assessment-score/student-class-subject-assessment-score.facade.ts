import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentClassSubjectAssessmentScoreListInterface, StudentClassSubjectAssessmentScoreFormInterface } from '../../types/student-class-subject-assessment-score';
import { PaginatedResponseInterface, PageQueryInterface, QueryInterface } from '../../types';
import { StudentClassSubjectAssessmentScoreState } from './student-class-subject-assessment-score.reducer';
import * as StudentClassSubjectAssessmentScoreActions from './student-class-subject-assessment-score.actions';
import * as StudentClassSubjectAssessmentScoreSelectors from './student-class-subject-assessment-score.selector';

@Injectable({
  providedIn: 'root',
})
export class StudentClassSubjectAssessmentScoreFacade {
  constructor(private store: Store<{ studentClassSubjectAssessmentScore: StudentClassSubjectAssessmentScoreState }>) {}

  // Selectors
  get studentClassSubjectAssessmentScoreList$(): Observable<PaginatedResponseInterface<StudentClassSubjectAssessmentScoreListInterface[]> | null> {
    return this.store.select(StudentClassSubjectAssessmentScoreSelectors.selectStudentClassSubjectAssessmentScoreList);
  }

  get studentClassSubjectAssessmentScoreAll$(): Observable<StudentClassSubjectAssessmentScoreListInterface[] | null> {
    return this.store.select(StudentClassSubjectAssessmentScoreSelectors.selectStudentClassSubjectAssessmentScoreAll);
  }

  get studentClassSubjectAssessmentScoreByProperties$(): Observable<StudentClassSubjectAssessmentScoreListInterface[] | null> {
    return this.store.select(StudentClassSubjectAssessmentScoreSelectors.selectStudentClassSubjectAssessmentScoreByProperties);
  }

  get studentClassSubjectAssessmentScoreById$(): Observable<StudentClassSubjectAssessmentScoreListInterface | null> {
    return this.store.select(StudentClassSubjectAssessmentScoreSelectors.selectStudentClassSubjectAssessmentScoreById);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(StudentClassSubjectAssessmentScoreSelectors.selectStudentClassSubjectAssessmentScoreLoading);
  }

  get error$(): Observable<string | null> {
    return this.store.select(StudentClassSubjectAssessmentScoreSelectors.selectStudentClassSubjectAssessmentScoreError);
  }

  get updateManySuccess$(): Observable<boolean> {
    return this.store.select(StudentClassSubjectAssessmentScoreSelectors.selectUpdateManySuccess);
  }

  // Actions
  getStudentClassSubjectAssessmentScoreAll(): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreAll());
  }

  getStudentClassSubjectAssessmentScoreList(pageQuery: PageQueryInterface): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreList({ pageQuery }));
  }

  getStudentClassSubjectAssessmentScoreById(id: string): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreById({ id }));
  }

  getStudentClassSubjectAssessmentScoreByProperties(properties: Partial<StudentClassSubjectAssessmentScoreFormInterface>): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.getStudentClassSubjectAssessmentScoreByProperties({ properties }));
  }

  studentClassSubjectAssessmentScoreExists(properties: Partial<StudentClassSubjectAssessmentScoreFormInterface>): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreExists({ properties }));
  }

  studentClassSubjectAssessmentScoreCount(properties: Partial<StudentClassSubjectAssessmentScoreFormInterface>): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.studentClassSubjectAssessmentScoreCount({ properties }));
  }

  createStudentClassSubjectAssessmentScore(studentClassSubjectAssessmentScore: StudentClassSubjectAssessmentScoreFormInterface): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.createStudentClassSubjectAssessmentScore({ payload: studentClassSubjectAssessmentScore }));
  }

  updateStudentClassSubjectAssessmentScore(studentClassSubjectAssessmentScore: StudentClassSubjectAssessmentScoreFormInterface): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.updateStudentClassSubjectAssessmentScore({ payload: studentClassSubjectAssessmentScore }));
  }

  deleteStudentClassSubjectAssessmentScore(id: string): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.deleteStudentClassSubjectAssessmentScore({ id }));
  }

  createManyStudentClassSubjectAssessmentScores(studentClassSubjectAssessmentScores: StudentClassSubjectAssessmentScoreFormInterface[]): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.createManyStudentClassSubjectAssessmentScores({ payload: studentClassSubjectAssessmentScores }));
  }

  updateManyStudentClassSubjectAssessmentScores(studentClassSubjectAssessmentScores: StudentClassSubjectAssessmentScoreFormInterface[]): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.updateManyStudentClassSubjectAssessmentScores({ payload: studentClassSubjectAssessmentScores }));
  }

  deleteManyStudentClassSubjectAssessmentScores(ids: string[]): void {
    this.store.dispatch(StudentClassSubjectAssessmentScoreActions.deleteManyStudentClassSubjectAssessmentScores({ ids }));
  }
}
