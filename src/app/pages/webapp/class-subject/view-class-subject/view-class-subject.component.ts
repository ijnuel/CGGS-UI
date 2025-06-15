import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassSubjectFacade } from '../../../../store/class-subject/class-subject.facade';
import { ClassSubjectFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-class-subject',
  templateUrl: './view-class-subject.component.html',
  styleUrls: ['./view-class-subject.component.scss'],
})
export class ViewClassSubjectComponent implements OnInit {
  classSubject$: Observable<ClassSubjectFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private classSubjectFacade: ClassSubjectFacade,
    private router: Router
  ) {
    this.classSubject$ = this.classSubjectFacade.classSubjectById$;
  }

  ngOnInit() {
    const classSubjectId = this.route.snapshot.params['id'];
    if (classSubjectId) {
      this.classSubjectFacade.getClassSubjectById(classSubjectId);
    }
  }
} 