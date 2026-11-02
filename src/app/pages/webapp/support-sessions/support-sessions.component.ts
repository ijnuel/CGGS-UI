import { Component, OnInit } from '@angular/core';
import { ImpersonationService, ImpersonationSessionInterface } from '../../../services/impersonation.service';
import { asUtc } from '../../../shared/support-sign-in/support-sign-in.component';
import { UserRolesEnum } from '../../../types/auth';

@Component({
  selector: 'app-support-sessions',
  templateUrl: './support-sessions.component.html',
})
export class SupportSessionsComponent implements OnInit {
  loading = true;
  sessions: ImpersonationSessionInterface[] = [];
  asUtc = asUtc;

  constructor(private impersonationService: ImpersonationService) {}

  ngOnInit(): void {
    this.impersonationService.getSessions().subscribe({
      next: (sessions) => { this.sessions = sessions; this.loading = false; },
      // The HTTP interceptor already shows the API's error message
      error: () => { this.loading = false; },
    });
  }

  userType(type: number): string {
    return type === UserRolesEnum.SuperAdmin ? 'Super Admin' : UserRolesEnum[type] ?? '';
  }
}
