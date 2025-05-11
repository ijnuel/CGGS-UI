import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as SchoolConfigurationActions from './school-configuration.actions';
import * as SchoolConfigurationSelector from './school-configuration.selector';
import { PageQueryInterface, SchoolConfigurationFormInterface } from '../../types';

@Injectable()
export class SchoolConfigurationFacade {
  selectSchoolConfigurationList$ = this.store.pipe(
    select(SchoolConfigurationSelector.selectSchoolConfigurationList)
  );

  selectSchoolConfigurationById$ = this.store.pipe(
    select(SchoolConfigurationSelector.selectSchoolConfigurationById)
  );

  selectedLoading$ = this.store.pipe(select(SchoolConfigurationSelector.selectLoading));

  selectedError$ = this.store.pipe(select(SchoolConfigurationSelector.selectError));

  constructor(private readonly store: Store) {}

  getSchoolConfigurationList(pageQuery: PageQueryInterface) {
    this.store.dispatch(SchoolConfigurationActions.getSchoolConfigurationList({ pageQuery }));
  }

  getSchoolConfigurationById(schoolConfigurationId: string) {
    this.store.dispatch(SchoolConfigurationActions.getSchoolConfigurationById({ schoolConfigurationId }));
  }

  createSchoolConfiguration(payload: SchoolConfigurationFormInterface) {
    this.store.dispatch(SchoolConfigurationActions.createSchoolConfiguration({ payload }));
  }

  updateSchoolConfiguration(payload: SchoolConfigurationFormInterface) {
    this.store.dispatch(SchoolConfigurationActions.editSchoolConfiguration({ payload }));
  }
}
