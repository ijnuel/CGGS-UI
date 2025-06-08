import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeaderInterface } from '../../types/table';
import { PageEvent } from '@angular/material/paginator';
import { PageQueryInterface } from '../../types';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Output() pageChange = new EventEmitter<PageQueryInterface>();
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<{ name: string; value: string }[]>();
  
  @Input() totalLength = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() isLoading = false;
  @Input() showActionColumn = false;
  @Input() showSearch = false;
  @Input() showFilters = false;
  @Input() tableData: any[] | null = [];
  @Input() tableHeaderData: TableHeaderInterface[] = [];

  searchForm: FormGroup;
  filterForm: FormGroup;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.filterForm = this.fb.group({});
  }

  ngOnInit() {
    this.initializeTable();
    this.initializeSearch();
    this.initializeFilters();
  }

  ngOnChanges() {
    this.initializeTable();
  }

  private initializeTable() {
    this.displayedColumns = this.tableHeaderData.map(header => header.key);
    if (this.showActionColumn) {
      this.displayedColumns.push('actions');
    }
    this.dataSource.data = this.tableData || [];
  }

  private initializeSearch() {
    this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }

  private initializeFilters() {
    const filterControls = this.tableHeaderData
      .filter(header => header.filterable)
      .reduce((acc, header) => {
        acc[header.key] = [''];
        return acc;
      }, {} as { [key: string]: any[] });
    
    this.filterForm = this.fb.group(filterControls);

    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        const filters = Object.entries(value)
          .filter(([_, v]) => v !== null && v !== '')
          .map(([name, value]) => ({ name, value: value as string }));
        this.filter.emit(filters);
      });
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit({
      start: event.pageSize * event.pageIndex,
      recordsPerPage: event.pageSize,
      pageIndex: event.pageIndex
    });
  }

  onView(row: any) {
    this.view.emit(row);
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }

  onFilter() {
    const filters = Object.entries(this.filterForm.value)
      .filter(([_, value]) => value !== '')
      .map(([name, value]) => ({ name, value: value as string }));
    
    this.filter.emit(filters);
  }

  clearFilters() {
    this.filterForm.reset();
    this.onFilter();
  }
}
