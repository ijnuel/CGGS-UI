import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebappComponent } from './webapp.component';
import { RoleGuard } from '../../services/role.guard';
import { UserRolesEnum } from '../../types/auth';

const ALL_AUTHENTICATED   = [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin, UserRolesEnum.Staff, UserRolesEnum.Student, UserRolesEnum.Family, UserRolesEnum.Guest];
const ADMIN_AND_ABOVE     = [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin];
const STAFF_AND_ABOVE     = [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin, UserRolesEnum.Staff];
const SUPERADMIN_ONLY     = [UserRolesEnum.SuperAdmin];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: WebappComponent,
    canActivateChild: [RoleGuard],
    children: [
      // ── Accessible by all authenticated users ─────────────────────────────
      {
        path: 'home',
        data: { roles: ALL_AUTHENTICATED },
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'change-password',
        data: { roles: ALL_AUTHENTICATED },
        loadChildren: () => import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
      },
      {
        path: 'profile',
        data: { roles: ALL_AUTHENTICATED },
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
      },

      // ── Staff and above ───────────────────────────────────────────────────
      {
        path: 'result',
        data: { roles: [...STAFF_AND_ABOVE, UserRolesEnum.Student] },
        loadChildren: () => import('./result/result.module').then((m) => m.ResultModule),
      },

      // ── All authenticated (student payment) ──────────────────────────────
      {
        path: 'payment',
        data: { roles: ALL_AUTHENTICATED },
        loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule),
      },

      // ── Admin and above ───────────────────────────────────────────────────
      {
        path: 'student',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
      },
      {
        path: 'class',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./class/class.module').then((m) => m.ClassModule),
      },
      {
        path: 'staff',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./staff/staff.module').then((m) => m.StaffModule),
      },
      {
        path: 'family',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./family/family.module').then((m) => m.FamilyModule),
      },
      {
        path: 'application',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule),
      },
      {
        path: 'student-class',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./student-class/student-class.module').then((m) => m.StudentClassModule),
      },
      {
        path: 'data-import',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./data-import/data-import.module').then((m) => m.DataImportModule),
      },
      {
        path: 'bursary',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./bursary/bursary.module').then((m) => m.BursaryModule),
      },

      // ── Admin Setup sub-routes (Admin and above) ──────────────────────────
      {
        path: 'admin-setup',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./admin-setup/admin-setup.module').then((m) => m.AdminSetupModule),
      },
      {
        path: 'program-type',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./program-type/program-type.module').then((m) => m.ProgramTypeModule),
      },
      {
        path: 'class-level',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./class-level/class-level.module').then((m) => m.ClassLevelModule),
      },
      {
        path: 'class-subject',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./class-subject/class-subject.module').then((m) => m.ClassSubjectModule),
      },
      {
        path: 'class-subject-assessment',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./class-subject-assessment/class-subject-assessment.module').then((m) => m.ClassSubjectAssessmentModule),
      },
      {
        path: 'subject',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./subject/subject.module').then((m) => m.SubjectModule),
      },
      {
        path: 'school-term-session',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./school-term-session/school-term-session.module').then((m) => m.SchoolTermSessionModule),
      },
      {
        path: 'principal-remark',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./principal-remark/principal-remark.module').then((m) => m.PrincipalRemarkModule),
      },
      {
        path: 'programme-grade-remark',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./programme-grade-remark/programme-grade-remark.module').then((m) => m.ProgrammeGradeRemarkModule),
      },
      {
        path: 'test-entity-template',
        data: { roles: ADMIN_AND_ABOVE },
        loadChildren: () => import('./test-entity-template/test-entity-template.module').then((m) => m.TestEntityTemplateModule),
      },

      // ── SuperAdmin only ───────────────────────────────────────────────────
      {
        path: 'role',
        data: { roles: SUPERADMIN_ONLY },
        loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'administrator',
        data: { roles: SUPERADMIN_ONLY },
        loadChildren: () => import('./administrator/administrator.module').then((m) => m.AdministratorModule),
      },
      {
        path: 'settings',
        data: { roles: SUPERADMIN_ONLY },
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'company',
        data: { roles: SUPERADMIN_ONLY },
        loadChildren: () => import('./company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 'country',
        data: { roles: SUPERADMIN_ONLY },
        loadChildren: () => import('./country/country.module').then((m) => m.CountryModule),
      },
      {
        path: 'state',
        data: { roles: SUPERADMIN_ONLY },
        loadChildren: () => import('./state/state.module').then((m) => m.StateModule),
      },
      {
        path: 'local-government-area',
        data: { roles: SUPERADMIN_ONLY },
        loadChildren: () => import('./local-government-area/local-government-area.module').then((m) => m.LocalGovernmentAreaModule),
      },
      {
        path: 'session',
        data: { roles: SUPERADMIN_ONLY },
        loadChildren: () => import('./session/session.module').then((m) => m.SessionModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebappRoutingModule {}
