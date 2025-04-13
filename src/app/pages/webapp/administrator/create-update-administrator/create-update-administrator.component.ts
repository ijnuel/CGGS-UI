import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AdministratorFacade } from '../../../../store/administrator/administrator.facade';

@Component({
    selector: 'app-create-update-administrator',
    templateUrl: './create-update-administrator.component.html',
    styleUrl: './create-update-administrator.component.scss',
})
export class CreateUpdateAdministratorComponent {
  loading$: Observable<boolean>;

    constructor(private administratorFacade: AdministratorFacade) {
      this.loading$ = this.administratorFacade.selectedLoading$;
  }
}
