import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateFacade } from '../../../../store/state/state.facade';
import { StateListInterface } from '../../../../types';

@Component({
  selector: 'app-view-state',
  templateUrl: './view-state.component.html',
  styleUrls: ['./view-state.component.scss'],
})
export class ViewStateComponent implements OnInit {
  state$: Observable<StateListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private stateFacade: StateFacade,
    private router: Router
  ) {
    this.state$ = this.stateFacade.stateById$;
  }

  ngOnInit() {
    const stateId = this.route.snapshot.params['id'];
    if (stateId) {
      this.stateFacade.getStateById(stateId);
    }
  }
} 