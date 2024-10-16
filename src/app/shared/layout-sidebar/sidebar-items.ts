import { UserRolesEnum } from '../../types/auth';

export default [
  {
    name: 'Home',
    icon: 'assets/icons/home-icon.svg',
    roles: [UserRolesEnum.Admin, UserRolesEnum.Student, UserRolesEnum.Teacher],
    url: '/app/home'
  },
  {
    name: 'Students',
    icon: 'assets/icons/users-icon.svg',
    roles: [],
    url: '/app/students'
  },

  {
    name: 'Staff',
    icon: 'assets/icons/users-icon.svg',
    roles: [],
    url: '/app/staff'
  },

  {
    name: 'Settings',
    icon: 'assets/icons/settings-icon.svg',
    roles: [],
  },
];
