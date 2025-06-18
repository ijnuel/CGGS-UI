import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FamilyFacade } from '../../../../store/family/family.facade';
import { FamilyFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-family',
  templateUrl: './view-family.component.html',
  styleUrls: ['./view-family.component.scss'],
})
export class ViewFamilyComponent implements OnInit {
  family$: Observable<FamilyFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private familyFacade: FamilyFacade,
    private router: Router
  ) {
    this.family$ = this.familyFacade.familyById$;
  }

  ngOnInit() {
    const familyId = this.route.snapshot.params['id'];
    if (familyId) {
      this.familyFacade.getFamilyById(familyId);
    }
  }
} 