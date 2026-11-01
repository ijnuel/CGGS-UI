import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StaffAssignmentService } from '../../../services/staff-assignment.service';
import { SchoolTermSessionFacade } from '../../../store/school-term-session/school-term-session.facade';
import { SchoolTermSessionListInterface, TermEnum } from '../../../types';
import { StaffClassSubjectInterface, StaffFormClassInterface } from '../../../types/staff';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
})
export class MyClassesComponent implements OnInit, OnDestroy {
  loading = true;
  formClasses: StaffFormClassInterface[] = [];
  subjects: StaffClassSubjectInterface[] = [];
  currentTerm: SchoolTermSessionListInterface | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private staffAssignmentService: StaffAssignmentService,
    private schoolTermSessionFacade: SchoolTermSessionFacade,
  ) {}

  ngOnInit(): void {
    this.schoolTermSessionFacade.getSchoolTermSessionAll({ nestedProperties: [{ name: 'session' }] });

    combineLatest([this.staffAssignmentService.myScope$(), this.schoolTermSessionFacade.schoolTermSessionAll$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([scope, terms]) => {
        this.loading = false;
        this.formClasses = scope?.formClasses ?? [];
        this.currentTerm = terms?.find((t) => t.isCurrent) ?? null;
        // Show this term's subjects; fall back to every assignment if no term is marked current
        const all = scope?.classSubjects ?? [];
        this.subjects = this.currentTerm ? all.filter((s) => s.schoolTermSessionId === this.currentTerm!.id) : all;
      });
  }

  termName(term: number): string {
    return `${TermEnum[term]} Term`;
  }

  scoresLink(subject: StaffClassSubjectInterface) {
    return {
      schoolTermSessionId: subject.schoolTermSessionId,
      classId: subject.classId,
      subjectId: subject.subjectId,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
