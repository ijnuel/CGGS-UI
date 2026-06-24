import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { PaymentGatewaySetupFacade } from '../../../store/payment-gateway-setup/payment-gateway-setup.facade';
import { SharedFacade } from '../../../store/shared/shared.facade';
import * as PaymentGatewaySetupAction from '../../../store/payment-gateway-setup/payment-gateway-setup.actions';
import { PaymentGatewaySetupListInterface } from '../../../types/payment-gateway-setup';
import { PaginatedResponseInterface, PageQueryInterface, DropdownListInterface } from '../../../types';
import { TableHeaderInterface } from '../../../types/table';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastNotificationService, NotificationTypeEnums } from '../../../services/toast-notification.service';
import { CreateUpdatePaymentGatewaySetupComponent, PaymentGatewaySetupDialogData } from './create-update-payment-gateway-setup/create-update-payment-gateway-setup.component';

function maskSecret(val: string | undefined | null): string {
  if (!val) return '—';
  if (val.length <= 8) return '••••••••';
  return val.slice(0, 4) + '••••' + val.slice(-4);
}

@Component({
  selector: 'app-payment-gateway-setup',
  templateUrl: './payment-gateway-setup.component.html',
  styleUrls: ['./payment-gateway-setup.component.scss'],
})
export class PaymentGatewaySetupComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private gatewayNameMap = new Map<number, string>();

  list$: Observable<PaginatedResponseInterface<PaymentGatewaySetupListInterface[]> | null>;
  loading$: Observable<boolean>;

  tableHeaderData: TableHeaderInterface[] = [
    {
      key: 'gateway', type: 'text', name: 'Gateway', sortable: false, filterable: false, align: 'left',
      format: (v: number) => this.gatewayNameMap.get(v) ?? `Gateway ${v}`,
    },
    {
      key: 'secretKey', type: 'text', name: 'Secret Key', sortable: false, filterable: false, align: 'left',
      format: (_: any, row: PaymentGatewaySetupListInterface) => maskSecret(row.secretKey),
    },
    {
      key: 'publicKey', type: 'text', name: 'API / Public Key', sortable: false, filterable: false, align: 'left',
      format: (_: any, row: PaymentGatewaySetupListInterface) => maskSecret(row.publicKey),
    },
    {
      key: 'isActive', type: 'text', name: 'Active', sortable: false, filterable: false, align: 'center',
      format: (v: boolean) => v ? 'Yes' : 'No',
    },
  ];

  private lastQuery: PageQueryInterface = {
    start: 0, recordsPerPage: 10, pageIndex: 0,
    sortProperties: [{ name: 'id', isDescending: true }],
  };

  constructor(
    private facade: PaymentGatewaySetupFacade,
    private sharedFacade: SharedFacade,
    private actions$: Actions,
    private dialog: MatDialog,
    private toastService: ToastNotificationService,
  ) {
    this.list$ = this.facade.paymentGatewaySetupList$;
    this.loading$ = this.facade.loading$;

    this.actions$.pipe(ofType(PaymentGatewaySetupAction.deletePaymentGatewaySetupSuccess), takeUntil(this.destroy$))
      .subscribe(() => {
        this.toastService.openToast('Payment gateway setup deleted', NotificationTypeEnums.SUCCESS);
        this.facade.getPaymentGatewaySetupList(this.lastQuery);
      });

    this.actions$.pipe(ofType(PaymentGatewaySetupAction.deletePaymentGatewaySetupFail), takeUntil(this.destroy$))
      .subscribe(() => this.toastService.openToast('Failed to delete payment gateway setup', NotificationTypeEnums.ERROR));
  }

  ngOnInit() {
    this.sharedFacade.getPaymentGatewayList();
    this.sharedFacade.selectPaymentGatewayList$.pipe(takeUntil(this.destroy$)).subscribe((list: DropdownListInterface[] | null) => {
      this.gatewayNameMap = new Map((list ?? []).map(g => [+g.value, g.name]));
    });
    this.facade.getPaymentGatewaySetupList(this.lastQuery);
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  onRefresh() { this.facade.getPaymentGatewaySetupList(this.lastQuery); }

  openCreate() { this.openDialog(); }

  onEdit(row: PaymentGatewaySetupListInterface) { this.openDialog(row.id); }

  private openDialog(id?: string) {
    const ref = this.dialog.open(CreateUpdatePaymentGatewaySetupComponent, {
      width: '600px',
      maxWidth: '95vw',
      data: { id } as PaymentGatewaySetupDialogData,
    });
    ref.afterClosed().subscribe(result => {
      if (result?.success) this.facade.getPaymentGatewaySetupList(this.lastQuery);
    });
  }

  onDelete(row: PaymentGatewaySetupListInterface) {
    const gatewayName = this.gatewayNameMap.get(row.gateway) ?? `Gateway ${row.gateway}`;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Payment Gateway Setup',
        message: `Are you sure you want to delete the ${gatewayName} setup?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.facade.deletePaymentGatewaySetup(row.id);
    });
  }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = {
      ...query,
      sortProperties: query.sortProperties?.length ? query.sortProperties : this.lastQuery.sortProperties,
    };
    this.facade.getPaymentGatewaySetupList(this.lastQuery);
  }
}
