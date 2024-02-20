import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { AdministratorService } from 'src/app/services/api-service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit {
  tableColumns = [
    {
      title: 'First name',
      data: 'firstName'
    }, 
    {
      title: 'Last name',
      data: 'lastName'
    },
  ];
  listResponse!: Observable<any>;

  constructor(
    private administratorService: AdministratorService,
  ) {
  }
  
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.listResponse = this.administratorService.apiAdministratorGetAllPaginatedGet();
  }

}
