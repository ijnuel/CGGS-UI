import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss',
})
export class WebsiteComponent {
  env = environment;
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  smoothScroll(id: any) {
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }

  scrollAndClose(id: string) {
    this.smoothScroll(id);
    this.isMobileMenuOpen = false;
  }

  goToLoginPage() {}
}
