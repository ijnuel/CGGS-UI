import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TestEntityTemplateFacade } from '../../../../store/test-entity-template/test-entity-template.facade';
import { TestEntityTemplateFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-test-entity-template',
  templateUrl: './view-test-entity-template.component.html',
  styleUrls: ['./view-test-entity-template.component.scss'],
})
export class ViewTestEntityTemplateComponent implements OnInit {
  testEntityTemplate$: Observable<TestEntityTemplateFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private testEntityTemplateFacade: TestEntityTemplateFacade,
    private router: Router
  ) {
    this.testEntityTemplate$ = this.testEntityTemplateFacade.testEntityTemplateById$;
  }

  ngOnInit() {
    const testEntityTemplateId = this.route.snapshot.params['id'];
    if (testEntityTemplateId) {
      this.testEntityTemplateFacade.getTestEntityTemplateById(testEntityTemplateId);
    }
  }
} 