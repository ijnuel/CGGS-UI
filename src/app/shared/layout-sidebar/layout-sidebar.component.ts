import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import SidebarMenuItems from './sidebar-items';
import { SidebarItemsInterface } from '../../types/sidebar';
import { AuthFacade } from '../../store/auth/auth.facade';
import { UserRolesEnum } from '../../types';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss',
})
export class LayoutSidebarComponent implements OnInit {
  @Output() menuItemClickEvent = new EventEmitter();

  sidebarMenuItems: SidebarItemsInterface[] = [];

  constructor(
    private authFacade: AuthFacade
  ) {

  }
  ngOnInit(): void {
    this.authFacade.selectedCurrentUser$.subscribe(currentUser => 
      this.sidebarMenuItems =  SidebarMenuItems
        .filter(x => x.roles.length == 0 || x.roles.includes(currentUser?.userType!))
    );
  }

  

  menuItemClick() {
    this.menuItemClickEvent.emit();
  }
  logoutUser() {
    this.authFacade.logout();
  }
}
