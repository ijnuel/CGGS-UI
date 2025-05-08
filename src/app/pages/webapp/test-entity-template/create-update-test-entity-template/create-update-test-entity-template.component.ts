import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TestEntityTemplateFacade } from '../../../../store/test-entity-template/test-entity-template.facade';

@Component({
    selector: 'app-create-update-test-entity-template',
    templateUrl: './create-update-test-entity-template.component.html',
    styleUrl: './create-update-test-entity-template.component.scss',
})
export class CreateUpdateTestEntityTemplateComponent {
  loading$: Observable<boolean>;

    constructor(private testEntityTemplateFacade: TestEntityTemplateFacade) {
      this.loading$ = this.testEntityTemplateFacade.selectedLoading$;
  }
}
