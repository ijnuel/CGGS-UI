import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentAssessmentScoreInterface } from '../../types/result';
import { ResultState } from './result.reducer';
import * as ResultActions from './result.actions';
import * as ResultSelectors from './result.selector';

@Injectable({
  providedIn: 'root',
})
export class ResultFacade {
  constructor(private store: Store<{ result: ResultState }>) {}

  // Selectors
  get resultMarkSheet$(): Observable<StudentAssessmentScoreInterface[] | null> {
    return this.store.select(ResultSelectors.selectResultMarkSheet);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(ResultSelectors.selectResultLoading);
  }

  get error$(): Observable<string | null> {
    return this.store.select(ResultSelectors.selectResultError);
  }

  get generatingStudentResult$(): Observable<boolean> {
    return this.store.select(ResultSelectors.selectGeneratingStudentResult);
  }

  get generatedStudentResult$(): Observable<Blob | null> {
    return this.store.select(ResultSelectors.selectGeneratedStudentResult);
  }

  get generateStudentResultError$(): Observable<string | null> {
    return this.store.select(ResultSelectors.selectGenerateStudentResultError);
  }

  get generatingClassResult$(): Observable<boolean> {
    return this.store.select(ResultSelectors.selectGeneratingClassResult);
  }

  get generatedClassResult$(): Observable<Blob | null> {
    return this.store.select(ResultSelectors.selectGeneratedClassResult);
  }

  get generateClassResultError$(): Observable<string | null> {
    return this.store.select(ResultSelectors.selectGenerateClassResultError);
  }

  // Actions
  getResultMarkSheet(schoolTermSessionId: string, classId: string, subjectId: string): void {
    this.store.dispatch(ResultActions.getResultMarkSheet({ schoolTermSessionId, classId, subjectId }));
  }

  updateResultMarkSheet(payload: StudentAssessmentScoreInterface[]): void {
    this.store.dispatch(ResultActions.updateResultMarkSheet({ payload }));
  }

  generateStudentResult(schoolTermSessionId: string, classId: string): void {
    this.store.dispatch(ResultActions.generateStudentResult({ schoolTermSessionId, classId }));
  }

  clearGeneratedStudentResult(): void {
    this.store.dispatch(ResultActions.clearGeneratedStudentResult());
  }

  generateClassResult(schoolTermSessionId: string, classId: string): void {
    this.store.dispatch(ResultActions.generateClassResult({ schoolTermSessionId, classId }));
  }

  clearGeneratedClassResult(): void {
    this.store.dispatch(ResultActions.clearGeneratedClassResult());
  }
} 