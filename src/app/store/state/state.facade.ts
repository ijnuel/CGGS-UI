import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  StateListInterface,
  StateFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as StateAction from './state.actions';
import {
  selectStateList,
  selectStateAll,
  selectStateByProperties,
  selectStateById,
  selectExists,
  selectCount,
  selectStateLoading,
  selectStateError,
  selectStateCreateSuccess,
  selectStateUpdateSuccess,
} from './state.selector';
import { StateState } from './state.reducer';

@Injectable({
  providedIn: 'root',
})
export class StateFacade {
  stateList$: Observable<PaginatedResponseInterface<StateListInterface[]> | null>;
  stateAll$: Observable<StateListInterface[] | null>;
  stateByProperties$: Observable<StateListInterface[] | null>;
  stateById$: Observable<StateListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ state: StateState }>) {
    this.stateList$ = this.store.select(selectStateList);
    this.stateAll$ = this.store.select(selectStateAll);
    this.stateByProperties$ = this.store.select(selectStateByProperties);
    this.stateById$ = this.store.select(selectStateById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectStateLoading);
    this.error$ = this.store.select(selectStateError);
    this.createSuccess$ = this.store.select(selectStateCreateSuccess);
    this.updateSuccess$ = this.store.select(selectStateUpdateSuccess);
  }

  getStateList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(StateAction.getStateList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getStateAll(query?: QueryInterface): void {
    this.store.dispatch(StateAction.getStateAll({ query }));
  }

  getStateById(stateId: string): void {
    this.store.dispatch(StateAction.getStateById({ stateId }));
  }

  getStateByProperties(properties: Partial<StateFormInterface>): void {
    this.store.dispatch(StateAction.getStateByProperties({ properties }));
  }

  stateExists(properties: Partial<StateFormInterface>): void {
    this.store.dispatch(StateAction.stateExists({ properties }));
  }

  stateCount(): void {
    this.store.dispatch(StateAction.stateCount());
  }

  createState(state: StateFormInterface): void {
    this.store.dispatch(StateAction.createState({ payload: state }));
  }

  updateState(state: StateFormInterface): void {
    this.store.dispatch(StateAction.updateState({ payload: state }));
  }

  deleteState(stateId: string): void {
    this.store.dispatch(StateAction.deleteState({ stateId }));
  }

  createManyStates(states: StateFormInterface[]): void {
    this.store.dispatch(StateAction.createManyStates({ payload: states }));
  }

  updateManyStates(states: StateFormInterface[]): void {
    this.store.dispatch(StateAction.updateManyStates({ payload: states }));
  }

  deleteManyStates(stateIds: string[]): void {
    this.store.dispatch(StateAction.deleteManyStates({ stateIds }));
  }
}
