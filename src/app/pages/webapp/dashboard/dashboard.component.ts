import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { StudentFacade } from '../../../store/student/student.facade';
import { StaffFacade } from '../../../store/staff/staff.facade';
import { AdministratorFacade } from '../../../store/administrator/administrator.facade';
import { ClassFacade } from '../../../store/class/class.facade';
import { CurrentUserInterface } from '../../../types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<CurrentUserInterface | null>;
  today = new Date();

  stats: Array<{
    label: string;
    count$: Observable<number | null>;
    icon: string;
    color: string;
    bg: string;
    route: string;
    hideCount?: boolean;
  }>;

  quickLinks = [
    { label: 'Students', icon: 'person', route: '/app/student', description: 'Manage student records' },
    { label: 'Staff', icon: 'badge', route: '/app/staff', description: 'Manage staff members' },
    { label: 'Administrators', icon: 'admin_panel_settings', route: '/app/administrator', description: 'Manage administrators' },
    { label: 'Results', icon: 'description', route: '/app/result', description: 'View and manage results' },
    { label: 'Classes', icon: 'school', route: '/app/class', description: 'Manage classes' },
    { label: 'Subjects', icon: 'menu_book', route: '/app/class-subject', description: 'Manage class subjects' },
    { label: 'Sessions', icon: 'event', route: '/app/school-term-session', description: 'Manage school term sessions' },
    { label: 'Admin Setup', icon: 'settings', route: '/app/admin-setup', description: 'System configuration' },
  ];

  constructor(
    private authFacade: AuthFacade,
    private studentFacade: StudentFacade,
    private staffFacade: StaffFacade,
    private administratorFacade: AdministratorFacade,
    private classFacade: ClassFacade,
  ) {
    this.currentUser$ = this.authFacade.selectedCurrentUser$;

    this.stats = [
      { label: 'Students', count$: this.studentFacade.count$, icon: 'person', color: 'text-blue-500', bg: 'bg-blue-50', route: '/app/student' },
      { label: 'Staff', count$: this.staffFacade.count$, icon: 'badge', color: 'text-teal-500', bg: 'bg-teal-50', route: '/app/staff' },
      { label: 'Administrators', count$: this.administratorFacade.count$, icon: 'admin_panel_settings', color: 'text-indigo-500', bg: 'bg-indigo-50', route: '/app/administrator' },
      { label: 'Results', count$: of(null), icon: 'description', color: 'text-green-500', bg: 'bg-green-50', route: '/app/result', hideCount: true },
      { label: 'Classes', count$: this.classFacade.count$, icon: 'school', color: 'text-orange-500', bg: 'bg-orange-50', route: '/app/class' },
    ];
  }

  ngOnInit(): void {
    this.studentFacade.studentCount();
    this.staffFacade.staffCount();
    this.administratorFacade.administratorCount();
    this.classFacade.classCount();
  }
}
