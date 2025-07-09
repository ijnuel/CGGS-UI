import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministratorFacade } from '../../../../store/administrator/administrator.facade';
import { AdministratorFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-administrator',
  templateUrl: './view-administrator.component.html',
  styleUrls: ['./view-administrator.component.scss'],
})
export class ViewAdministratorComponent implements OnInit {
  administrator$: Observable<AdministratorFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private administratorFacade: AdministratorFacade,
    private router: Router
  ) {
    this.administrator$ = this.administratorFacade.administratorById$;
  }

  ngOnInit() {
    const administratorId = this.route.snapshot.params['id'];
    if (administratorId) {
      this.administratorFacade.getAdministratorById(administratorId);
    }
  }
} 