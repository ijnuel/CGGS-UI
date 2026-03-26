import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgrammeGradeRemarkFacade } from '../../../../store/programme-grade-remark/programme-grade-remark.facade';
import { ProgrammeGradeRemarkListInterface } from '../../../../types';

@Component({
  selector: 'app-view-programme-grade-remark',
  templateUrl: './view-programme-grade-remark.component.html',
  styleUrls: ['./view-programme-grade-remark.component.scss'],
})
export class ViewProgrammeGradeRemarkComponent implements OnInit {
  programmeGradeRemark$: Observable<ProgrammeGradeRemarkListInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private programmeGradeRemarkFacade: ProgrammeGradeRemarkFacade,
    private router: Router,
    private location: Location
  ) {
    this.programmeGradeRemark$ = this.programmeGradeRemarkFacade.programmeGradeRemarkById$;
  }

  ngOnInit() {
    const programmeGradeRemarkId = this.route.snapshot.params['id'];
    if (programmeGradeRemarkId) {
      this.programmeGradeRemarkFacade.getProgrammeGradeRemarkById(programmeGradeRemarkId);
    }
  }

  goBack(): void {
    this.location.back();
  }
} 