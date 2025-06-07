import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  TestEntityTemplateListInterface,
  TestEntityTemplateFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as TestEntityTemplateAction from './test-entity-template.actions';
import {
  selectTestEntityTemplateList,
  selectTestEntityTemplateAll,
  selectTestEntityTemplateByProperties,
  selectTestEntityTemplateById,
  selectExists,
  selectCount,
  selectTestEntityTemplateLoading,
  selectTestEntityTemplateError,
} from './test-entity-template.selector';
import { TestEntityTemplateState } from './test-entity-template.reducer';

@Injectable({
  providedIn: 'root',
})
export class TestEntityTemplateFacade {
  testEntityTemplateList$: Observable<PaginatedResponseInterface<TestEntityTemplateListInterface[]> | null>;
  testEntityTemplateAll$: Observable<TestEntityTemplateListInterface[] | null>;
  testEntityTemplateByProperties$: Observable<TestEntityTemplateListInterface[] | null>;
  testEntityTemplateById$: Observable<TestEntityTemplateListInterface | null>;
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

  constructor(private store: Store<{ testEntityTemplate: TestEntityTemplateState }>) {
    this.testEntityTemplateList$ = this.store.select(selectTestEntityTemplateList);
    this.testEntityTemplateAll$ = this.store.select(selectTestEntityTemplateAll);
    this.testEntityTemplateByProperties$ = this.store.select(selectTestEntityTemplateByProperties);
    this.testEntityTemplateById$ = this.store.select(selectTestEntityTemplateById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectTestEntityTemplateLoading);
    this.error$ = this.store.select(selectTestEntityTemplateError);
  }

  getTestEntityTemplateList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getTestEntityTemplateAll(): void {
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateAll());
  }

  getTestEntityTemplateById(testEntityTemplateId: string): void {
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateById({ testEntityTemplateId }));
  }

  getTestEntityTemplateByProperties(properties: Partial<TestEntityTemplateFormInterface>): void {
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateByProperties({ properties }));
  }

  testEntityTemplateExists(properties: Partial<TestEntityTemplateFormInterface>): void {
    this.store.dispatch(TestEntityTemplateAction.testEntityTemplateExists({ properties }));
  }

  testEntityTemplateCount(): void {
    this.store.dispatch(TestEntityTemplateAction.testEntityTemplateCount());
  }

  createTestEntityTemplate(testEntityTemplate: TestEntityTemplateFormInterface): void {
    this.store.dispatch(TestEntityTemplateAction.createTestEntityTemplate({ payload: testEntityTemplate }));
  }

  updateTestEntityTemplate(testEntityTemplate: TestEntityTemplateFormInterface): void {
    this.store.dispatch(TestEntityTemplateAction.updateTestEntityTemplate({ payload: testEntityTemplate }));
  }

  deleteTestEntityTemplate(testEntityTemplateId: string): void {
    this.store.dispatch(TestEntityTemplateAction.deleteTestEntityTemplate({ testEntityTemplateId }));
  }

  createManyTestEntityTemplates(testEntityTemplates: TestEntityTemplateFormInterface[]): void {
    this.store.dispatch(TestEntityTemplateAction.createManyTestEntityTemplates({ payload: testEntityTemplates }));
  }

  updateManyTestEntityTemplates(testEntityTemplates: TestEntityTemplateFormInterface[]): void {
    this.store.dispatch(TestEntityTemplateAction.updateManyTestEntityTemplates({ payload: testEntityTemplates }));
  }

  deleteManyTestEntityTemplates(testEntityTemplateIds: string[]): void {
    this.store.dispatch(TestEntityTemplateAction.deleteManyTestEntityTemplates({ testEntityTemplateIds }));
  }
}
