import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ResultMarkSheetInterface } from '../../types/result';
import { ResultState } from './result.reducer';
import * as ResultActions from './result.actions';
import * as ResultSelectors from './result.selector';

@Injectable({
  providedIn: 'root',
})
export class ResultFacade {
  constructor(private store: Store<{ result: ResultState }>) {}

  // Selectors
  get resultMarkSheet$(): Observable<ResultMarkSheetInterface | null> {
    return this.store.select(ResultSelectors.selectResultMarkSheet);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(ResultSelectors.selectResultLoading);
  }

  get error$(): Observable<string | null> {
    return this.store.select(ResultSelectors.selectResultError);
  }

  // Actions
  getResultMarkSheet(schoolTermSessionId: string, classId: string, subjectId: string): void {
    this.store.dispatch(ResultActions.getResultMarkSheet({ schoolTermSessionId, classId, subjectId }));
  }

  updateResultMarkSheet(payload: ResultMarkSheetInterface): void {
    this.store.dispatch(ResultActions.updateResultMarkSheet({ payload }));
  }
} 