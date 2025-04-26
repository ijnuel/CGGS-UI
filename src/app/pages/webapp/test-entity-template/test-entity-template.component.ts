import { Component, OnInit } from '@angular/core';
import { tableHeader } from './table-header';
import { TestEntityTemplateFacade } from '../../../store/test-entity-template/test-entity-template.facade';
import { Observable } from 'rxjs';
import {
  PageQueryInterface,
  PaginatedResponseInterface,
  TestEntityTemplateListInterface,
} from '../../../types';

@Component({
    selector: 'app-test-entity-template',
    templateUrl: './test-entity-template.component.html',
    styleUrl: './test-entity-template.component.scss',
})
export class TestEntityTemplateComponent implements OnInit {
  header = tableHeader;
  pageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 15,
  };
  testEntityTemplateList$: Observable<PaginatedResponseInterface<
    TestEntityTemplateListInterface[]
  > | null>;
  loading$: Observable<boolean>;

  constructor(private testEntityTemplateFacade: TestEntityTemplateFacade) {
    this.testEntityTemplateList$ = this.testEntityTemplateFacade.selectTestEntityTemplateList$;
    this.loading$ = this.testEntityTemplateFacade.selectedLoading$;
  }

  ngOnInit() {
    this.testEntityTemplateFacade.getTestEntityTemplateList(this.pageQuery);
  }
}
