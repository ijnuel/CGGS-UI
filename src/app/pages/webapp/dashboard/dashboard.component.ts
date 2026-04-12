import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { StudentFacade } from '../../../store/student/student.facade';
import { StaffFacade } from '../../../store/staff/staff.facade';
import { AdministratorFacade } from '../../../store/administrator/administrator.facade';
import { ClassFacade } from '../../../store/class/class.facade';
import { CurrentUserInterface } from '../../../types';
import { UserRolesEnum } from '../../../types/auth';

interface StatItem {
  label: string;
  count$: Observable<number | null>;
  icon: string;
  color: string;
  bg: string;
  route: string;
  hideCount?: boolean;
  roles: UserRolesEnum[];
}

interface QuickLinkItem {
  label: string;
  icon: string;
  route: string;
  description: string;
  roles: UserRolesEnum[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<CurrentUserInterface | null>;
  today = new Date();

  stats: StatItem[] = [];
  quickLinks: QuickLinkItem[] = [];

  private allStats: StatItem[] = [];
  private allQuickLinks: QuickLinkItem[] = [];

  constructor(
    private authFacade: AuthFacade,
    private studentFacade: StudentFacade,
    private staffFacade: StaffFacade,
    private administratorFacade: AdministratorFacade,
    private classFacade: ClassFacade,
  ) {
    this.currentUser$ = this.authFacade.selectedCurrentUser$;

    this.allStats = [
      {
        label: 'Students', count$: this.studentFacade.count$,
        icon: 'person', color: 'text-blue-500', bg: 'bg-blue-50',
        route: '/app/student',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Staff', count$: this.staffFacade.count$,
        icon: 'badge', color: 'text-teal-500', bg: 'bg-teal-50',
        route: '/app/staff',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Administrators', count$: this.administratorFacade.count$,
        icon: 'admin_panel_settings', color: 'text-indigo-500', bg: 'bg-indigo-50',
        route: '/app/administrator',
        roles: [UserRolesEnum.SuperAdmin],
      },
      {
        label: 'Results', count$: of(null),
        icon: 'description', color: 'text-green-500', bg: 'bg-green-50',
        route: '/app/result', hideCount: true,
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin, UserRolesEnum.Staff],
      },
      {
        label: 'My Result', count$: of(null),
        icon: 'assignment_ind', color: 'text-green-500', bg: 'bg-green-50',
        route: '/app/result/my-result', hideCount: true,
        roles: [UserRolesEnum.Student],
      },
      {
        label: 'My Payments', count$: of(null),
        icon: 'receipt_long', color: 'text-purple-500', bg: 'bg-purple-50',
        route: '/app/payment', hideCount: true,
        roles: [UserRolesEnum.Student],
      },
      {
        label: 'Classes', count$: this.classFacade.count$,
        icon: 'school', color: 'text-orange-500', bg: 'bg-orange-50',
        route: '/app/class',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
    ];

    this.allQuickLinks = [
      {
        label: 'Students', icon: 'person', route: '/app/student',
        description: 'Manage student records',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Staff', icon: 'badge', route: '/app/staff',
        description: 'Manage staff members',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Administrators', icon: 'admin_panel_settings', route: '/app/administrator',
        description: 'Manage administrators',
        roles: [UserRolesEnum.SuperAdmin],
      },
      {
        label: 'Results', icon: 'description', route: '/app/result',
        description: 'View and manage results',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin, UserRolesEnum.Staff],
      },
      {
        label: 'My Result', icon: 'assignment_ind', route: '/app/result/my-result',
        description: 'View your personal result sheet',
        roles: [UserRolesEnum.Student],
      },
      {
        label: 'My Payments', icon: 'receipt_long', route: '/app/payment',
        description: 'View fees and make payments',
        roles: [UserRolesEnum.Student],
      },
      {
        label: 'Classes', icon: 'school', route: '/app/class',
        description: 'Manage classes',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Subjects', icon: 'menu_book', route: '/app/class-subject',
        description: 'Manage class subjects',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Sessions', icon: 'event', route: '/app/school-term-session',
        description: 'Manage school term sessions',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
      {
        label: 'Admin Setup', icon: 'settings', route: '/app/admin-setup',
        description: 'System configuration',
        roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
      },
    ];
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      if (!user) return;
      this.stats = this.allStats.filter(s => s.roles.includes(user.userType));
      this.quickLinks = this.allQuickLinks.filter(l => l.roles.includes(user.userType));

      const visibleLabels = new Set(this.stats.map(s => s.label));
      if (visibleLabels.has('Students')) this.studentFacade.studentCount();
      if (visibleLabels.has('Staff')) this.staffFacade.staffCount();
      if (visibleLabels.has('Administrators')) this.administratorFacade.administratorCount();
      if (visibleLabels.has('Classes')) this.classFacade.classCount();
    });
  }
}
