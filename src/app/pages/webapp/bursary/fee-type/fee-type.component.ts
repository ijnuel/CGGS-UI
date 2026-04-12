import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FeeTypeFacade } from '../../../../store/fee-type/fee-type.facade';
import { FeeTypeListInterface, PaginatedResponseInterface, PageQueryInterface } from '../../../../types';
import { TableHeaderInterface } from '../../../../types/table';

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
    private router: Router,
    private route: ActivatedRoute,
    private feeTypeFacade: FeeTypeFacade,
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

  onEdit(row: FeeTypeListInterface) {
    this.router.navigate(['fee-type/edit', row.id], { relativeTo: this.route.parent });
  }
}
