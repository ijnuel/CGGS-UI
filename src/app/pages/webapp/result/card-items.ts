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
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin, UserRolesEnum.Staff],
    url: '/app/result/view'
  },
  {
    name: 'My Results',
    icon: 'assets/icons/result-icon.svg',
    matIcon: 'assignment_ind',
    description: 'Results by term, subject progress and report cards',
    roles: [UserRolesEnum.Student],
    url: '/app/result/my-result'
  },
  {
    name: 'Promote Students',
    icon: 'assets/icons/result-icon.svg',
    matIcon: 'trending_up',
    description: 'Promote or retain students based on session average scores',
    roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin],
    url: '/app/result/promote'
  },
];
