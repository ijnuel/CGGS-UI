import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';
import { CompanyFacade } from '../../../../store/company/company.facade';
import { ProfileImageFacade } from '../../../../store/profile-image/profile-image.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { CompanyListInterface } from '../../../../types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-school-settings',
  templateUrl: './school-settings.component.html',
})
export class SchoolSettingsComponent implements OnInit, OnDestroy {
  company: CompanyListInterface | null = null;
  loading = true;
  editMode = false;
  saving = false;

  logoUrl: string | null = null;
  logoUploading = false;
  logoDeleting = false;

  formGroup: FormGroup<{
    shortName: FormControl;
    principalName: FormControl;
    address: FormControl;
    description: FormControl;
    mission: FormControl;
    vision: FormControl;
    teacherShortCode: FormControl;
    studentShortCode: FormControl;
  }>;

  get fc() { return this.formGroup.controls; }

  private companyId = '';
  private destroy$ = new Subject<void>();

  constructor(
    private companyFacade: CompanyFacade,
    private profileImageFacade: ProfileImageFacade,
    private globalLoadingFacade: GlobalLoadingFacade,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      shortName:        ['', [Validators.maxLength(50)]],
      principalName:    ['', [Validators.maxLength(255)]],
      address:          ['', [Validators.maxLength(500)]],
      description:      ['', [Validators.maxLength(1000)]],
      mission:          [''],
      vision:           [''],
      teacherShortCode: ['', [Validators.maxLength(20)]],
      studentShortCode: ['', [Validators.maxLength(20)]],
    });
  }

  ngOnInit() {
    this.companyFacade.getCompanyAll();

    this.companyFacade.companyAll$
      .pipe(takeUntil(this.destroy$), filter(list => !!list))
      .subscribe(list => {
        const current = list!.find(c => c.isCurrent) ?? list![0];
        if (!current) { this.loading = false; return; }

        this.company = current;
        this.companyId = current.id;
        this.loading = false;

        this.profileImageFacade.loadCachedPhotoUrl(this.companyId);
        this.profileImageFacade.getPhotoUrl$(this.companyId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(url => this.logoUrl = url);

        this.company$.pipe(
          takeUntil(this.destroy$),
          filter(c => !!c && c.id === this.companyId)
        ).subscribe(c => {
          if (!this.logoUrl && c?.logo) this.logoUrl = c.logo;
          if (c && !c.logo && !this.logoUploading) this.logoUrl = null;
        });
      });

    this.profileImageFacade.uploading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => this.logoUploading = v);

    this.profileImageFacade.deleting$
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => this.logoDeleting = v);

    this.companyFacade.updateSuccess$
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success && this.saving) {
          this.saving = false;
          this.editMode = false;
          this.globalLoadingFacade.globalSuccessShow('School configuration saved', 3000);
          this.companyFacade.getCompanyAll();
        }
      });
  }

  get company$() { return this.companyFacade.companyById$; }

  enterEdit() {
    if (!this.company) return;
    this.formGroup.patchValue({
      shortName:        this.company.shortName        ?? '',
      principalName:    this.company.principalName    ?? '',
      address:          this.company.address          ?? '',
      description:      this.company.description      ?? '',
      mission:          this.company.mission          ?? '',
      vision:           this.company.vision           ?? '',
      teacherShortCode: this.company.teacherShortCode ?? '',
      studentShortCode: this.company.studentShortCode ?? '',
    });
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.formGroup.reset();
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid || !this.company) return;
    this.saving = true;
    this.companyFacade.updateCompany({
      id:               this.companyId,
      name:             this.company.name,
      domainName:       this.company.domainName,
      ...this.formGroup.value,
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
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Remove Logo', message: 'Remove the school logo?', confirmText: 'Remove', cancelText: 'Cancel' },
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) this.profileImageFacade.deleteProfileImage('Company', this.companyId);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
