import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

export enum NotificationTypeEnums {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  LOADING = 'loading',
}

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  constructor(private toast: HotToastService) {}

  openToast(
    message: string,
    notificationType: NotificationTypeEnums,
    doNotDismiss: boolean = false
  ) {
    (this.toast as any)[notificationType.toString()](message);
  }
}
