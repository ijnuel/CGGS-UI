import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import { SchoolTermSessionListInterface } from '../../../../types';

@Component({
  selector: 'app-view-school-term-session',
  templateUrl: './view-school-term-session.component.html',
  styleUrls: ['./view-school-term-session.component.scss'],
})
export class ViewSchoolTermSessionComponent implements OnInit {
  schoolTermSession$: Observable<SchoolTermSessionListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private router: Router
  ) {
    this.schoolTermSession$ = this.schoolTermSessionFacade.schoolTermSessionById$;
  }

  ngOnInit() {
    const schoolTermSessionId = this.route.snapshot.params['id'];
    if (schoolTermSessionId) {
      this.schoolTermSessionFacade.getSchoolTermSessionById(schoolTermSessionId);
    }
  }
} 