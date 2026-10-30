import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../../../shared/shared.module';
import { BursaryComponent } from './bursary.component';
import { FeeTypeComponent } from './fee-type/fee-type.component';
import { CreateUpdateFeeTypeComponent } from './fee-type/create-update-fee-type/create-update-fee-type.component';
import { FeeSetupComponent } from './fee-setup/fee-setup.component';
import { CreateUpdateFeeSetupComponent } from './fee-setup/create-update-fee-setup/create-update-fee-setup.component';
import { GenerateFeesComponent } from './generate-fees/generate-fees.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ViewTransactionComponent } from './transactions/view-transaction/view-transaction.component';
import { DebtorsReportComponent } from './debtors-report/debtors-report.component';
import { RefundsComponent } from './refunds/refunds.component';
import { SessionTermReportComponent } from './session-term-report/session-term-report.component';
import { DateRangeReportComponent } from './date-range-report/date-range-report.component';
import { ReportPageConfig } from './report-page-config';
import { StudentStatementComponent } from './student-statement/student-statement.component';

const routes: Routes = [
  { path: '', component: BursaryComponent },
  { path: 'fee-type', component: FeeTypeComponent },
  { path: 'fee-setup', component: FeeSetupComponent },
  { path: 'generate-fees', component: GenerateFeesComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transactions/:id', component: ViewTransactionComponent },
  { path: 'debtors-report', component: DebtorsReportComponent },
  { path: 'refunds', component: RefundsComponent },
  {
    path: 'fee-collection-summary',
    component: SessionTermReportComponent,
    data: {
      title: 'Fee Collection Summary',
      description: 'Generates an Excel report of fees billed, collected and outstanding, with the collection rate, broken down by class and by fee type. Leave Term blank to cover the whole session and get an extra breakdown by term.',
      endpoint: 'BursaryReport/GenerateFeeCollectionSummary',
      fileName: 'Fee Collection Summary',
      buttonLabel: 'Generate Collection Summary',
      successMessage: 'Fee collection summary generated successfully',
    } as ReportPageConfig,
  },
  {
    path: 'cash-book',
    component: DateRangeReportComponent,
    data: {
      title: 'Cash Book',
      description: "Generates an Excel report of payments received between two dates, totalled per day and per payment method, with a sheet listing every payment. Payments settled from a student's wallet are shown separately because that money was received earlier, when the wallet was funded.",
      endpoint: 'BursaryReport/GenerateCashBook',
      fileName: 'Cash Book',
      buttonLabel: 'Generate Cash Book',
      successMessage: 'Cash book generated successfully',
    } as ReportPageConfig,
  },
  {
    path: 'online-payments-reconciliation',
    component: DateRangeReportComponent,
    data: {
      title: 'Online Payments Reconciliation',
      description: "Generates an Excel report of online payment transactions started between two dates, by gateway, showing how much of each was applied to fees or the student's wallet. Successful payments that were not applied and payments still pending are listed on an Exceptions sheet.",
      endpoint: 'BursaryReport/GenerateGatewayReconciliation',
      fileName: 'Online Payments Reconciliation',
      buttonLabel: 'Generate Reconciliation',
      successMessage: 'Online payments reconciliation generated successfully',
    } as ReportPageConfig,
  },
  {
    path: 'manual-payment-audit',
    component: DateRangeReportComponent,
    data: {
      title: 'Manual Payment Audit',
      description: 'Generates an Excel report of payments posted manually between two dates: who entered each one, when it was entered compared with its payment date, and whether it was later reversed. Includes a summary per user.',
      endpoint: 'BursaryReport/GenerateManualPaymentAudit',
      fileName: 'Manual Payment Audit',
      buttonLabel: 'Generate Audit',
      successMessage: 'Manual payment audit generated successfully',
    } as ReportPageConfig,
  },
  {
    path: 'unbilled-students',
    component: SessionTermReportComponent,
    data: {
      title: 'Unbilled Students',
      description: 'Generates an Excel report of students enrolled in a class for the session who have no fees for the selected term, and a per-class summary that also flags classes with no fee setup for that term.',
      endpoint: 'BursaryReport/GenerateUnbilledStudents',
      fileName: 'Unbilled Students',
      buttonLabel: 'Generate Report',
      successMessage: 'Unbilled students report generated successfully',
      termRequired: true,
    } as ReportPageConfig,
  },
  { path: 'student-statement', component: StudentStatementComponent },
];

@NgModule({
  declarations: [
    BursaryComponent,
    FeeTypeComponent,
    CreateUpdateFeeTypeComponent,
    FeeSetupComponent,
    CreateUpdateFeeSetupComponent,
    GenerateFeesComponent,
    PaymentsComponent,
    TransactionsComponent,
    ViewTransactionComponent,
    DebtorsReportComponent,
    RefundsComponent,
    SessionTermReportComponent,
    DateRangeReportComponent,
    StudentStatementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class BursaryModule {}
