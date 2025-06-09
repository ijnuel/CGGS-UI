import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministratorFacade } from '../../../../store/administrator/administrator.facade';

@Component({
  selector: 'app-view-administrator',
  templateUrl: './view-administrator.component.html',
  styleUrls: ['./view-administrator.component.scss']
})
export class ViewAdministratorComponent implements OnInit {
  administrator$: Observable<any> = this.administratorFacade.selectAdministratorById$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private administratorFacade: AdministratorFacade
  ) {
    this.administrator$ = this.administratorFacade.selectedAdministrator$;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.administratorFacade.getAdministratorById(id);
    }
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
} 