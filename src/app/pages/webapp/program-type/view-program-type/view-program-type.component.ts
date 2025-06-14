import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgramTypeFacade } from '../../../../store/program-type/program-type.facade';
import { ProgramTypeFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-program-type',
  templateUrl: './view-program-type.component.html',
  styleUrls: ['./view-program-type.component.scss'],
})
export class ViewProgramTypeComponent implements OnInit {
  programType$: Observable<ProgramTypeFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private programTypeFacade: ProgramTypeFacade,
    private router: Router
  ) {
    this.programType$ = this.programTypeFacade.programTypeById$;
  }

  ngOnInit() {
    const programTypeId = this.route.snapshot.params['id'];
    if (programTypeId) {
      this.programTypeFacade.getProgramTypeById(programTypeId);
    }
  }
} 