import { UserRolesEnum } from './auth';

export interface SidebarItemsInterface {
  name: string;
  icon: string;
  roles: UserRolesEnum[];
  url?: string;
}
