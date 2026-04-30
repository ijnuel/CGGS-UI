import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SchoolTermSessionFacade } from '../../../../store/school-term-session/school-term-session.facade';
import * as SchoolTermSessionAction from '../../../../store/school-term-session/school-term-session.actions';
import { SchoolTermSessionListInterface } from '../../../../types/school-term-session';

export interface CloneSchoolTermSessionDialogData {
  destination: SchoolTermSessionListInterface;
}

@Component({
  selector: 'app-clone-school-term-session',
  templateUrl: './clone-school-term-session.component.html',
})
export class CloneSchoolTermSessionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  sourceControl = new FormControl<string>('');
  availableSessions: SchoolTermSessionListInterface[] = [];
  sessionsLoading = true;
  cloning = false;

  getSessionLabel = (ts: SchoolTermSessionListInterface): string => {
    const term = ts.termString ?? `Term ${ts.term}`;
    const session = ts.session?.name ?? '';
    return `${session} - ${term}`;
  };

  constructor(
    public dialogRef: MatDialogRef<CloneSchoolTermSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CloneSchoolTermSessionDialogData,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.schoolTermSessionFacade.getSchoolTermSessionAll({ nestedProperties: [{ name: 'session' }] });

    this.schoolTermSessionFacade.schoolTermSessionAll$.pipe(takeUntil(this.destroy$)).subscribe(sessions => {
      if (sessions !== null) {
        this.availableSessions = sessions.filter(s => s.id !== this.data.destination.id);
        this.sessionsLoading = false;
      }
    });

    this.actions$.pipe(ofType(SchoolTermSessionAction.cloneSchoolTermSessionSuccess), takeUntil(this.destroy$))
      .subscribe(() => this.dialogRef.close({ success: true }));

    this.actions$.pipe(ofType(SchoolTermSessionAction.cloneSchoolTermSessionFail), takeUntil(this.destroy$))
      .subscribe(() => { this.cloning = false; });
  }

  get destinationLabel(): string {
    return this.getSessionLabel(this.data.destination);
  }

  confirm() {
    if (!this.sourceControl.value || this.cloning) return;
    this.cloning = true;
    this.schoolTermSessionFacade.cloneSchoolTermSession(this.sourceControl.value, this.data.destination.id);
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
