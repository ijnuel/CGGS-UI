import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layout-topbar',
  templateUrl: './layout-topbar.component.html',
  styleUrl: './layout-topbar.component.scss',
})
export class LayoutTopbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<{
    toggle: boolean;
  }>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit({ toggle: true });
  }
}
