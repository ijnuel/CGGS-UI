import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassSubjectAssessmentFacade } from '../../../../store/class-subject-assessment/class-subject-assessment.facade';
import { ClassSubjectAssessmentFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-class-subject-assessment',
  templateUrl: './view-class-subject-assessment.component.html',
  styleUrls: ['./view-class-subject-assessment.component.scss'],
})
export class ViewClassSubjectAssessmentComponent implements OnInit {
  classSubjectAssessment$: Observable<ClassSubjectAssessmentFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private classSubjectAssessmentFacade: ClassSubjectAssessmentFacade,
    private router: Router
  ) {
    this.classSubjectAssessment$ = this.classSubjectAssessmentFacade.classSubjectAssessmentById$;
  }

  ngOnInit() {
    const classSubjectAssessmentId = this.route.snapshot.params['id'];
    if (classSubjectAssessmentId) {
      this.classSubjectAssessmentFacade.getClassSubjectAssessmentById(classSubjectAssessmentId);
    }
  }
} 