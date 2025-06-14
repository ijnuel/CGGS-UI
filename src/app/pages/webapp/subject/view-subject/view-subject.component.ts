import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubjectFacade } from '../../../../store/subject/subject.facade';
import { SubjectFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.scss'],
})
export class ViewSubjectComponent implements OnInit {
  subject$: Observable<SubjectFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private subjectFacade: SubjectFacade,
    private router: Router
  ) {
    this.subject$ = this.subjectFacade.subjectById$;
  }

  ngOnInit() {
    const subjectId = this.route.snapshot.params['id'];
    if (subjectId) {
      this.subjectFacade.getSubjectById(subjectId);
    }
  }
} 