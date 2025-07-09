import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ApplicationListInterface,
  ApplicationFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as ApplicationAction from './application.actions';
import {
  selectApplicationList,
  selectApplicationAll,
  selectApplicationByProperties,
  selectApplicationById,
  selectExists,
  selectCount,
  selectApplicationLoading,
  selectApplicationError,
  selectApplicationCreateSuccess,
  selectApplicationUpdateSuccess,
} from './application.selector';
import { ApplicationState } from './application.reducer';

@Injectable({
  providedIn: 'root',
})
export class ApplicationFacade {
  applicationList$: Observable<PaginatedResponseInterface<ApplicationListInterface[]> | null>;
  applicationAll$: Observable<ApplicationListInterface[] | null>;
  applicationByProperties$: Observable<ApplicationListInterface[] | null>;
  applicationById$: Observable<ApplicationListInterface | null>;
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

  constructor(private store: Store<{ application: ApplicationState }>) {
    this.applicationList$ = this.store.select(selectApplicationList);
    this.applicationAll$ = this.store.select(selectApplicationAll);
    this.applicationByProperties$ = this.store.select(selectApplicationByProperties);
    this.applicationById$ = this.store.select(selectApplicationById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectApplicationLoading);
    this.error$ = this.store.select(selectApplicationError);
    this.createSuccess$ = this.store.select(selectApplicationCreateSuccess);
    this.updateSuccess$ = this.store.select(selectApplicationUpdateSuccess);
  }

  getApplicationList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(ApplicationAction.getApplicationList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getApplicationAll(): void {
    this.store.dispatch(ApplicationAction.getApplicationAll());
  }

  getApplicationById(applicationId: string): void {
    this.store.dispatch(ApplicationAction.getApplicationById({ applicationId }));
  }

  getApplicationByProperties(properties: Partial<ApplicationFormInterface>): void {
    this.store.dispatch(ApplicationAction.getApplicationByProperties({ properties }));
  }

  applicationExists(properties: Partial<ApplicationFormInterface>): void {
    this.store.dispatch(ApplicationAction.applicationExists({ properties }));
  }

  applicationCount(): void {
    this.store.dispatch(ApplicationAction.applicationCount());
  }

  createApplication(application: ApplicationFormInterface): void {
    this.store.dispatch(ApplicationAction.createApplication({ payload: application }));
  }

  updateApplication(application: ApplicationFormInterface): void {
    this.store.dispatch(ApplicationAction.updateApplication({ payload: application }));
  }

  deleteApplication(applicationId: string): void {
    this.store.dispatch(ApplicationAction.deleteApplication({ applicationId }));
  }

  createManyApplications(applications: ApplicationFormInterface[]): void {
    this.store.dispatch(ApplicationAction.createManyApplications({ payload: applications }));
  }

  updateManyApplications(applications: ApplicationFormInterface[]): void {
    this.store.dispatch(ApplicationAction.updateManyApplications({ payload: applications }));
  }

  deleteManyApplications(applicationIds: string[]): void {
    this.store.dispatch(ApplicationAction.deleteManyApplications({ applicationIds }));
  }
}
