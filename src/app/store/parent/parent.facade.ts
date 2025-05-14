import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ParentActions from './parent.actions';
import * as ParentSelector from './parent.selector';
import { PageQueryInterface, ParentFormInterface } from '../../types';

@Injectable()
export class ParentFacade {
  selectParentList$ = this.store.pipe(
    select(ParentSelector.selectParentList)
  );

  selectParentById$ = this.store.pipe(
    select(ParentSelector.selectParentById)
  );

  selectedLoading$ = this.store.pipe(select(ParentSelector.selectLoading));

  selectedError$ = this.store.pipe(select(ParentSelector.selectError));

  constructor(private readonly store: Store) {}

  getParentList(pageQuery: PageQueryInterface) {
    this.store.dispatch(ParentActions.getParentList({ pageQuery }));
  }

  getParentById(parentId: string) {
    this.store.dispatch(ParentActions.getParentById({ parentId }));
  }

  createParent(payload: ParentFormInterface) {
    this.store.dispatch(ParentActions.createParent({ payload }));
  }

  updateParent(payload: ParentFormInterface) {
    this.store.dispatch(ParentActions.editParent({ payload }));
  }
}
