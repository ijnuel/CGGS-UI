import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ProgrammeGradeRemarkFacade } from '../../../../store/programme-grade-remark/programme-grade-remark.facade';
import { ProgrammeGradeRemarkFormInterface, ProgrammeGradeRemarkListInterface } from '../../../../types';

export interface GradeRemarkDialogData {
  programTypeId: string;
  existingRemarks: ProgrammeGradeRemarkListInterface[];
  remark?: ProgrammeGradeRemarkListInterface;
}

@Component({
  selector: 'app-grade-remark-dialog',
  templateUrl: './grade-remark-dialog.component.html',
  styleUrls: ['./grade-remark-dialog.component.scss'],
})
export class GradeRemarkDialogComponent implements OnDestroy {
  form: FormGroup<{
    grade: FormControl<string | null>;
    remark: FormControl<string | null>;
    minimumScore: FormControl<number | null>;
    maximumScore: FormControl<number | null>;
  }>;

  loading$ = this.programmeGradeRemarkFacade.loading$;
  error$ = this.programmeGradeRemarkFacade.error$;
  overlapError: string | null = null;
  isEditMode = !!this.data.remark;

  private destroy$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<GradeRemarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GradeRemarkDialogData,
    private fb: FormBuilder,
    private programmeGradeRemarkFacade: ProgrammeGradeRemarkFacade
  ) {
    this.form = this.fb.group({
      grade: [data.remark?.grade ?? '', [Validators.required, Validators.maxLength(10)]],
      remark: [data.remark?.remark ?? '', [Validators.required, Validators.maxLength(255)]],
      minimumScore: [data.remark?.minimumScore ?? null, [Validators.required, Validators.min(0)]],
      maximumScore: [data.remark?.maximumScore ?? null, [Validators.required, Validators.min(0)]],
    });

    this.programmeGradeRemarkFacade.createSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => success && !this.isEditMode)
      )
      .subscribe(() => this.dialogRef.close(true));

    this.programmeGradeRemarkFacade.updateSuccess$
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
      this.overlapError = 'Score range overlaps with an existing grade remark.';
      return;
    }

    const payload: ProgrammeGradeRemarkFormInterface = {
      id: this.data.remark?.id,
      programTypeId: this.data.programTypeId,
      grade: this.form.value.grade!.trim(),
      remark: this.form.value.remark!.trim(),
      minimumScore,
      maximumScore,
    };

    if (this.isEditMode) {
      this.programmeGradeRemarkFacade.updateProgrammeGradeRemark(payload);
    } else {
      this.programmeGradeRemarkFacade.createProgrammeGradeRemark(payload);
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

