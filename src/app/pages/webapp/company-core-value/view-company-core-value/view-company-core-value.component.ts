import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { CompanyCoreValueFacade } from '../../../../store/company-core-value/company-core-value.facade';
import { CompanyCoreValueListInterface } from '../../../../types';

@Component({
  selector: 'app-view-company-core-value',
  templateUrl: './view-company-core-value.component.html',
  styleUrls: ['./view-company-core-value.component.scss'],
})
export class ViewCompanyCoreValueComponent implements OnInit, OnDestroy {
  item$: Observable<CompanyCoreValueListInterface | null>;
  loading$: Observable<boolean>;
  private id: string;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private facade: CompanyCoreValueFacade,
  ) {
    this.item$ = this.facade.companyCoreValueById$;
    this.loading$ = this.facade.loading$;
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.facade.getCompanyCoreValueById(this.id);
  }

  goBack() { this.location.back(); }
  navigateToEdit() { this.router.navigate(['/app/company-core-value/edit', this.id]); }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
