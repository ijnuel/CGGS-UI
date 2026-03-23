import { Component } from '@angular/core';
import { GlobalLoadingFacade } from '../../store/global-loading/global-loading.facade';
import {
  NotificationTypeEnums,
  ToastNotificationService,
} from '../../services/toast-notification.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  env = environment;
  globalLoading$ = this.globalLoadingFacade.selectGlobalLoading$;
  globalError$ = this.globalLoadingFacade.selectGlobalError$;

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
}
