import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AdministratorActions from './administrator.actions';
import * as AdministratorSelector from './administrator.selector';
import { PageQueryInterface, AdministratorFormInterface } from '../../types';

@Injectable()
export class AdministratorFacade {
  selectAdministratorList$ = this.store.pipe(
    select(AdministratorSelector.selectAdministratorList)
  );

  selectAdministratorById$ = this.store.pipe(
    select(AdministratorSelector.selectAdministratorById)
  );

  selectedLoading$ = this.store.pipe(select(AdministratorSelector.selectLoading));

  selectedError$ = this.store.pipe(select(AdministratorSelector.selectError));

  selectedAdministrator$ = this.store.pipe(
    select(AdministratorSelector.selectAdministratorById)
  );

  createAdministratorSuccess$ = this.store.pipe(
    select((state: any) => state.administrator),
    select((state: any) => state && state.lastAction === '[Administrator/API] Create Administrator Success')
  );

  editAdministratorSuccess$ = this.store.pipe(
    select((state: any) => state.administrator),
    select((state: any) => state && state.lastAction === '[Administrator/API] Edit Administrator Success')
  );

  constructor(private readonly store: Store) {}

  getAdministratorList(pageQuery: PageQueryInterface) {
    this.store.dispatch(AdministratorActions.getAdministratorList({ pageQuery }));
  }

  getAdministratorById(administratorId: string) {
    this.store.dispatch(AdministratorActions.getAdministratorById({ administratorId }));
  }

  createAdministrator(payload: AdministratorFormInterface) {
    this.store.dispatch(AdministratorActions.createAdministrator({ payload }));
  }

  updateAdministrator(payload: AdministratorFormInterface) {
    this.store.dispatch(AdministratorActions.editAdministrator({ payload }));
  }

  deleteAdministrator(administratorId: string) {
    this.store.dispatch(AdministratorActions.deleteAdministrator({ administratorId }));
  }
}
