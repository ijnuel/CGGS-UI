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
    icon: 'assets/icons/users-icon.svg',
    roles: [],
    url: '/app/student'
  },
  {
    name: 'Administrators',
    icon: 'assets/icons/users-icon.svg',
    roles: [],
    url: '/app/administrator'
  },

  {
    name: 'Staff',
    icon: 'assets/icons/users-icon.svg',
    roles: [],
    url: '/app/staff'
  },

  // {
  //   name: 'Families',
  //   icon: 'assets/icons/users-icon.svg',
  //   roles: [],
  //   url: '/app/family'
  // },

  {
    name: 'Admin Setup',
    icon: 'assets/icons/settings-icon.svg',
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
