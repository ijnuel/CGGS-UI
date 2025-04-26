import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as TestEntityTemplateActions from './test-entity-template.actions';
import * as TestEntityTemplateSelector from './test-entity-template.selector';
import { PageQueryInterface, TestEntityTemplateFormInterface } from '../../types';

@Injectable()
export class TestEntityTemplateFacade {
  selectTestEntityTemplateList$ = this.store.pipe(
    select(TestEntityTemplateSelector.selectTestEntityTemplateList)
  );

  selectTestEntityTemplateById$ = this.store.pipe(
    select(TestEntityTemplateSelector.selectTestEntityTemplateById)
  );

  selectedLoading$ = this.store.pipe(select(TestEntityTemplateSelector.selectLoading));

  selectedError$ = this.store.pipe(select(TestEntityTemplateSelector.selectError));

  constructor(private readonly store: Store) {}

  getTestEntityTemplateList(pageQuery: PageQueryInterface) {
    this.store.dispatch(TestEntityTemplateActions.getTestEntityTemplateList({ pageQuery }));
  }

  getTestEntityTemplateById(testEntityTemplateId: string) {
    this.store.dispatch(TestEntityTemplateActions.getTestEntityTemplateById({ testEntityTemplateId }));
  }

  createTestEntityTemplate(payload: TestEntityTemplateFormInterface) {
    this.store.dispatch(TestEntityTemplateActions.createTestEntityTemplate({ payload }));
  }

  updateTestEntityTemplate(payload: TestEntityTemplateFormInterface) {
    this.store.dispatch(TestEntityTemplateActions.editTestEntityTemplate({ payload }));
  }
}
