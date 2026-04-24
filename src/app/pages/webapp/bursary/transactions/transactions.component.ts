import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TransactionFacade } from '../../../../store/transaction/transaction.facade';
import { TransactionListInterface } from '../../../../types/transaction';
import { PaginatedResponseInterface, PageQueryInterface } from '../../../../types';
import { TableHeaderInterface } from '../../../../types/table';

const tableHeader: TableHeaderInterface[] = [
  { key: 'reference', type: 'text', name: 'Reference', sortable: false, filterable: false, align: 'left', format: (v: string) => v ?? '—' },
  { key: 'amount', type: 'text', name: 'Amount (₦)', sortable: true, filterable: false, align: 'right', format: (v: number) => v?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) ?? '0.00' },
  { key: 'statusString', type: 'text', name: 'Status', sortable: false, filterable: false, align: 'left', format: (v: string) => v ?? '—' },
  { key: 'gatewayString', type: 'text', name: 'Gateway', sortable: false, filterable: false, align: 'left', format: (v: string) => v ?? '—' },
  { key: 'gatewayReference', type: 'text', name: 'Gateway Reference', sortable: false, filterable: false, align: 'left', format: (v: string) => v ?? '—' },
  { key: 'payerName', type: 'text', name: 'Payer Name', sortable: false, filterable: false, align: 'left', format: (v: string) => v ?? '—' },
  { key: 'payerEmail', type: 'text', name: 'Payer Email', sortable: false, filterable: false, align: 'left', format: (v: string) => v ?? '—' },
  { key: 'paidAt', type: 'text', name: 'Paid At', sortable: true, filterable: false, align: 'left', format: (v: string) => v ? new Date(v).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' }) : '—' },
];

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  transactionList$: Observable<PaginatedResponseInterface<TransactionListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;

  private lastQuery: PageQueryInterface = {
    start: 0, recordsPerPage: 10, pageIndex: 0,
    sortProperties: [{ name: 'paidAt', isDescending: true }],
  };

  constructor(
    private transactionFacade: TransactionFacade,
    private router: Router,
  ) {
    this.transactionList$ = this.transactionFacade.transactionList$;
    this.loading$ = this.transactionFacade.loading$;
  }

  ngOnInit() {
    this.transactionFacade.getTransactionList(this.lastQuery);
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = {
      ...query,
      sortProperties: query.sortProperties?.length ? query.sortProperties : this.lastQuery.sortProperties,
    };
    this.transactionFacade.getTransactionList(this.lastQuery);
  }

  onView(row: TransactionListInterface) {
    this.router.navigate(['/app/bursary/transactions', row.id]);
  }

  onRefresh() { this.transactionFacade.getTransactionList(this.lastQuery); }
}
