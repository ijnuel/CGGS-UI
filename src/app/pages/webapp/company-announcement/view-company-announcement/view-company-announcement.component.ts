import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { CompanyAnnouncementFacade } from '../../../../store/company-announcement/company-announcement.facade';
import { CompanyAnnouncementListInterface } from '../../../../types';

@Component({
  selector: 'app-view-company-announcement',
  templateUrl: './view-company-announcement.component.html',
  styleUrls: ['./view-company-announcement.component.scss'],
})
export class ViewCompanyAnnouncementComponent implements OnInit, OnDestroy {
  item$: Observable<CompanyAnnouncementListInterface | null>;
  loading$: Observable<boolean>;
  private id: string;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private facade: CompanyAnnouncementFacade,
  ) {
    this.item$ = this.facade.companyAnnouncementById$;
    this.loading$ = this.facade.loading$;
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.facade.getCompanyAnnouncementById(this.id);
  }

  goBack() { this.location.back(); }
  navigateToEdit() { this.router.navigate(['/app/company-announcement/edit', this.id]); }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
