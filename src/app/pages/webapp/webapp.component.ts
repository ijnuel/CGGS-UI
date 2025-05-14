import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalLoadingFacade } from '../../store/global-loading/global-loading.facade';
import {
  NotificationTypeEnums,
  ToastNotificationService,
} from '../../services/toast-notification.service';
import { Subject } from 'rxjs';
import { AuthFacade } from '../../store/auth/auth.facade';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrl: './webapp.component.scss',
})
export class WebappComponent implements OnInit, OnDestroy {
  globalLoading$ = this.globalLoadingFacade.selectGlobalLoading$;
  globalError$ = this.globalLoadingFacade.selectGlobalError$;
  toggleSidebarState: 'close' | 'open' = 'close';
  destroyed$ = new Subject<void>();

  constructor(
    private globalLoadingFacade: GlobalLoadingFacade,
    private toastNotification: ToastNotificationService, 
    private authFacade: AuthFacade
  ) {
    this.globalError$.subscribe((errorMessage) => {
      if (!errorMessage) return;

      this.toastNotification.openToast(
        errorMessage,
        NotificationTypeEnums.ERROR
      );
    });
  }
  
  ngOnInit(): void {
    this.authFacade.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  topbarToggleSidebar(state: { toggle: boolean }) {
    this.toggleSideBar(state.toggle);
  }

  toggleSideBar(toggle: boolean) {
    toggle
      ? (this.toggleSidebarState = 'open')
      : (this.toggleSidebarState = 'close');
  }

  sideBarMenuItemClick() {
    this.toggleSideBar(false);
  }
}
