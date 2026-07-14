import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface TypeToConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-type-to-confirm-dialog',
  templateUrl: './type-to-confirm-dialog.component.html',
})
export class TypeToConfirmDialogComponent implements OnInit {
  confirmCode = '';
  inputControl = new FormControl('');

  get isMatch(): boolean {
    return this.inputControl.value === this.confirmCode;
  }

  constructor(
    public dialogRef: MatDialogRef<TypeToConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeToConfirmDialogData,
  ) {}

  ngOnInit() {
    this.confirmCode = this.generateCode();
  }

  confirm() {
    if (this.isMatch) this.dialogRef.close(true);
  }

  private generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
