import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassSubjectAssessmentFacade } from '../../../../store/class-subject-assessment/class-subject-assessment.facade';
import { ClassSubjectAssessmentListInterface } from '../../../../types';

@Component({
  selector: 'app-view-class-subject-assessment',
  templateUrl: './view-class-subject-assessment.component.html',
  styleUrls: ['./view-class-subject-assessment.component.scss'],
})
export class ViewClassSubjectAssessmentComponent implements OnInit {
  classSubjectAssessment$: Observable<ClassSubjectAssessmentListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private classSubjectAssessmentFacade: ClassSubjectAssessmentFacade,
    private router: Router,
    private location: Location
  ) {
    this.classSubjectAssessment$ = this.classSubjectAssessmentFacade.classSubjectAssessmentById$;
  }

  ngOnInit() {
    const classSubjectAssessmentId = this.route.snapshot.params['id'];
    if (classSubjectAssessmentId) {
      this.classSubjectAssessmentFacade.getClassSubjectAssessmentById(classSubjectAssessmentId);
    }
  }

  goBack(): void {
    this.location.back();
  }
} 