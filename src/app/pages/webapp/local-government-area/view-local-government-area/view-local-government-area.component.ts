import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalGovernmentAreaFacade } from '../../../../store/local-government-area/local-government-area.facade';
import { LocalGovernmentAreaFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-local-government-area',
  templateUrl: './view-local-government-area.component.html',
  styleUrls: ['./view-local-government-area.component.scss'],
})
export class ViewLocalGovernmentAreaComponent implements OnInit {
  localGovernmentArea$: Observable<LocalGovernmentAreaFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private localGovernmentAreaFacade: LocalGovernmentAreaFacade,
    private router: Router
  ) {
    this.localGovernmentArea$ = this.localGovernmentAreaFacade.localGovernmentAreaById$;
  }

  ngOnInit() {
    const localGovernmentAreaId = this.route.snapshot.params['id'];
    if (localGovernmentAreaId) {
      this.localGovernmentAreaFacade.getLocalGovernmentAreaById(localGovernmentAreaId);
    }
  }
} 