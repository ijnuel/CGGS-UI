import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffFacade } from '../../../../store/staff/staff.facade';
import { StaffFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss'],
})
export class ViewStaffComponent implements OnInit {
  staff$: Observable<StaffFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private staffFacade: StaffFacade,
    private router: Router
  ) {
    this.staff$ = this.staffFacade.staffById$;
  }

  ngOnInit() {
    const staffId = this.route.snapshot.params['id'];
    if (staffId) {
      this.staffFacade.getStaffById(staffId);
    }
  }
} 