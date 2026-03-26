import { UserRolesEnum } from '../../../types/auth';

export default [
  {
    name: 'Update Results',
    icon: 'assets/icons/result-icon.svg',
    matIcon: 'edit_note',
    description: 'Enter and update student assessment scores',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin, UserRolesEnum.Staff],
    url: '/app/result/update'
  },
  {
    name: 'View Results',
    icon: 'assets/icons/result-icon.svg',
    matIcon: 'bar_chart',
    description: 'View and print student result sheets',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/result/view'
  },
];
