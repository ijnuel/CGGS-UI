import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { CompanyGalleryImageFacade } from '../../../../store/company-gallery-image/company-gallery-image.facade';
import { CompanyGalleryImageListInterface } from '../../../../types';

@Component({
  selector: 'app-view-company-gallery-image',
  templateUrl: './view-company-gallery-image.component.html',
  styleUrls: ['./view-company-gallery-image.component.scss'],
})
export class ViewCompanyGalleryImageComponent implements OnInit, OnDestroy {
  item$: Observable<CompanyGalleryImageListInterface | null>;
  loading$: Observable<boolean>;
  private id: string;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private facade: CompanyGalleryImageFacade,
  ) {
    this.item$ = this.facade.companyGalleryImageById$;
    this.loading$ = this.facade.loading$;
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.facade.getCompanyGalleryImageById(this.id);
  }

  goBack() { this.location.back(); }
  navigateToEdit() { this.router.navigate(['/app/company-gallery-image/edit', this.id]); }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
