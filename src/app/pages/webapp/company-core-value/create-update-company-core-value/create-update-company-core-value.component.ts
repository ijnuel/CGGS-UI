import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompanyCoreValueFacade } from '../../../../store/company-core-value/company-core-value.facade';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { CompanyCoreValueListInterface } from '../../../../types';
import { getErrorMessageHelper } from '../../../../services/helper.service';

@Component({
  selector: 'app-create-update-company-core-value',
  templateUrl: './create-update-company-core-value.component.html',
  styleUrls: ['./create-update-company-core-value.component.scss'],
})
export class CreateUpdateCompanyCoreValueComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  itemById$: Observable<CompanyCoreValueListInterface | null>;

  formGroup: FormGroup<{
    title: FormControl;
    body: FormControl;
    iconName: FormControl;
    displayOrder: FormControl;
    isActive: FormControl;
  }>;

  isEditMode = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private facade: CompanyCoreValueFacade,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private globalLoadingFacade: GlobalLoadingFacade,
  ) {
    this.loading$ = this.facade.loading$;
    this.error$ = this.facade.error$;
    this.itemById$ = this.facade.companyCoreValueById$;

    this.formGroup = this.fb.group({
      title:        ['', [Validators.required, Validators.maxLength(255)]],
      body:         ['', [Validators.required]],
      iconName:     ['', [Validators.maxLength(100)]],
      displayOrder: [0],
      isActive:     [true],
    });
  }

  get formControl() { return this.formGroup.controls; }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.facade.getCompanyCoreValueById(id);
      this.itemById$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        if (data) {
          this.formGroup.patchValue({
            title:        data.title ?? '',
            body:         data.body ?? '',
            iconName:     data.iconName ?? '',
            displayOrder: data.displayOrder ?? 0,
            isActive:     data.isActive ?? true,
          });
        }
      });
    }

    this.facade.createSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
      if (success && !this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/company-core-value']);
        this.globalLoadingFacade.globalSuccessShow('Core value created', 3000);
      }
    });

    this.facade.updateSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
      if (success && this.isEditMode && this.formGroup.touched) {
        this.router.navigate(['/app/company-core-value']);
        this.globalLoadingFacade.globalSuccessShow('Core value updated', 3000);
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
      this.facade.updateCompanyCoreValue({ ...formData, id: this.route.snapshot.params['id'] });
    } else {
      this.facade.createCompanyCoreValue(formData);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
