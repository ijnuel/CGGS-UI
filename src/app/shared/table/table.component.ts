import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeaderInterface, TableActionInterface } from '../../types/table';
import { PageEvent } from '@angular/material/paginator';
import { PageQueryInterface, QueryInterface, GenericResponseInterface } from '../../types';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  @Output() queryChange = new EventEmitter<PageQueryInterface>();
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  // Legacy outputs kept for backward compatibility
  @Output() pageChange = new EventEmitter<PageQueryInterface>();
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<{ name: string; value: string }[]>();

  @Input() totalLength = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() isLoading = false;
  @Input() showActionColumn = false;
  @Input() showViewIcon = true;
  @Input() showEditIcon = true;
  @Input() showDeleteIcon = true;
  @Input() showSearch = false;
  @Input() showPaginator = true;
  @Input() showFilters = false;
  @Input() showExport = false;
  @Input() exportEndpoint = '';
  @Input() exportQueryMerge: QueryInterface = {};
  @Input() exportFileName = 'export';
  @Input() tableData: any[] | null = [];
  @Input() tableHeaderData: TableHeaderInterface[] = [];
  @Input() customActions: TableActionInterface[] = [];
  @Output() customAction = new EventEmitter<{ key: string; row: any }>();

  filterForm: FormGroup;
  searchForm: FormGroup;
  displayedColumns: string[] = [];
  filterColumns: string[] = [];
  skeletonColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  readonly skeletonPredicate = (_: number, row: any) => !!row._skeleton;
  readonly dataPredicate = (_: number, row: any) => !row._skeleton;
  private readonly skeletonRows = Array(7).fill({ _skeleton: true });

  sortColumn: string | null = null;  // header.key — used for UI state
  sortKey: string | null = null;     // header.nestedKey ?? header.key — sent to API
  sortDescending = false;
  isExporting = false;

  internalPageIndex = 0;
  internalPageSize = 10;

  private initialized = false;
  private lastEmittedParams = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.filterForm = this.fb.group({});
    this.searchForm = this.fb.group({ search: [''] });
  }

  ngOnInit() {
    this.readFromUrl();
    this.initializeTable();
    this.initializeFilterForm();
    this.subscribeToFormChanges();
    this.initialized = true;
    setTimeout(() => this.updateUrlAndEmit(), 0);
  }

  ngOnChanges() {
    if (this.initialized) {
      this.dataSource.data = this.isLoading ? this.skeletonRows : (this.tableData || []);
    }
  }

  private readFromUrl() {
    const params = this.route.snapshot.queryParamMap;
    this.internalPageIndex = parseInt(params.get('page') || '0', 10);
    this.internalPageSize = parseInt(params.get('size') || String(this.pageSize), 10);
    this.sortColumn = params.get('sort') || null;
    this.sortDescending = params.get('dir') === 'desc';
    if (this.sortColumn) {
      const header = this.tableHeaderData.find(h => h.key === this.sortColumn);
      this.sortKey = header?.nestedKey || this.sortColumn;
    }
    const searchVal = params.get('search') || '';
    this.searchForm.get('search')!.setValue(searchVal, { emitEvent: false });
  }

  private initializeTable() {
    this.displayedColumns = this.tableHeaderData.map((h) => h.key);
    if (this.showActionColumn) this.displayedColumns.push('actions');
    this.filterColumns = this.displayedColumns.map((col) => 'filter_' + col);
    this.skeletonColumns = this.displayedColumns.map((col) => 'skeleton_' + col);
    this.dataSource.data = this.isLoading ? this.skeletonRows : (this.tableData || []);
  }

  private initializeFilterForm() {
    const params = this.route.snapshot.queryParamMap;
    const controls: { [key: string]: any } = {};
    this.tableHeaderData
      .filter((h) => h.filterable)
      .forEach((h) => {
        controls[h.key] = [params.get('col_' + h.key) || ''];
      });
    this.filterForm = this.fb.group(controls);
  }

  private subscribeToFormChanges() {
    [this.searchForm.get('search')!.valueChanges, this.filterForm.valueChanges].forEach(obs =>
      obs.pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe(() => {
          this.internalPageIndex = 0;
          this.updateUrlAndEmit();
        })
    );
  }

  triggerSearch() {
    this.internalPageIndex = 0;
    this.updateUrlAndEmit();
  }

  onSort(header: TableHeaderInterface) {
    if (!header.sortable) return;
    if (this.sortColumn === header.key) {
      this.sortDescending = !this.sortDescending;
    } else {
      this.sortColumn = header.key;
      this.sortKey = header.nestedKey || header.key;
      this.sortDescending = false;
    }
    this.internalPageIndex = 0;
    this.updateUrlAndEmit();
  }

  onPageChange(event: PageEvent) {
    this.internalPageIndex = event.pageIndex;
    this.internalPageSize = event.pageSize;
    this.updateUrlAndEmit();
  }

  clearColumnFilters() {
    this.filterForm.reset();
    this.internalPageIndex = 0;
    this.updateUrlAndEmit();
  }

  private buildQuery(): PageQueryInterface {
    const query: PageQueryInterface = {
      start: this.internalPageIndex * this.internalPageSize,
      recordsPerPage: this.internalPageSize,
      pageIndex: this.internalPageIndex,
    };

    const searchVal = this.searchForm.get('search')!.value;
    if (searchVal) query.searchText = searchVal;

    const filterValues = this.filterForm.value;
    const queryProperties = Object.entries(filterValues)
      .filter(([_, v]) => v !== null && v !== '')
      .map(([name, value]) => ({ name, value: value as string }));
    if (queryProperties.length) query.queryProperties = queryProperties;

    if (this.sortColumn) {
      query.sortProperties = [
        { name: this.sortKey!, isDescending: this.sortDescending },
      ];
    }

    return query;
  }

  private buildUrlParams(): Record<string, string> {
    const params: Record<string, string> = {};

    if (this.internalPageIndex > 0) params['page'] = String(this.internalPageIndex);
    if (this.internalPageSize !== 10) params['size'] = String(this.internalPageSize);

    const searchVal = this.searchForm.get('search')!.value;
    if (searchVal) params['search'] = searchVal;

    if (this.sortColumn) {
      params['sort'] = this.sortColumn;
      params['dir'] = this.sortDescending ? 'desc' : 'asc';
    }

    const filterValues = this.filterForm.value;
    Object.entries(filterValues).forEach(([key, val]) => {
      if (val !== null && val !== '') params['col_' + key] = val as string;
    });

    return params;
  }

  private updateUrlAndEmit() {
    const urlParams = this.buildUrlParams();
    const paramsSnapshot = JSON.stringify(urlParams);
    if (paramsSnapshot === this.lastEmittedParams) return;
    this.lastEmittedParams = paramsSnapshot;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: urlParams,
      replaceUrl: true,
    });

    const query = this.buildQuery();
    this.queryChange.emit(query);
    this.pageChange.emit(query);
  }

  getValue(row: any, header: TableHeaderInterface): any {
    if (header.nestedKey) {
      return header.nestedKey.split('.').reduce((obj, key) => obj?.[key], row);
    }
    return row[header.key];
  }

  onView(row: any) { this.view.emit(row); }
  onEdit(row: any) { this.edit.emit(row); }
  onDelete(row: any) { this.delete.emit(row); }
  onCustomAction(key: string, row: any) { this.customAction.emit({ key, row }); }

  exportToCsv() {
    if (!this.exportEndpoint || this.isExporting) return;
    this.isExporting = true;

    const base = this.buildQuery();
    const query: QueryInterface = {};
    if (base.searchText) query.searchText = base.searchText;
    if (base.queryProperties?.length) query.queryProperties = [...base.queryProperties];
    if (base.sortProperties?.length) query.sortProperties = base.sortProperties;

    if (this.exportQueryMerge.nestedProperties?.length) {
      query.nestedProperties = this.exportQueryMerge.nestedProperties;
    }
    if (this.exportQueryMerge.queryProperties?.length) {
      query.queryProperties = [...(query.queryProperties ?? []), ...this.exportQueryMerge.queryProperties];
    }

    this.http
      .post<GenericResponseInterface<any[]>>(
        `${environment.baseUrl}${this.exportEndpoint}`,
        query,
        { withCredentials: true }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.downloadAsCsv(response.entity ?? []);
          this.isExporting = false;
        },
        error: () => { this.isExporting = false; }
      });
  }

  private downloadAsCsv(rows: any[]) {
    const headers = this.tableHeaderData.map(h => `"${h.name}"`).join(',');

    const csvRows = rows.map(row =>
      this.tableHeaderData.map(h => {
        const val = this.getValue(row, h);
        let display: string;
        if (h.format) {
          display = h.format(val, row) ?? '';
        } else if (h.type === 'boolean') {
          display = val ? 'Yes' : 'No';
        } else if (val === null || val === undefined) {
          display = '';
        } else {
          display = String(val);
        }
        return `"${display.replace(/"/g, '""')}"`;
      }).join(',')
    );

    const csv = '\uFEFF' + [headers, ...csvRows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${this.exportFileName}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
