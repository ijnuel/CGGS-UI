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
    name: 'Students',
    icon: 'assets/icons/student-icon.svg',
    roles: [],
    url: '/app/student'
  },

  // {
  //   name: 'Families',
  //   icon: 'assets/icons/users-icon.svg',
  //   roles: [],
  //   url: '/app/family'
  // },

  {
    name: 'Classes',
    icon: 'assets/icons/class-icon.svg',
    roles: [],
    url: '/app/class'
  },

  {
    name: 'Result',
    icon: 'assets/icons/result-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/result'
  },

  {
    name: 'Staff',
    icon: 'assets/icons/staff-icon.svg',
    roles: [],
    url: '/app/staff'
  },
  {
    name: 'Administrators',
    icon: 'assets/icons/admin-icon.svg',
    roles: [],
    url: '/app/administrator'
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
