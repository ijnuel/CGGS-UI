import { UserRolesEnum } from '../../../types/auth';

export default [
  {
    name: 'Update Results',
    icon: 'assets/icons/result-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin,UserRolesEnum.Staff],
    url: '/app/result/update'
  },
  {
    name: 'View Results',
    icon: 'assets/icons/result-icon.svg',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/result/view'
  },
];
