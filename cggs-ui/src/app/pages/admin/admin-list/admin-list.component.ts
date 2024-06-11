import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { TableColumnContants as TableColumnConstants } from 'src/app/helpers/const/tableColumnConst';
import { AdministratorResponseDto, AdministratorService } from 'src/app/services/api-service';
import { AdminFormComponent } from '../admin-form/admin-form.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit {

  page: string = "";
  entityFormComponent = AdminFormComponent;

  tableColumns = [
    {
      title: 'First name',
      data: 'firstName'
    }, 
    {
      title: 'Middle name',
      data: 'middleName'
    },  
    {
      title: 'Last name',
      data: 'lastName'
    }, 
    {
      title: 'Email',
      data: 'email'
    }, 
    {
      title: 'Phone Number',
      data: 'phoneNumber'
    },
    {
      title: 'Address',
      data: 'homeAddress'
    },
    TableColumnConstants.actionColumn()
  ];

  constructor(
    public administratorService: AdministratorService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private modalDialog: NgbModal,
  ) {
    this.page = router.routerState.snapshot.url.split("/").find(x => x != "") ?? "";
  }
  
  ngOnInit(): void {
  }
}
