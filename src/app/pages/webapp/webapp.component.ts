import { Component } from '@angular/core';
import { GlobalLoadingFacade } from '../../store/global-loading/global-loading.facade';
import {
  NotificationTypeEnums,
  ToastNotificationService,
} from '../../services/toast-notification.service';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrl: './webapp.component.scss',
})
export class WebappComponent {
  globalLoading$ = this.globalLoadingFacade.selectGlobalLoading$;
  globalError$ = this.globalLoadingFacade.selectGlobalError$;
  toggleSidebarState: 'close' | 'open' = 'close';

  constructor(
    private globalLoadingFacade: GlobalLoadingFacade,
    private toastNotification: ToastNotificationService
  ) {
    this.globalError$.subscribe((errorMessage) => {
      if (!errorMessage) return;

      this.toastNotification.openToast(
        errorMessage,
        NotificationTypeEnums.ERROR
      );
    });
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
