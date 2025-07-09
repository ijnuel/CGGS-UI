import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  SchoolConfigurationListInterface,
  SchoolConfigurationFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as SchoolConfigurationAction from './school-configuration.actions';
import {
  selectSchoolConfigurationList,
  selectSchoolConfigurationAll,
  selectSchoolConfigurationByProperties,
  selectSchoolConfigurationById,
  selectExists,
  selectCount,
  selectSchoolConfigurationLoading,
  selectSchoolConfigurationError,
  selectSchoolConfigurationCreateSuccess,
  selectSchoolConfigurationUpdateSuccess,
} from './school-configuration.selector';
import { SchoolConfigurationState } from './school-configuration.reducer';

@Injectable({
  providedIn: 'root',
})
export class SchoolConfigurationFacade {
  schoolConfigurationList$: Observable<PaginatedResponseInterface<SchoolConfigurationListInterface[]> | null>;
  schoolConfigurationAll$: Observable<SchoolConfigurationListInterface[] | null>;
  schoolConfigurationByProperties$: Observable<SchoolConfigurationListInterface[] | null>;
  schoolConfigurationById$: Observable<SchoolConfigurationListInterface | null>;
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

  constructor(private store: Store<{ schoolConfiguration: SchoolConfigurationState }>) {
    this.schoolConfigurationList$ = this.store.select(selectSchoolConfigurationList);
    this.schoolConfigurationAll$ = this.store.select(selectSchoolConfigurationAll);
    this.schoolConfigurationByProperties$ = this.store.select(selectSchoolConfigurationByProperties);
    this.schoolConfigurationById$ = this.store.select(selectSchoolConfigurationById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectSchoolConfigurationLoading);
    this.error$ = this.store.select(selectSchoolConfigurationError);
    this.createSuccess$ = this.store.select(selectSchoolConfigurationCreateSuccess);
    this.updateSuccess$ = this.store.select(selectSchoolConfigurationUpdateSuccess);
  }

  getSchoolConfigurationList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(SchoolConfigurationAction.getSchoolConfigurationList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getSchoolConfigurationAll(): void {
    this.store.dispatch(SchoolConfigurationAction.getSchoolConfigurationAll());
  }

  getSchoolConfigurationById(schoolConfigurationId: string): void {
    this.store.dispatch(SchoolConfigurationAction.getSchoolConfigurationById({ schoolConfigurationId }));
  }

  getSchoolConfigurationByProperties(properties: Partial<SchoolConfigurationFormInterface>): void {
    this.store.dispatch(SchoolConfigurationAction.getSchoolConfigurationByProperties({ properties }));
  }

  schoolConfigurationExists(properties: Partial<SchoolConfigurationFormInterface>): void {
    this.store.dispatch(SchoolConfigurationAction.schoolConfigurationExists({ properties }));
  }

  schoolConfigurationCount(): void {
    this.store.dispatch(SchoolConfigurationAction.schoolConfigurationCount());
  }

  createSchoolConfiguration(schoolConfiguration: SchoolConfigurationFormInterface): void {
    this.store.dispatch(SchoolConfigurationAction.createSchoolConfiguration({ payload: schoolConfiguration }));
  }

  updateSchoolConfiguration(schoolConfiguration: SchoolConfigurationFormInterface): void {
    this.store.dispatch(SchoolConfigurationAction.updateSchoolConfiguration({ payload: schoolConfiguration }));
  }

  deleteSchoolConfiguration(schoolConfigurationId: string): void {
    this.store.dispatch(SchoolConfigurationAction.deleteSchoolConfiguration({ schoolConfigurationId }));
  }

  createManySchoolConfigurations(schoolConfigurations: SchoolConfigurationFormInterface[]): void {
    this.store.dispatch(SchoolConfigurationAction.createManySchoolConfigurations({ payload: schoolConfigurations }));
  }

  updateManySchoolConfigurations(schoolConfigurations: SchoolConfigurationFormInterface[]): void {
    this.store.dispatch(SchoolConfigurationAction.updateManySchoolConfigurations({ payload: schoolConfigurations }));
  }

  deleteManySchoolConfigurations(schoolConfigurationIds: string[]): void {
    this.store.dispatch(SchoolConfigurationAction.deleteManySchoolConfigurations({ schoolConfigurationIds }));
  }
}
