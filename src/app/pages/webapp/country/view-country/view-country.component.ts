import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryFacade } from '../../../../store/country/country.facade';
import { CountryFormInterface } from '../../../../types';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.scss'],
})
export class ViewCountryComponent implements OnInit {
  country$: Observable<CountryFormInterface | null>;

  constructor(
    private route: ActivatedRoute,
    private countryFacade: CountryFacade,
    private router: Router
  ) {
    this.country$ = this.countryFacade.countryById$;
  }

  ngOnInit() {
    const countryId = this.route.snapshot.params['id'];
    if (countryId) {
      this.countryFacade.getCountryById(countryId);
    }
  }
} 