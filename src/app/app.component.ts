import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, StoreDevtoolsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project-ui';

  constructor(
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.titleService.setTitle(environment.schoolAbbreviation);

    const favicon = this.document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = environment.faviconUrl;
    }

    // Apply theme colors from environment
    const root = this.document.documentElement.style;
    root.setProperty('--app-primary', environment.primaryColor);
    root.setProperty('--app-secondary', environment.secondaryColor);
    root.setProperty('--app-accent', environment.accentColor);
    root.setProperty('--app-bg', environment.bgColor);
    root.setProperty('--app-sidebar-bg', environment.sidebarBg);
    root.setProperty('--app-sidebar-menu-hover', environment.sidebarMenuHover);
    root.setProperty('--app-sidebar-menu-active', environment.sidebarMenuHover);
    root.setProperty('--app-button-bg', environment.buttonBg);
    root.setProperty('--app-button-sec-bg', environment.buttonSecBg);
    root.setProperty('--app-text-color', environment.primaryColor);
    root.setProperty('--app-table-header-bg', environment.tableBg);
    root.setProperty('--app-table-header-color', environment.bgColor);
    root.setProperty('--app-sidebar-color', environment.bgColor);
    root.setProperty('--app-hero-bg', `url("${environment.heroBgUrl}")`);
    root.setProperty('--app-gradient-from', environment.gradientFrom);
    root.setProperty('--app-gradient-to', environment.gradientTo);
  }
}
