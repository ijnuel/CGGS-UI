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
  }
}
