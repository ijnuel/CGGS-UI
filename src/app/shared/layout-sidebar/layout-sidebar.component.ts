import { Component, EventEmitter, Output } from '@angular/core';
import SidebarMenuItems from './sidebar-items';
import { SidebarItemsInterface } from '../../types/sidebar';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss',
})
export class LayoutSidebarComponent {
  @Output() menuItemClickEvent = new EventEmitter();

  sidebarMenuItems: SidebarItemsInterface[] = SidebarMenuItems;

  menuItemClick() {
    this.menuItemClickEvent.emit();
  }
}
