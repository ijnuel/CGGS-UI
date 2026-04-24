import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FeeTypeFacade } from '../../../../store/fee-type/fee-type.facade';
import { FeeTypeListInterface, PaginatedResponseInterface, PageQueryInterface } from '../../../../types';
import { TableHeaderInterface } from '../../../../types/table';
import { CreateUpdateFeeTypeComponent, FeeTypeDialogData } from './create-update-fee-type/create-update-fee-type.component';

const tableHeader: TableHeaderInterface[] = [
  { key: 'name', type: 'text', name: 'Name', sortable: true, filterable: true, align: 'left' },
  { key: 'description', type: 'text', name: 'Description', sortable: false, filterable: false, align: 'left' },
  { key: 'createdByDefault', type: 'text', name: 'Default', sortable: false, filterable: false, align: 'center', format: (v: boolean) => v ? 'Yes' : 'No' },
  { key: 'compulsory', type: 'text', name: 'Compulsory', sortable: false, filterable: false, align: 'center', format: (v: boolean) => v ? 'Yes' : 'No' },
];

@Component({
  selector: 'app-fee-type',
  templateUrl: './fee-type.component.html',
  styleUrls: ['./fee-type.component.scss'],
})
export class FeeTypeComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  feeTypeList$: Observable<PaginatedResponseInterface<FeeTypeListInterface[]> | null>;
  loading$: Observable<boolean>;
  tableHeaderData: TableHeaderInterface[] = tableHeader;
  private lastQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0 };

  constructor(
    private feeTypeFacade: FeeTypeFacade,
    private dialog: MatDialog,
  ) {
    this.feeTypeList$ = this.feeTypeFacade.feeTypeList$;
    this.loading$ = this.feeTypeFacade.loading$;
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

  onQueryChange(query: PageQueryInterface) {
    this.lastQuery = query;
    this.feeTypeFacade.getFeeTypeList(query);
  }

  onRefresh() { this.feeTypeFacade.getFeeTypeList(this.lastQuery); }

  onEdit(row: FeeTypeListInterface) { this.openDialog(row.id); }

  openCreate() { this.openDialog(); }

  private openDialog(id?: string) {
    const ref = this.dialog.open(CreateUpdateFeeTypeComponent, {
      width: '480px',
      maxWidth: '95vw',
      data: { id } as FeeTypeDialogData,
    });
    ref.afterClosed().subscribe(result => {
      if (result?.success) this.feeTypeFacade.getFeeTypeList(this.lastQuery);
    });
  }
}
