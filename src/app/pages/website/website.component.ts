import { Component } from '@angular/core';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss',
})
export class WebsiteComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log(this.isMobileMenuOpen);
  }

  smoothScroll(id: any) {
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }

  goToLoginPage() {}
}
