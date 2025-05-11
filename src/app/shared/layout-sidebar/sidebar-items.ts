import { UserRolesEnum } from '../../types/auth';

export default [
  {
    name: 'Home',
    icon: 'assets/icons/home-icon.svg',
    roles: [UserRolesEnum.SuperAdmin,UserRolesEnum.Admin, UserRolesEnum.Student, UserRolesEnum.Teacher],
    url: '/app/home'
  },
  {
    name: 'Students',
    icon: 'assets/icons/users-icon.svg',
    roles: [],
    url: '/app/students'
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
    url: '/app/teacher'
  },

  {
    name: 'Settings',
    icon: 'assets/icons/settings-icon.svg',
    roles: [],
    url: '/app/settings'
  },
];
