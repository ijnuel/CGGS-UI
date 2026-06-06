import { Component } from '@angular/core';
import { SidebarItemsInterface } from '../../../types/sidebar';

@Component({
  selector: 'app-bursary',
  templateUrl: './bursary.component.html',
  styleUrls: ['./bursary.component.scss'],
})
export class BursaryComponent {
  cards: SidebarItemsInterface[] = [
    {
      name: 'Fee Types',
      icon: '',
      matIcon: 'label',
      description: 'Manage fee type categories',
      roles: [],
      url: '/app/bursary/fee-type',
    },
    {
      name: 'Fee Setup',
      icon: '',
      matIcon: 'tune',
      description: 'Configure fee amounts per class and term',
      roles: [],
      url: '/app/bursary/fee-setup',
    },
    {
      name: 'Generate Fees',
      icon: '',
      matIcon: 'receipt_long',
      description: 'Generate fees for students by term and class',
      roles: [],
      url: '/app/bursary/generate-fees',
    },
    {
      name: 'Payments',
      icon: '',
      matIcon: 'payments',
      description: 'View and track all fee payments',
      roles: [],
      url: '/app/bursary/payments',
    },
    {
      name: 'Transactions',
      icon: '',
      matIcon: 'account_balance_wallet',
      description: 'View gateway transactions and verify pending ones',
      roles: [],
      url: '/app/bursary/transactions',
    },
  ];
}
