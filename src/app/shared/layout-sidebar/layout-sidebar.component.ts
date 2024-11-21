import { Component, EventEmitter, Output } from '@angular/core';
import SidebarMenuItems from './sidebar-items';
import { SidebarItemsInterface } from '../../types/sidebar';
import { AuthFacade } from '../../store/auth/auth.facade';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss',
})
export class LayoutSidebarComponent {
  @Output() menuItemClickEvent = new EventEmitter();

  sidebarMenuItems: SidebarItemsInterface[] = SidebarMenuItems;

  constructor(
    private authFacade: AuthFacade
  ) {

  }

  menuItemClick() {
    this.menuItemClickEvent.emit();
  }
  logoutUser() {
    this.authFacade.logout();
  }
}
