import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeaderInterface } from '../../types/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() isLoading: boolean = false;
  @Input() showActionColumn: boolean = false;

  @Input() set tableData(value: any[] | null) {
    if (value) {
      this.dataSource = new MatTableDataSource<any>(value ? value : []);
    }
  }

  @Input() set tableHeaderData(value: TableHeaderInterface[] | null) {
    this._headerData = value;
    this.headerData?.forEach((header) => {
      this.displayedColumns.push(header.key);
    });
  }

  // header
  _headerData!: TableHeaderInterface[] | null;
  get headerData(): TableHeaderInterface[] | null {
    return this._headerData;
  }
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any[]> | null = null;
  maxColChar = 25;
}