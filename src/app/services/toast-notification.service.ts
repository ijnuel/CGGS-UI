import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

export enum NotificationTypeEnums {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  LOADING = 'loading',
}

const TOAST_STYLES: Partial<Record<NotificationTypeEnums, Record<string, string>>> = {
  [NotificationTypeEnums.SUCCESS]: {
    background: '#f0fdf4',
    color: '#166534',
    borderLeft: '4px solid #22c55e',
  },
  [NotificationTypeEnums.ERROR]: {
    background: '#fef2f2',
    color: '#991b1b',
    borderLeft: '4px solid #ef4444',
  },
  [NotificationTypeEnums.WARNING]: {
    background: '#fffbeb',
    color: '#92400e',
    borderLeft: '4px solid #f59e0b',
  },
  [NotificationTypeEnums.INFO]: {
    background: '#eff6ff',
    color: '#1e40af',
    borderLeft: '4px solid #3b82f6',
  },
};

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
    const style = TOAST_STYLES[notificationType] ?? {};
    (this.toast as any)[notificationType.toString()](message, {
      style,
      className: 'app-toast',
      ...(doNotDismiss ? { duration: Infinity, dismissible: true } : {}),
    });
  }
}
