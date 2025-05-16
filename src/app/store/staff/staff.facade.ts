import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as StaffActions from './staff.actions';
import * as StaffSelector from './staff.selector';
import { PageQueryInterface, StaffFormInterface } from '../../types';

@Injectable()
export class StaffFacade {
  selectStaffList$ = this.store.pipe(
    select(StaffSelector.selectStaffList)
  );

  selectStaffById$ = this.store.pipe(
    select(StaffSelector.selectStaffById)
  );

  selectedLoading$ = this.store.pipe(select(StaffSelector.selectLoading));

  selectedError$ = this.store.pipe(select(StaffSelector.selectError));

  constructor(private readonly store: Store) {}

  getStaffList(pageQuery: PageQueryInterface) {
    this.store.dispatch(StaffActions.getStaffList({ pageQuery }));
  }

  getStaffById(staffId: string) {
    this.store.dispatch(StaffActions.getStaffById({ staffId }));
  }

  createStaff(payload: StaffFormInterface) {
    this.store.dispatch(StaffActions.createStaff({ payload }));
  }

  updateStaff(payload: StaffFormInterface) {
    this.store.dispatch(StaffActions.editStaff({ payload }));
  }
}
