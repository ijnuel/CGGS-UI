import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as GlobalLoadingActions from './global-loading.actions';
import * as GlobalLoadingSelectors from './global-loading.reducer';

@Injectable()
export class GlobalLoadingFacade {
  selectGlobalLoading$ = this.store.pipe(
    select(GlobalLoadingSelectors.selectGlobalLoading)
  );

  constructor(private readonly store: Store) {}

  globalLoadingShow(actionType: string, message?: string) {
    this.store.dispatch(
      GlobalLoadingActions.globalLoadingShow({ message, actionType })
    );
  }

  globalLoadingHide() {
    this.store.dispatch(GlobalLoadingActions.globalLoadingHide());
  }
}
