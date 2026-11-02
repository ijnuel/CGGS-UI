import { Component, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { AuditActivityInterface, AuditDataChangeInterface, AuditFilter, AuditRequestDetailInterface, AuditService } from '../../../services/audit.service';
import { asUtc } from '../../../shared/support-sign-in/support-sign-in.component';
import { toLocalDateString } from '../../../services/helper.service';
import { UserRolesEnum } from '../../../types/auth';

const EVENT_LABELS: Record<string, string> = {
  LoginSucceeded: 'Signed in',
  LoginFailed: 'Failed sign-in',
  Logout: 'Signed out',
  PasswordChanged: 'Changed password',
  PasswordChangeFailed: 'Password change failed',
  PasswordResetRequested: 'Requested password reset',
  PasswordResetCompleted: 'Reset password by email link',
  AdminPasswordReset: 'Reset a user\'s password',
  ImpersonationStarted: 'Started support session',
  ImpersonationEnded: 'Ended support session',
  CompanySwitched: 'Switched school',
  AccessDenied: 'Access denied',
  Unauthenticated: 'Not signed in',
};

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
})
export class AuditComponent implements OnInit {
  readonly asUtc = asUtc;
  readonly pageSize = 50;
  readonly eventTypes = Object.entries(EVENT_LABELS).map(([value, label]) => ({ value, label }));
  readonly outcomes = ['Success', 'ClientError', 'Unauthenticated', 'Denied', 'ServerError'];
  readonly actions = ['Created', 'Updated', 'Deleted', 'Restored'];

  // Activity
  activity: AuditActivityInterface[] = [];
  activityTotal = 0;
  activityPage = 1;
  activityLoading = false;
  activityFilter = { from: null as Date | null, to: null as Date | null, outcome: '', eventType: '', search: '', securityEventsOnly: false };
  expandedRequestId: string | null = null;
  requestDetail: AuditRequestDetailInterface | null = null;

  // Data changes
  changes: AuditDataChangeInterface[] = [];
  changesTotal = 0;
  changesPage = 1;
  changesLoading = false;
  changesLoaded = false;
  entityNames: string[] = [];
  changesFilter = { from: null as Date | null, to: null as Date | null, entityName: '', action: '', entityId: '' };
  expandedChangeId: number | null = null;

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.loadActivity();
  }

  onTabChange(index: number): void {
    if (index === 1 && !this.changesLoaded) {
      this.changesLoaded = true;
      this.auditService.getEntityNames().subscribe((names) => (this.entityNames = names ?? []));
      this.loadChanges();
    }
  }

  loadActivity(page = 1): void {
    this.activityPage = page;
    this.activityLoading = true;
    const f = this.activityFilter;
    this.auditService
      .getActivity({ ...this.dateRange(f.from, f.to), outcome: f.outcome, eventType: f.eventType, search: f.search, securityEventsOnly: f.securityEventsOnly || null, page, pageSize: this.pageSize })
      .subscribe({
        next: (result) => { this.activity = result.data ?? []; this.activityTotal = result.totalCount; this.activityLoading = false; },
        // The HTTP interceptor already shows the API's error message
        error: () => { this.activityLoading = false; },
      });
  }

  loadChanges(page = 1): void {
    this.changesPage = page;
    this.changesLoading = true;
    const f = this.changesFilter;
    this.auditService
      .getDataChanges({ ...this.dateRange(f.from, f.to), entityName: f.entityName, action: f.action, entityId: f.entityId.trim(), page, pageSize: this.pageSize })
      .subscribe({
        next: (result) => { this.changes = result.data ?? []; this.changesTotal = result.totalCount; this.changesLoading = false; },
        error: () => { this.changesLoading = false; },
      });
  }

  toggleRequest(row: AuditActivityInterface): void {
    if (this.expandedRequestId === row.requestId) {
      this.expandedRequestId = null;
      return;
    }
    this.expandedRequestId = row.requestId;
    this.requestDetail = null;
    this.auditService.getRequest(row.requestId).subscribe((detail) => {
      if (this.expandedRequestId === row.requestId) this.requestDetail = detail;
    });
  }

  toggleChange(row: AuditDataChangeInterface): void {
    this.expandedChangeId = this.expandedChangeId === row.id ? null : row.id;
  }

  // History of one record: switch to the data changes tab filtered to it
  showHistory(change: AuditDataChangeInterface, tabs: MatTabGroup): void {
    this.changesFilter = { from: null, to: null, entityName: change.entityName, action: '', entityId: change.entityId };
    this.changesLoaded = true;
    tabs.selectedIndex = 1;
    this.auditService.getEntityNames().subscribe((names) => (this.entityNames = names ?? []));
    this.loadChanges();
  }

  eventLabel(eventType: string | null): string {
    return eventType ? EVENT_LABELS[eventType] ?? eventType : '';
  }

  userTypeLabel(type: number | null): string {
    if (type === null || type === undefined) return '';
    return type === UserRolesEnum.SuperAdmin ? 'Super Admin' : UserRolesEnum[type] ?? '';
  }

  totalPages(total: number): number {
    return Math.max(1, Math.ceil(total / this.pageSize));
  }

  // "to" is inclusive in the filter, so send the start of the following day
  private dateRange(from: Date | null, to: Date | null): AuditFilter {
    const end = to ? new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1) : null;
    return { from: toLocalDateString(from), to: toLocalDateString(end) };
  }
}
