import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  LocalGovernmentAreaListInterface,
  LocalGovernmentAreaFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as LocalGovernmentAreaAction from './local-government-area.actions';
import {
  selectLocalGovernmentAreaList,
  selectLocalGovernmentAreaAll,
  selectLocalGovernmentAreaByProperties,
  selectLocalGovernmentAreaById,
  selectExists,
  selectCount,
  selectLocalGovernmentAreaLoading,
  selectLocalGovernmentAreaError,
  selectLocalGovernmentAreaCreateSuccess,
  selectLocalGovernmentAreaUpdateSuccess,
} from './local-government-area.selector';
import { LocalGovernmentAreaState } from './local-government-area.reducer';

@Injectable({
  providedIn: 'root',
})
export class LocalGovernmentAreaFacade {
  localGovernmentAreaList$: Observable<PaginatedResponseInterface<LocalGovernmentAreaListInterface[]> | null>;
  localGovernmentAreaAll$: Observable<LocalGovernmentAreaListInterface[] | null>;
  localGovernmentAreaByProperties$: Observable<LocalGovernmentAreaListInterface[] | null>;
  localGovernmentAreaById$: Observable<LocalGovernmentAreaListInterface | null>;
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

  constructor(private store: Store<{ localGovernmentArea: LocalGovernmentAreaState }>) {
    this.localGovernmentAreaList$ = this.store.select(selectLocalGovernmentAreaList);
    this.localGovernmentAreaAll$ = this.store.select(selectLocalGovernmentAreaAll);
    this.localGovernmentAreaByProperties$ = this.store.select(selectLocalGovernmentAreaByProperties);
    this.localGovernmentAreaById$ = this.store.select(selectLocalGovernmentAreaById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectLocalGovernmentAreaLoading);
    this.error$ = this.store.select(selectLocalGovernmentAreaError);
    this.createSuccess$ = this.store.select(selectLocalGovernmentAreaCreateSuccess);
    this.updateSuccess$ = this.store.select(selectLocalGovernmentAreaUpdateSuccess);
  }

  getLocalGovernmentAreaList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(LocalGovernmentAreaAction.getLocalGovernmentAreaList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getLocalGovernmentAreaAll(query?: QueryInterface): void {
    this.store.dispatch(LocalGovernmentAreaAction.getLocalGovernmentAreaAll({ query }));
  }

  getLocalGovernmentAreaById(localGovernmentAreaId: string): void {
    this.store.dispatch(LocalGovernmentAreaAction.getLocalGovernmentAreaById({ localGovernmentAreaId }));
  }

  getLocalGovernmentAreaByProperties(properties: Partial<LocalGovernmentAreaFormInterface>): void {
    this.store.dispatch(LocalGovernmentAreaAction.getLocalGovernmentAreaByProperties({ properties }));
  }

  localGovernmentAreaExists(properties: Partial<LocalGovernmentAreaFormInterface>): void {
    this.store.dispatch(LocalGovernmentAreaAction.localGovernmentAreaExists({ properties }));
  }

  localGovernmentAreaCount(): void {
    this.store.dispatch(LocalGovernmentAreaAction.localGovernmentAreaCount());
  }

  createLocalGovernmentArea(localGovernmentArea: LocalGovernmentAreaFormInterface): void {
    this.store.dispatch(LocalGovernmentAreaAction.createLocalGovernmentArea({ payload: localGovernmentArea }));
  }

  updateLocalGovernmentArea(localGovernmentArea: LocalGovernmentAreaFormInterface): void {
    this.store.dispatch(LocalGovernmentAreaAction.updateLocalGovernmentArea({ payload: localGovernmentArea }));
  }

  deleteLocalGovernmentArea(localGovernmentAreaId: string): void {
    this.store.dispatch(LocalGovernmentAreaAction.deleteLocalGovernmentArea({ localGovernmentAreaId }));
  }

  createManyLocalGovernmentAreas(localGovernmentAreas: LocalGovernmentAreaFormInterface[]): void {
    this.store.dispatch(LocalGovernmentAreaAction.createManyLocalGovernmentAreas({ payload: localGovernmentAreas }));
  }

  updateManyLocalGovernmentAreas(localGovernmentAreas: LocalGovernmentAreaFormInterface[]): void {
    this.store.dispatch(LocalGovernmentAreaAction.updateManyLocalGovernmentAreas({ payload: localGovernmentAreas }));
  }

  deleteManyLocalGovernmentAreas(localGovernmentAreaIds: string[]): void {
    this.store.dispatch(LocalGovernmentAreaAction.deleteManyLocalGovernmentAreas({ localGovernmentAreaIds }));
  }
}
