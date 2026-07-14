import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyGalleryImageFacade } from '../../../../store/company-gallery-image/company-gallery-image.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { CompanyGalleryImageListInterface, GenericResponseInterface } from '../../../../types';
import { getErrorMessageHelper } from '../../../../services/helper.service';
import { environment } from '../../../../../environments/environment';

interface PresignedUploadResult {
  presignedUrl: string;
  objectKey: string;
  publicUrl: string;
}

@Component({
  selector: 'app-create-update-company-gallery-image',
  templateUrl: './create-update-company-gallery-image.component.html',
  styleUrls: ['./create-update-company-gallery-image.component.scss'],
})
export class CreateUpdateCompanyGalleryImageComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  itemById$: Observable<CompanyGalleryImageListInterface | null>;

  formGroup: FormGroup<{
    imageUrl: FormControl;
    caption: FormControl;
    displayOrder: FormControl;
    isActive: FormControl;
  }>;

  imagePreview: string | null = null;
  uploading = false;
  isEditMode = false;
  private unsubscribe$ = new Subject<void>();

  // Separate HttpClient that bypasses interceptors for the direct R2 PUT
  private readonly r2Http: HttpClient;

  constructor(
    private facade: CompanyGalleryImageFacade,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoadingFacade: GlobalLoadingFacade,
    private http: HttpClient,
    httpBackend: HttpBackend,
  ) {
    this.loading$ = this.facade.loading$;
    this.error$ = this.facade.error$;
    this.itemById$ = this.facade.companyGalleryImageById$;
    this.r2Http = new HttpClient(httpBackend);

    this.formGroup = this.fb.group({
      imageUrl:     ['', [Validators.required]],
      caption:      ['', [Validators.maxLength(255)]],
      displayOrder: [0],
      isActive:     [true],
    });

    this.formGroup.controls.imageUrl.valueChanges.subscribe((url: string) => {
      this.imagePreview = url || null;
    });
  }

  get formControl() { return this.formGroup.controls; }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.facade.getCompanyGalleryImageById(id);
      this.itemById$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        if (data) {
          this.formGroup.patchValue({
            imageUrl:     data.imageUrl ?? '',
            caption:      data.caption ?? '',
            displayOrder: data.displayOrder ?? 0,
            isActive:     data.isActive ?? true,
          });
          this.imagePreview = data.imageUrl ?? null;
        }
      });
    }

    this.facade.createSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
      if (success && !this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/company-gallery-image']);
        this.globalLoadingFacade.globalSuccessShow('Gallery image added', 3000);
      }
    });

    this.facade.updateSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
      if (success && this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/company-gallery-image']);
        this.globalLoadingFacade.globalSuccessShow('Gallery image updated', 3000);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.globalLoadingFacade.globalErrorShow('Only JPEG, PNG, or WebP images are allowed', 3000);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.globalLoadingFacade.globalErrorShow('Image must be smaller than 5MB', 3000);
      return;
    }

    this.uploading = true;

    this.http.get<GenericResponseInterface<PresignedUploadResult>>(
      `${environment.baseUrl}/CompanyGalleryImage/GetUploadUrl`,
      { params: { fileName: file.name, contentType: file.type }, withCredentials: true }
    ).pipe(
      switchMap(response => {
        const { presignedUrl, publicUrl } = response.entity;
        return this.r2Http.put(presignedUrl, file, {
          headers: new HttpHeaders({ 'Content-Type': file.type }),
        }).pipe(map(() => publicUrl));
      }),
      catchError(() => {
        this.globalLoadingFacade.globalErrorShow('Failed to upload image. Please try again.', 3000);
        return of(null);
      })
    ).subscribe(publicUrl => {
      this.uploading = false;
      if (publicUrl) {
        this.formGroup.controls.imageUrl.setValue(publicUrl);
        this.formGroup.markAsTouched();
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
      this.facade.updateCompanyGalleryImage({ ...formData, id: this.route.snapshot.params['id'] });
    } else {
      this.facade.createCompanyGalleryImage(formData);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
