import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompanyAnnouncementFacade } from '../../../../store/company-announcement/company-announcement.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { CompanyAnnouncementListInterface } from '../../../../types';
import { getErrorMessageHelper } from '../../../../services/helper.service';

@Component({
  selector: 'app-create-update-company-announcement',
  templateUrl: './create-update-company-announcement.component.html',
  styleUrls: ['./create-update-company-announcement.component.scss'],
})
export class CreateUpdateCompanyAnnouncementComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  itemById$: Observable<CompanyAnnouncementListInterface | null>;

  formGroup: FormGroup<{
    title: FormControl;
    body: FormControl;
    category: FormControl;
    iconName: FormControl;
    location: FormControl;
    announcementDate: FormControl;
    isActive: FormControl;
  }>;

  isEditMode = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private facade: CompanyAnnouncementFacade,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoadingFacade: GlobalLoadingFacade,
  ) {
    this.loading$ = this.facade.loading$;
    this.error$ = this.facade.error$;
    this.itemById$ = this.facade.companyAnnouncementById$;

    this.formGroup = this.fb.group({
      title:            ['', [Validators.required, Validators.maxLength(255)]],
      body:             ['', [Validators.required]],
      category:         ['', [Validators.maxLength(100)]],
      iconName:         ['', [Validators.maxLength(100)]],
      location:         ['', [Validators.maxLength(255)]],
      announcementDate: [new Date().toISOString().split('T')[0], [Validators.required]],
      isActive:         [true],
    });
  }

  get formControl() { return this.formGroup.controls; }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.facade.getCompanyAnnouncementById(id);
      this.itemById$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        if (data) {
          this.formGroup.patchValue({
            title:            data.title ?? '',
            body:             data.body ?? '',
            category:         data.category ?? '',
            iconName:         data.iconName ?? '',
            location:         data.location ?? '',
            announcementDate: data.announcementDate ? data.announcementDate.split('T')[0] : '',
            isActive:         data.isActive ?? true,
          });
        }
      });
    }

    this.facade.createSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
      if (success && !this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/company-announcement']);
        this.globalLoadingFacade.globalSuccessShow('Announcement created', 3000);
      }
    });

    this.facade.updateSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
      if (success && this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/company-announcement']);
        this.globalLoadingFacade.globalSuccessShow('Announcement updated', 3000);
      }
    });
  }

  getErrorMessage(controlName: string): string | null {
    return getErrorMessageHelper(this.formGroup.get(controlName) as FormControl);
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) return;

    const formData = this.formGroup.value as any;
    if (this.isEditMode) {
      this.facade.updateCompanyAnnouncement({ ...formData, id: this.route.snapshot.params['id'] });
    } else {
      this.facade.createCompanyAnnouncement(formData);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
