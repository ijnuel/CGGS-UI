import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ApplicationActions from './application.actions';
import * as ApplicationSelector from './application.selector';
import { PageQueryInterface, ApplicationFormInterface } from '../../types';

@Injectable()
export class ApplicationFacade {
  selectApplicationList$ = this.store.pipe(
    select(ApplicationSelector.selectApplicationList)
  );

  selectApplicationById$ = this.store.pipe(
    select(ApplicationSelector.selectApplicationById)
  );

  selectedLoading$ = this.store.pipe(select(ApplicationSelector.selectLoading));

  selectedError$ = this.store.pipe(select(ApplicationSelector.selectError));

  constructor(private readonly store: Store) {}

  getApplicationList(pageQuery: PageQueryInterface) {
    this.store.dispatch(ApplicationActions.getApplicationList({ pageQuery }));
  }

  getApplicationById(applicationId: string) {
    this.store.dispatch(ApplicationActions.getApplicationById({ applicationId }));
  }

  createApplication(payload: ApplicationFormInterface) {
    this.store.dispatch(ApplicationActions.createApplication({ payload }));
  }

  updateApplication(payload: ApplicationFormInterface) {
    this.store.dispatch(ApplicationActions.editApplication({ payload }));
  }
}
