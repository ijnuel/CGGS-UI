import { Component } from '@angular/core';
import { SidebarItemsInterface } from '../../../../types/sidebar';

interface ReportGroup {
  title: string;
  description: string;
  cards: SidebarItemsInterface[];
}

@Component({
  selector: 'app-bursary-reports',
  templateUrl: './bursary-reports.component.html',
})
export class BursaryReportsComponent {
  groups: ReportGroup[] = [
    {
      title: 'Collections',
      description: 'Who owes what, and what has been collected',
      cards: [
        {
          name: 'Debtors Report',
          icon: '',
          matIcon: 'summarize',
          description: 'Generate Excel report of students with outstanding fees',
          roles: [],
          url: '/app/bursary/debtors-report',
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
      ],
    },
    {
      title: 'Reconciliation & Control',
      description: 'Check that payments and billing are complete and correct',
      cards: [
        {
          name: 'Online Payments Reconciliation',
          icon: '',
          matIcon: 'rule',
          description: 'Gateway payments vs what was applied; flags unapplied and pending',
          roles: [],
          url: '/app/bursary/online-payments-reconciliation',
        },
        {
          name: 'Manual Payment Audit',
          icon: '',
          matIcon: 'fact_check',
          description: 'Manually posted payments by user, backdating and reversals',
          roles: [],
          url: '/app/bursary/manual-payment-audit',
        },
        {
          name: 'Unbilled Students',
          icon: '',
          matIcon: 'person_search',
          description: 'Enrolled students with no fees for a term, and classes with no fee setup',
          roles: [],
          url: '/app/bursary/unbilled-students',
        },
      ],
    },
    {
      title: 'Wallets, Refunds & Setup',
      description: 'Credit held for students, refund requests and what each class is charged',
      cards: [
        {
          name: 'Wallet Balances',
          icon: '',
          matIcon: 'savings',
          description: 'Credit held in student wallets and wallet activity',
          roles: [],
          url: '/app/bursary/wallet-report',
        },
        {
          name: 'Refunds Report',
          icon: '',
          matIcon: 'currency_exchange',
          description: 'Refund requests by status with totals, for a date range',
          roles: [],
          url: '/app/bursary/refunds-report',
        },
        {
          name: 'Fee Setup Summary',
          icon: '',
          matIcon: 'table_view',
          description: 'Fees set up per class and term, with totals per student type',
          roles: [],
          url: '/app/bursary/fee-setup-summary',
        },
      ],
    },
  ];
}
