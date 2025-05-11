import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as StateActions from './state.actions';
import * as StateSelector from './state.selector';
import { PageQueryInterface, StateFormInterface } from '../../types';

@Injectable()
export class StateFacade {
  selectStateList$ = this.store.pipe(
    select(StateSelector.selectStateList)
  );

  selectStateById$ = this.store.pipe(
    select(StateSelector.selectStateById)
  );

  selectedLoading$ = this.store.pipe(select(StateSelector.selectLoading));

  selectedError$ = this.store.pipe(select(StateSelector.selectError));

  constructor(private readonly store: Store) {}

  getStateList(pageQuery: PageQueryInterface) {
    this.store.dispatch(StateActions.getStateList({ pageQuery }));
  }

  getStateById(stateId: string) {
    this.store.dispatch(StateActions.getStateById({ stateId }));
  }

  createState(payload: StateFormInterface) {
    this.store.dispatch(StateActions.createState({ payload }));
  }

  updateState(payload: StateFormInterface) {
    this.store.dispatch(StateActions.editState({ payload }));
  }
}
