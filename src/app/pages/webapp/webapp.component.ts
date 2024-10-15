import { Component } from '@angular/core';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrl: './webapp.component.scss',
})
export class WebappComponent {
  toggleSidebarState: 'close' | 'open' = 'close';

  topbarToggleSidebar(state: { toggle: boolean }) {
    this.toggleSideBar(state.toggle);
  }

  toggleSideBar(toggle: boolean) {
    toggle
      ? (this.toggleSidebarState = 'open')
      : (this.toggleSidebarState = 'close');
  }

  sideBarMenuItemClick() {
    this.toggleSideBar(false);
  }
}
