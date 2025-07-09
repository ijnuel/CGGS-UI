import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  StaffListInterface,
  StaffFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as StaffAction from './staff.actions';
import {
  selectStaffList,
  selectStaffAll,
  selectStaffByProperties,
  selectStaffById,
  selectExists,
  selectCount,
  selectStaffLoading,
  selectStaffError,
  selectStaffCreateSuccess,
  selectStaffUpdateSuccess,
} from './staff.selector';
import { StaffState } from './staff.reducer';

@Injectable({
  providedIn: 'root',
})
export class StaffFacade {
  staffList$: Observable<PaginatedResponseInterface<StaffListInterface[]> | null>;
  staffAll$: Observable<StaffListInterface[] | null>;
  staffByProperties$: Observable<StaffListInterface[] | null>;
  staffById$: Observable<StaffListInterface | null>;
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

  constructor(private store: Store<{ staff: StaffState }>) {
    this.staffList$ = this.store.select(selectStaffList);
    this.staffAll$ = this.store.select(selectStaffAll);
    this.staffByProperties$ = this.store.select(selectStaffByProperties);
    this.staffById$ = this.store.select(selectStaffById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectStaffLoading);
    this.error$ = this.store.select(selectStaffError);
    this.createSuccess$ = this.store.select(selectStaffCreateSuccess);
    this.updateSuccess$ = this.store.select(selectStaffUpdateSuccess);
  }

  getStaffList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(StaffAction.getStaffList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getStaffAll(): void {
    this.store.dispatch(StaffAction.getStaffAll());
  }

  getStaffById(staffId: string): void {
    this.store.dispatch(StaffAction.getStaffById({ staffId }));
  }

  getStaffByProperties(properties: Partial<StaffFormInterface>): void {
    this.store.dispatch(StaffAction.getStaffByProperties({ properties }));
  }

  staffExists(properties: Partial<StaffFormInterface>): void {
    this.store.dispatch(StaffAction.staffExists({ properties }));
  }

  staffCount(): void {
    this.store.dispatch(StaffAction.staffCount());
  }

  createStaff(staff: StaffFormInterface): void {
    this.store.dispatch(StaffAction.createStaff({ payload: staff }));
  }

  updateStaff(staff: StaffFormInterface): void {
    this.store.dispatch(StaffAction.updateStaff({ payload: staff }));
  }

  deleteStaff(staffId: string): void {
    this.store.dispatch(StaffAction.deleteStaff({ staffId }));
  }

  createManyStaffs(staffs: StaffFormInterface[]): void {
    this.store.dispatch(StaffAction.createManyStaffs({ payload: staffs }));
  }

  updateManyStaffs(staffs: StaffFormInterface[]): void {
    this.store.dispatch(StaffAction.updateManyStaffs({ payload: staffs }));
  }

  deleteManyStaffs(staffIds: string[]): void {
    this.store.dispatch(StaffAction.deleteManyStaffs({ staffIds }));
  }
}
