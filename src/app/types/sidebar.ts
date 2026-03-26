import { UserRolesEnum } from './auth';

export interface SidebarItemsInterface {
  name: string;
  icon: string;
  matIcon?: string;
  description?: string;
  roles: UserRolesEnum[];
  url?: string;
}
