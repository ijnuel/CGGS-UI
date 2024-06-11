import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, of } from 'rxjs';
import { BASE_PATH, Configuration } from 'src/app/services/api-service';
import { LocalService } from 'src/app/services/local-service/local.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements OnInit {
  @Input() public includeCreate: boolean = true;
  @Input() public getAll!: Function;
  @Input() public getById!: Function;
  @Input() public delete!: Function;
  @Input() public entityFormComponent!: any;
  @Input() public tableColumns!: any[];
  @Input() public page!: string;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtTrigger: any = new Subject();

  dtOptions: DataTables.Settings = {};
  
  protected basePath = '/';
  public configuration = new Configuration();
  public defaultHeaders = new HttpHeaders();

  constructor(
    public localService: LocalService,
    private renderer: Renderer2,
    private router: Router,
    private modalDialog: NgbModal, 
    protected httpClient: HttpClient, 
    @Optional()@Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
      if (basePath) {
        this.basePath = basePath;
      }
      if (configuration) {
          this.configuration = configuration;
          this.basePath = basePath || configuration.basePath || this.basePath;
      }
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
        this.getAll(dataTablesParameters.start, dataTablesParameters.length, dataTablesParameters.search.value).subscribe(
          (res: any) => {
            if (res.succeeded) {
              callback({
                recordsTotal: res.entity?.totalCount,
                recordsFiltered: res.entity?.totalCount,
                data: res.entity?.data
              });
            }
          },
          (err: any) => {
            this.localService.errorHandler(err);
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
        this.openForm(event.target.getAttribute("edit-item"));
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

  openForm(id: string = "") {
    let entityDto = {};

    if (id != "") {
      this.getById(id).subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.showFormModal(res.entity, false);
          }
        },
        (err: any) => {
          this.localService.errorHandler(err);
        }
      )
    }
    else {
      this.showFormModal()
    }
  }

  showFormModal(entityDto: any = {}, isNew: boolean = true) {

    const dialogRef = this.modalDialog.open(this.entityFormComponent, {
      windowClass: 'myCustomModalClass',
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
      scrollable: true,
      centered: true
    });
    dialogRef.componentInstance.entityDto = entityDto;
    dialogRef.componentInstance.isModal = true;

    dialogRef.result.then(async (result) => {
      console.log(result)
      if (result) {
        this.rerender();
      }
      }, (reason) => {
    });


  }
}
