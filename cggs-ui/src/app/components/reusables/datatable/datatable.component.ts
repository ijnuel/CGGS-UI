import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements OnInit {
  @Input() public entityService!: any;
  @Input() public tableColumns!: any[];
  @Input() public page!: string;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtTrigger: any = new Subject();

  dtOptions: DataTables.Settings = {};

  constructor(
    private renderer: Renderer2,
    private router: Router,
  ) {
  }
  
  ngOnInit(): void {
    this.getDtOptions();
  }

  getDtOptions(): void {
    this.dtOptions =  {
      processing: true,
      ordering: false,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        console.log(dataTablesParameters)
        this.entityService.apiAdministratorGetAllPaginatedGet(dataTablesParameters.start, dataTablesParameters.length, dataTablesParameters.search.value).subscribe(
          (res: any) => {
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
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("view-item")) {
        this.router.navigate([`/${this.page}/view/${event.target.getAttribute("view-item")}`]);
      }
      if (event.target.hasAttribute("edit-item")) {
        this.router.navigate([`/${this.page}/edit/${event.target.getAttribute("edit-item")}`]);
      }
      if (event.target.hasAttribute("delete-item")) {
        this.router.navigate([`/${this.page}/delete/${event.target.getAttribute("delete-item")}`]);
      }
    });
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
