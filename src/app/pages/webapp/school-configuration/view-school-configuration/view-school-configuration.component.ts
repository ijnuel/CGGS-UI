import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SchoolConfigurationFacade } from '../../../../store/school-configuration/school-configuration.facade';
import { SchoolConfigurationFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-school-configuration',
  templateUrl: './view-school-configuration.component.html',
  styleUrls: ['./view-school-configuration.component.scss'],
})
export class ViewSchoolConfigurationComponent implements OnInit {
  schoolConfiguration$: Observable<SchoolConfigurationFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private schoolConfigurationFacade: SchoolConfigurationFacade,
    private router: Router
  ) {
    this.schoolConfiguration$ = this.schoolConfigurationFacade.schoolConfigurationById$;
  }

  ngOnInit() {
    const schoolConfigurationId = this.route.snapshot.params['id'];
    if (schoolConfigurationId) {
      this.schoolConfigurationFacade.getSchoolConfigurationById(schoolConfigurationId);
    }
  }
} 