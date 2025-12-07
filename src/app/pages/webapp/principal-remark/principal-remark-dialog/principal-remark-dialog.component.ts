import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { PrincipalRemarkFacade } from '../../../../store/principal-remark/principal-remark.facade';
import { PrincipalRemarkFormInterface, PrincipalRemarkListInterface } from '../../../../types';

export interface PrincipalRemarkDialogData {
  programTypeId: string;
  existingRemarks: PrincipalRemarkListInterface[];
  remark?: PrincipalRemarkListInterface;
}

@Component({
  selector: 'app-principal-remark-dialog',
  templateUrl: './principal-remark-dialog.component.html',
  styleUrls: ['./principal-remark-dialog.component.scss'],
})
export class PrincipalRemarkDialogComponent implements OnDestroy {
  form: FormGroup<{
    remark: FormControl<string | null>;
    minimumScore: FormControl<number | null>;
    maximumScore: FormControl<number | null>;
  }>;

  loading$ = this.principalRemarkFacade.loading$;
  error$ = this.principalRemarkFacade.error$;
  overlapError: string | null = null;
  isEditMode = !!this.data.remark;

  private destroy$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<PrincipalRemarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrincipalRemarkDialogData,
    private fb: FormBuilder,
    private principalRemarkFacade: PrincipalRemarkFacade
  ) {
    this.form = this.fb.group({
      remark: [data.remark?.remark ?? '', [Validators.required, Validators.maxLength(255)]],
      minimumScore: [data.remark?.minimumScore ?? null, [Validators.required, Validators.min(0)]],
      maximumScore: [data.remark?.maximumScore ?? null, [Validators.required, Validators.min(0)]],
    });

    this.principalRemarkFacade.createSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success && !this.isEditMode)
      )
      .subscribe(() => this.dialogRef.close(true));

    this.principalRemarkFacade.updateSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success && this.isEditMode)
      )
      .subscribe(() => this.dialogRef.close(true));
  }

  get formControl() {
    return this.form.controls;
  }

  submit(): void {
    this.form.markAllAsTouched();
    this.overlapError = null;

    if (this.form.invalid) {
      return;
    }

    const minimumScore = this.normalizeScore(this.form.value.minimumScore!);
    const maximumScore = this.normalizeScore(this.form.value.maximumScore!);

    if (minimumScore > maximumScore) {
      this.overlapError = 'Minimum score must be less than or equal to maximum score.';
      return;
    }

    if (this.rangeOverlaps(minimumScore, maximumScore)) {
      this.overlapError = 'Score range overlaps with an existing principal remark.';
      return;
    }

    const payload: PrincipalRemarkFormInterface = {
      id: this.data.remark?.id,
      programTypeId: this.data.programTypeId,
      remark: this.form.value.remark!.trim(),
      minimumScore,
      maximumScore,
    };

    if (this.isEditMode) {
      this.principalRemarkFacade.updatePrincipalRemark(payload);
    } else {
      this.principalRemarkFacade.createPrincipalRemark(payload);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  private rangeOverlaps(min: number, max: number): boolean {
    return this.data.existingRemarks
      .filter((remark) => !this.isEditMode || remark.id !== this.data.remark?.id)
      .some((remark) => !(max < remark.minimumScore || min > remark.maximumScore));
  }

  private normalizeScore(score: number): number {
    return Math.round(score * 100) / 100;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

