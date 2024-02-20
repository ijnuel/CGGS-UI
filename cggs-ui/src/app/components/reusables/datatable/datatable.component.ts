import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements OnInit {
  @Input() public listResponse!: Observable<any>;
  @Input() public tableColumns!: any[];
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtTrigger: any = new Subject();

  dtOptions: DataTables.Settings = {};

  constructor(
  ) {
  }
  
  ngOnInit(): void {
    this.getDtOptions();
  }

  getDtOptions(): void {
    this.dtOptions =  {
      processing: true,
      ordering: false,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.listResponse.subscribe(
          res => {
            if (res.succeeded) {
              callback({
                recordsTotal: res.entity?.totalCount,
                recordsFiltered: res.entity?.totalCount,
                data: res.entity?.data
              });
            }
          }
        )
      },
      columns: this.tableColumns
    }; 
  }

  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
