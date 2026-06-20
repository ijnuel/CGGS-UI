import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CompanyFacade } from '../../../../store/company/company.facade';
import { ProfileImageFacade } from '../../../../store/profile-image/profile-image.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { CompanyListInterface } from '../../../../types';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss'],
})
export class ViewCompanyComponent implements OnInit, OnDestroy {
  company$: Observable<CompanyListInterface | null>;
  loading$: Observable<boolean>;

  logoUrl: string | null = null;
  logoUploading = false;
  logoDeleting = false;

  private companyId = '';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private companyFacade: CompanyFacade,
    private profileImageFacade: ProfileImageFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
  ) {
    this.company$ = this.companyFacade.companyById$;
    this.loading$ = this.companyFacade.loading$;
  }

  ngOnInit() {
    this.companyId = this.route.snapshot.params['id'];
    if (this.companyId) {
      this.companyFacade.getCompanyById(this.companyId);

      this.profileImageFacade.loadCachedPhotoUrl(this.companyId);
      this.profileImageFacade.getPhotoUrl$(this.companyId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(url => this.logoUrl = url);

      this.profileImageFacade.uploading$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(uploading => this.logoUploading = uploading);

      this.profileImageFacade.deleting$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(deleting => this.logoDeleting = deleting);
    }

    // Fallback: use company.logo from the API response (a persisted public URL)
    // when the localStorage cache is absent (different browser, cleared storage, etc.).
    // Safe to use because companyById is cleared to null before every new request,
    // so this subscription never fires with stale data from a previous company.
    this.company$.pipe(
      takeUntil(this.unsubscribe$),
      filter(company => !!company && company.id === this.companyId)
    ).subscribe(company => {
      if (company?.logo && !this.logoUrl) {
        this.logoUrl = company.logo;
      }
    });
  }

  onLogoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.companyId) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.globalLoadingFacade.globalErrorShow('Only JPEG, PNG, or WebP images are allowed', 3000);
      input.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.globalLoadingFacade.globalErrorShow('Image must be smaller than 5MB', 3000);
      input.value = '';
      return;
    }

    this.profileImageFacade.uploadProfileImage('Company', this.companyId, file);
    input.value = '';
  }

  deleteLogo() {
    if (!this.companyId) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove Logo',
        message: 'Are you sure you want to remove this logo?',
        confirmText: 'Remove',
        cancelText: 'Cancel',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profileImageFacade.deleteProfileImage('Company', this.companyId);
      }
    });
  }

  navigateToEdit() {
    this.router.navigate(['/app/company/edit', this.companyId]);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
