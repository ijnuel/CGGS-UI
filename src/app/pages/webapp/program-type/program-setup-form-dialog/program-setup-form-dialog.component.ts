import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramSetupLevel, DropdownListInterface, StaffListInterface } from '../../../../types';

export interface ProgramSetupFormDialogData {
  level: ProgramSetupLevel;
  isEditMode: boolean;
  initialValue?: any;
  subjects?: DropdownListInterface[];
  staffs?: StaffListInterface[];
}

@Component({
  selector: 'app-program-setup-form-dialog',
  templateUrl: './program-setup-form-dialog.component.html',
})
export class ProgramSetupFormDialogComponent {
  ProgramSetupLevel = ProgramSetupLevel;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProgramSetupFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProgramSetupFormDialogData
  ) {
    this.form = this.buildForm();
    if (data.initialValue) {
      this.form.patchValue(data.initialValue);
    }
  }

  private buildForm(): FormGroup {
    switch (this.data.level) {
      case ProgramSetupLevel.CLASSLEVEL:
        return this.fb.group({
          id: [''],
          level: [null, [Validators.required, Validators.min(1)]]
        });
      case ProgramSetupLevel.CLASSARM:
        return this.fb.group({
          id: [''],
          name: ['', [Validators.required, Validators.maxLength(255)]],
          staffId: [null]
        });
      case ProgramSetupLevel.CLASSSUBJECT:
        return this.fb.group({
          id: [''],
          subjectId: ['', [Validators.required]],
          staffId: [null]
        });
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT:
        return this.fb.group({
          id: [''],
          assessmentType: ['', [Validators.required, Validators.maxLength(255)]],
          scoreWeigth: [null, [Validators.required, Validators.min(1)]]
        });
      default:
        return this.fb.group({});
    }
  }

  getLevelTitle(): string {
    switch (this.data.level) {
      case ProgramSetupLevel.CLASSLEVEL: return 'Class Level';
      case ProgramSetupLevel.CLASSARM: return 'Class';
      case ProgramSetupLevel.CLASSSUBJECT: return 'Subject';
      case ProgramSetupLevel.CLASSSUBJECTASSESSMENT: return 'Assessment';
      default: return '';
    }
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
