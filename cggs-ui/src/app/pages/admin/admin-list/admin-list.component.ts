import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { TableColumnContants as TableColumnConstants } from 'src/app/helpers/const/tableColumnConst';
import { AdministratorResponseDto, AdministratorService } from 'src/app/services/api-service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit {

  page: string = "";

  tableColumns = [
    {
      title: 'First name',
      data: 'firstName'
    }, 
    {
      title: 'Last name',
      data: 'lastName'
    },
    TableColumnConstants.actions()
  ];

  constructor(
    public administratorService: AdministratorService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) {
    this.page = router.routerState.snapshot.url.split("/").find(x => x != "") ?? "";
  }
  
  ngOnInit(): void {
  }

}
