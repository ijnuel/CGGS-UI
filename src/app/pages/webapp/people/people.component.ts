import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { StudentFacade } from '../../../store/student/student.facade';
import { StaffFacade } from '../../../store/staff/staff.facade';
import { AdministratorFacade } from '../../../store/administrator/administrator.facade';
import { Observable, of } from 'rxjs';
import { UserRolesEnum } from '../../../types/auth';
import { CurrentUserInterface } from '../../../types';

interface PeopleCard {
  label: string;
  description: string;
  icon: string;
  gradient: string;
  route: string;
  count$: Observable<number | null>;
  roles: UserRolesEnum[];
}

@Component({
  selector: 'app-people',
  template: `
    <div class="p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800">People</h2>
        <p class="text-sm text-gray-500 mt-1">Manage students, staff and administrators</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ng-container *ngFor="let card of visibleCards">
          <a [routerLink]="card.route"
             class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer no-underline group">

            <!-- Card header with gradient -->
            <div class="px-6 py-5 flex items-center gap-4"
                 [ngStyle]="{ background: card.gradient }">
              <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <mat-icon class="text-white !text-2xl">{{ card.icon }}</mat-icon>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">{{ card.label }}</h3>
                <p class="text-white/80 text-sm">{{ card.description }}</p>
              </div>
            </div>

            <!-- Card footer with count -->
            <div class="px-6 py-4 flex items-center justify-between">
              <ng-container *ngIf="(card.count$ | async) as count; else countSkeleton">
                <span class="text-2xl font-bold text-gray-800">{{ count }}</span>
              </ng-container>
              <ng-template #countSkeleton>
                <div class="h-7 w-10 bg-gray-200 rounded animate-pulse"></div>
              </ng-template>
              <div class="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                   style="color: var(--app-primary);">
                <span>View all</span>
                <mat-icon class="!text-base">arrow_forward</mat-icon>
              </div>
            </div>

          </a>
        </ng-container>
      </div>
    </div>
  `,
})
export class PeopleComponent implements OnInit {
  visibleCards: PeopleCard[] = [];

  private allCards: PeopleCard[] = [];

  constructor(
    private authFacade: AuthFacade,
    private studentFacade: StudentFacade,
    private staffFacade: StaffFacade,
    private administratorFacade: AdministratorFacade,
    private router: Router,
  ) {
    this.allCards = [
      {
        label: 'Students',
        description: 'Enrolled students',
        icon: 'person',
        gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        route: '/app/student',
        count$: this.studentFacade.count$,
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Staff',
        description: 'Teaching & support staff',
        icon: 'badge',
        gradient: 'linear-gradient(135deg, #0d9488, #0891b2)',
        route: '/app/staff',
        count$: this.staffFacade.count$,
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Administrators',
        description: 'System administrators',
        icon: 'admin_panel_settings',
        gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        route: '/app/administrator',
        count$: this.administratorFacade.count$,
        roles: [UserRolesEnum.SuperAdmin],
      },
    ];
  }

  ngOnInit() {
    this.authFacade.selectedCurrentUser$.subscribe((user: CurrentUserInterface | null) => {
      if (!user) return;
      this.visibleCards = this.allCards.filter(c => c.roles.includes(user.userType));
      const labels = new Set(this.visibleCards.map(c => c.label));
      if (labels.has('Students')) this.studentFacade.studentCount();
      if (labels.has('Staff')) this.staffFacade.staffCount();
      if (labels.has('Administrators')) this.administratorFacade.administratorCount();
    });
  }
}
