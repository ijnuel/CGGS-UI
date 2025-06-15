import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ClassSubjectAssessmentListInterface,
  ClassSubjectAssessmentFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as ClassSubjectAssessmentAction from './class-subject-assessment.actions';
import {
  selectClassSubjectAssessmentList,
  selectClassSubjectAssessmentAll,
  selectClassSubjectAssessmentByProperties,
  selectClassSubjectAssessmentById,
  selectExists,
  selectCount,
  selectClassSubjectAssessmentLoading,
  selectClassSubjectAssessmentError,
} from './class-subject-assessment.selector';
import { ClassSubjectAssessmentState } from './class-subject-assessment.reducer';

@Injectable({
  providedIn: 'root',
})
export class ClassSubjectAssessmentFacade {
  classSubjectAssessmentList$: Observable<PaginatedResponseInterface<ClassSubjectAssessmentListInterface[]> | null>;
  classSubjectAssessmentAll$: Observable<ClassSubjectAssessmentListInterface[] | null>;
  classSubjectAssessmentByProperties$: Observable<ClassSubjectAssessmentListInterface[] | null>;
  classSubjectAssessmentById$: Observable<ClassSubjectAssessmentListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ classSubjectAssessment: ClassSubjectAssessmentState }>) {
    this.classSubjectAssessmentList$ = this.store.select(selectClassSubjectAssessmentList);
    this.classSubjectAssessmentAll$ = this.store.select(selectClassSubjectAssessmentAll);
    this.classSubjectAssessmentByProperties$ = this.store.select(selectClassSubjectAssessmentByProperties);
    this.classSubjectAssessmentById$ = this.store.select(selectClassSubjectAssessmentById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectClassSubjectAssessmentLoading);
    this.error$ = this.store.select(selectClassSubjectAssessmentError);
  }

  getClassSubjectAssessmentList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(ClassSubjectAssessmentAction.getClassSubjectAssessmentList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getClassSubjectAssessmentAll(): void {
    this.store.dispatch(ClassSubjectAssessmentAction.getClassSubjectAssessmentAll());
  }

  getClassSubjectAssessmentById(classSubjectAssessmentId: string): void {
    this.store.dispatch(ClassSubjectAssessmentAction.getClassSubjectAssessmentById({ classSubjectAssessmentId }));
  }

  getClassSubjectAssessmentByProperties(properties: Partial<ClassSubjectAssessmentFormInterface>): void {
    this.store.dispatch(ClassSubjectAssessmentAction.getClassSubjectAssessmentByProperties({ properties }));
  }

  classSubjectAssessmentExists(properties: Partial<ClassSubjectAssessmentFormInterface>): void {
    this.store.dispatch(ClassSubjectAssessmentAction.classSubjectAssessmentExists({ properties }));
  }

  classSubjectAssessmentCount(): void {
    this.store.dispatch(ClassSubjectAssessmentAction.classSubjectAssessmentCount());
  }

  createClassSubjectAssessment(classSubjectAssessment: ClassSubjectAssessmentFormInterface): void {
    this.store.dispatch(ClassSubjectAssessmentAction.createClassSubjectAssessment({ payload: classSubjectAssessment }));
  }

  updateClassSubjectAssessment(classSubjectAssessment: ClassSubjectAssessmentFormInterface): void {
    this.store.dispatch(ClassSubjectAssessmentAction.updateClassSubjectAssessment({ payload: classSubjectAssessment }));
  }

  deleteClassSubjectAssessment(classSubjectAssessmentId: string): void {
    this.store.dispatch(ClassSubjectAssessmentAction.deleteClassSubjectAssessment({ classSubjectAssessmentId }));
  }

  createManyClassSubjectAssessments(classSubjectAssessments: ClassSubjectAssessmentFormInterface[]): void {
    this.store.dispatch(ClassSubjectAssessmentAction.createManyClassSubjectAssessments({ payload: classSubjectAssessments }));
  }

  updateManyClassSubjectAssessments(classSubjectAssessments: ClassSubjectAssessmentFormInterface[]): void {
    this.store.dispatch(ClassSubjectAssessmentAction.updateManyClassSubjectAssessments({ payload: classSubjectAssessments }));
  }

  deleteManyClassSubjectAssessments(classSubjectAssessmentIds: string[]): void {
    this.store.dispatch(ClassSubjectAssessmentAction.deleteManyClassSubjectAssessments({ classSubjectAssessmentIds }));
  }
}
