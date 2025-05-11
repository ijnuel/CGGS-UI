import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as LocalGovernmentAreaActions from './local-government-area.actions';
import * as LocalGovernmentAreaSelector from './local-government-area.selector';
import { PageQueryInterface, LocalGovernmentAreaFormInterface } from '../../types';

@Injectable()
export class LocalGovernmentAreaFacade {
  selectLocalGovernmentAreaList$ = this.store.pipe(
    select(LocalGovernmentAreaSelector.selectLocalGovernmentAreaList)
  );

  selectLocalGovernmentAreaById$ = this.store.pipe(
    select(LocalGovernmentAreaSelector.selectLocalGovernmentAreaById)
  );

  selectedLoading$ = this.store.pipe(select(LocalGovernmentAreaSelector.selectLoading));

  selectedError$ = this.store.pipe(select(LocalGovernmentAreaSelector.selectError));

  constructor(private readonly store: Store) {}

  getLocalGovernmentAreaList(pageQuery: PageQueryInterface) {
    this.store.dispatch(LocalGovernmentAreaActions.getLocalGovernmentAreaList({ pageQuery }));
  }

  getLocalGovernmentAreaById(localGovernmentAreaId: string) {
    this.store.dispatch(LocalGovernmentAreaActions.getLocalGovernmentAreaById({ localGovernmentAreaId }));
  }

  createLocalGovernmentArea(payload: LocalGovernmentAreaFormInterface) {
    this.store.dispatch(LocalGovernmentAreaActions.createLocalGovernmentArea({ payload }));
  }

  updateLocalGovernmentArea(payload: LocalGovernmentAreaFormInterface) {
    this.store.dispatch(LocalGovernmentAreaActions.editLocalGovernmentArea({ payload }));
  }
}
