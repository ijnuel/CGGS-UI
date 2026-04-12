import { UserRolesEnum } from '../../types/auth';
import { environment } from '../../../environments/environment';

export default [
  {
    name: 'Home',
    icon: 'assets/icons/home-icon.svg',
    roles: [UserRolesEnum.SuperAdmin,UserRolesEnum.Admin, UserRolesEnum.Student, UserRolesEnum.Staff],
    url: '/app/home'
  },
  {
    name: 'People',
    icon: 'assets/icons/student-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/people'
  },

  {
    name: 'Classes',
    icon: 'assets/icons/class-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/class'
  },

  {
    name: 'Result',
    icon: 'assets/icons/result-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin,UserRolesEnum.Staff],
    url: '/app/result'
  },
  {
    name: 'Bursary',
    icon: 'assets/icons/result-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/bursary'
  },
  {
    name: 'Payments',
    icon: 'assets/icons/result-icon.svg',
    roles: [UserRolesEnum.Student],
    url: '/app/payment'
  },

  {
    name: 'Roles',
    icon: 'assets/icons/roles.svg',
    roles: [UserRolesEnum.SuperAdmin],
    url: '/app/role'
  },
  {
    name: 'Admin Setup',
    icon: 'assets/icons/admin-setup-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/admin-setup'
  },

  ...(environment.production ? [] : [{
    name: 'Test Entity Templates',
    icon: 'assets/icons/settings-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/test-entity-template'
  }]),

  {
    name: 'Settings',
    icon: 'assets/icons/settings-icon.svg',
    roles: [UserRolesEnum.SuperAdmin],
    url: '/app/settings'
  },
];
