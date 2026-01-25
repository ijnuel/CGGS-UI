import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationFacade } from '../../../../store/application/application.facade';
import { ApplicationListInterface } from '../../../../types';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss'],
})
export class ViewApplicationComponent implements OnInit {
  application$: Observable<ApplicationListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private applicationFacade: ApplicationFacade,
    private router: Router
  ) {
    this.application$ = this.applicationFacade.applicationById$;
  }

  ngOnInit() {
    const applicationId = this.route.snapshot.params['id'];
    if (applicationId) {
      this.applicationFacade.getApplicationById(applicationId);
    }
  }
} 