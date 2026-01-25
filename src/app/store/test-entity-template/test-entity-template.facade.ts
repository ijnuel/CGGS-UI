import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TestEntityTemplateAction from './test-entity-template.actions';
import { TestEntityTemplateState } from './test-entity-template.reducer';
import { TestEntityTemplateListInterface, TestEntityTemplateFormInterface, PageQueryInterface, PaginatedResponseInterface, QueryInterface } from '../../types';
import {
  selectTestEntityTemplateList,
  selectTestEntityTemplateAll,
  selectTestEntityTemplateByProperties,
  selectTestEntityTemplateById,
  selectTestEntityTemplateExists,
  selectTestEntityTemplateCount,
  selectTestEntityTemplateLoading,
  selectTestEntityTemplateError,
  selectTestEntityTemplateCreateSuccess,
  selectTestEntityTemplateUpdateSuccess
} from './test-entity-template.selector';
@Injectable({ providedIn: 'root' })
export class TestEntityTemplateFacade {
  testEntityTemplateList$: Observable<PaginatedResponseInterface<TestEntityTemplateListInterface[]> | null>;
  testEntityTemplateAll$: Observable<TestEntityTemplateListInterface[] | null>;
  testEntityTemplateByProperties$: Observable<TestEntityTemplateListInterface[] | null>;
  testEntityTemplateById$: Observable<TestEntityTemplateListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    searchText: ''
  };

  constructor(private store: Store<{ testEntityTemplate: TestEntityTemplateState }>) {
    this.testEntityTemplateList$ = this.store.select(selectTestEntityTemplateList);
    this.testEntityTemplateAll$ = this.store.select(selectTestEntityTemplateAll);
    this.testEntityTemplateByProperties$ = this.store.select(selectTestEntityTemplateByProperties);
    this.testEntityTemplateById$ = this.store.select(selectTestEntityTemplateById);
    this.exists$ = this.store.select(selectTestEntityTemplateExists);
    this.count$ = this.store.select(selectTestEntityTemplateCount);
    this.loading$ = this.store.select(selectTestEntityTemplateLoading);
    this.error$ = this.store.select(selectTestEntityTemplateError);
    this.createSuccess$ = this.store.select(selectTestEntityTemplateCreateSuccess);
    this.updateSuccess$ = this.store.select(selectTestEntityTemplateUpdateSuccess);
  }

  getTestEntityTemplateList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateList({pageQuery}));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getTestEntityTemplateAll(query?: QueryInterface): void {
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateAll({ query }));
  }

  getTestEntityTemplateById(testEntityTemplateId: string): void {
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateById({ testEntityTemplateId }));
  }

  getTestEntityTemplateByProperties(queryProperties: any): void {
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateByProperties({
      queryPropertiesString: queryProperties ? JSON.stringify(queryProperties) : ''
    }));
  }

  testEntityTemplateExists(id: string): void {
    this.store.dispatch(TestEntityTemplateAction.testEntityTemplateExists({ id }));
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

  deleteTestEntityTemplate(id: string): void {
    this.store.dispatch(TestEntityTemplateAction.deleteTestEntityTemplate({ id }));
  }

  createManyTestEntityTemplates(testEntityTemplates: TestEntityTemplateFormInterface[]): void {
    this.store.dispatch(TestEntityTemplateAction.createManyTestEntityTemplates({ payload: testEntityTemplates }));
  }

  updateManyTestEntityTemplates(testEntityTemplates: TestEntityTemplateFormInterface[]): void {
    this.store.dispatch(TestEntityTemplateAction.updateManyTestEntityTemplates({ payload: testEntityTemplates }));
  }

  deleteManyTestEntityTemplates(ids: string[]): void {
    this.store.dispatch(TestEntityTemplateAction.deleteManyTestEntityTemplates({ ids }));
  }

  getTestEntityTemplateDataImportTemplate(): void {
    this.store.dispatch(TestEntityTemplateAction.getTestEntityTemplateDataImportTemplate());
  }

  importTestEntityTemplateData(file: File): void {
    this.store.dispatch(TestEntityTemplateAction.importTestEntityTemplateData({ file }));
  }
}
