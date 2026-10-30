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
    {
      name: 'Debtors Report',
      icon: '',
      matIcon: 'summarize',
      description: 'Generate Excel report of students with outstanding fees',
      roles: [],
      url: '/app/bursary/debtors-report',
    },
    {
      name: 'Refunds',
      icon: '',
      matIcon: 'undo',
      description: 'Review and process student refund requests',
      roles: [],
      url: '/app/bursary/refunds',
    },
    {
      name: 'Fee Collection Summary',
      icon: '',
      matIcon: 'insights',
      description: 'Billed vs collected vs outstanding by class, fee type and term',
      roles: [],
      url: '/app/bursary/fee-collection-summary',
    },
    {
      name: 'Cash Book',
      icon: '',
      matIcon: 'point_of_sale',
      description: 'Payments received in a date range by day and payment method',
      roles: [],
      url: '/app/bursary/cash-book',
    },
    {
      name: 'Student Statement',
      icon: '',
      matIcon: 'request_quote',
      description: "Printable statement of a student's fees, payments and balance",
      roles: [],
      url: '/app/bursary/student-statement',
    },
  ];
}
