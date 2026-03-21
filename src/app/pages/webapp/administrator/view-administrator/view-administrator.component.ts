import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdministratorFacade } from '../../../../store/administrator/administrator.facade';
import { SharedFacade } from '../../../../store/shared/shared.facade';
import { AdministratorListInterface, DropdownListInterface } from '../../../../types';

@Component({
  selector: 'app-view-administrator',
  templateUrl: './view-administrator.component.html',
  styleUrls: ['./view-administrator.component.scss'],
})
export class ViewAdministratorComponent implements OnInit {
  administrator$: Observable<AdministratorListInterface | null>;
  genderList$: Observable<DropdownListInterface[] | null>;
  religionList$: Observable<DropdownListInterface[] | null>;
  loading$: Observable<boolean>;

  private administratorId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private administratorFacade: AdministratorFacade,
    private sharedFacade: SharedFacade
  ) {
    this.administrator$ = this.administratorFacade.administratorByProperties$.pipe(
      map(admins => admins?.[0] ?? null)
    );
    this.genderList$ = this.sharedFacade.selectGenderList$;
    this.religionList$ = this.sharedFacade.selectReligionList$;
    this.loading$ = this.administratorFacade.loading$;
  }

  ngOnInit() {
    this.administratorId = this.route.snapshot.params['id'];
    if (this.administratorId) {
      this.administratorFacade.getAdministratorByProperties({
        queryProperties: [{ name: 'id', value: this.administratorId }],
        nestedProperties: [
          { name: 'administratorCompanies', innerNestedProperties: [{ name: 'company' }] },
          { name: 'residentialState' },
          { name: 'nationality' },
          { name: 'stateOfOrigin' },
          { name: 'originLGA' }
        ]
      });
    }
    this.sharedFacade.getGenderList();
    this.sharedFacade.getReligionList();
  }

  getLabel(list: DropdownListInterface[] | null, value: number | undefined): string {
    if (value === undefined || value === null) return '—';
    return list?.find(item => +item.value === value)?.name ?? '—';
  }

  goBack(): void { this.location.back(); }

  navigateToEdit() {
    this.router.navigate(['/app/administrator/edit', this.administratorId]);
  }
}
