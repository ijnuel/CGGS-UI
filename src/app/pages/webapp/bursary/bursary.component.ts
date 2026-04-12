import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bursary',
  templateUrl: './bursary.component.html',
  styleUrls: ['./bursary.component.scss'],
})
export class BursaryComponent {
  tabs = [
    { label: 'Fee Types', path: 'fee-type', icon: 'category' },
    { label: 'Fee Setup', path: 'fee-setup', icon: 'settings' },
    { label: 'Generate Fees', path: 'generate-fees', icon: 'receipt_long' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  isActive(path: string): boolean {
    return this.router.url.includes(`/bursary/${path}`);
  }

  navigate(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }
}
