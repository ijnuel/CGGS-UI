import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionFacade } from '../../../../store/session/session.facade';
import { SessionFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-session',
  templateUrl: './view-session.component.html',
  styleUrls: ['./view-session.component.scss'],
})
export class ViewSessionComponent implements OnInit {
  session$: Observable<SessionFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private sessionFacade: SessionFacade,
    private router: Router
  ) {
    this.session$ = this.sessionFacade.sessionById$;
  }

  ngOnInit() {
    const sessionId = this.route.snapshot.params['id'];
    if (sessionId) {
      this.sessionFacade.getSessionById(sessionId);
    }
  }
} 