import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgrammeGradeRemarkFacade } from '../../../../store/programme-grade-remark/programme-grade-remark.facade';
import { ProgrammeGradeRemarkFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-programme-grade-remark',
  templateUrl: './view-programme-grade-remark.component.html',
  styleUrls: ['./view-programme-grade-remark.component.scss'],
})
export class ViewProgrammeGradeRemarkComponent implements OnInit {
  programmeGradeRemark$: Observable<ProgrammeGradeRemarkFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private programmeGradeRemarkFacade: ProgrammeGradeRemarkFacade,
    private router: Router
  ) {
    this.programmeGradeRemark$ = this.programmeGradeRemarkFacade.programmeGradeRemarkById$;
  }

  ngOnInit() {
    const programmeGradeRemarkId = this.route.snapshot.params['id'];
    if (programmeGradeRemarkId) {
      this.programmeGradeRemarkFacade.getProgrammeGradeRemarkById(programmeGradeRemarkId);
    }
  }
} 