import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

const GATEWAY_LOGOS: Record<number, string> = {
  0: 'assets/images/gateways/paystack.svg',
  1: 'assets/images/gateways/flutterwave.svg',
  2: 'assets/images/gateways/monnify.svg',
  3: 'assets/images/gateways/interswitch.svg',
};

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
  verifying = true;
  verified = false;
  error = false;
  reference: string | null = null;
  transaction: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.reference =
      this.route.snapshot.queryParams['reference'] ??
      this.route.snapshot.queryParams['trxref'] ??
      this.route.snapshot.queryParams['transaction_id'] ??
      this.route.snapshot.queryParams['paymentReference'] ??
      null;

    if (this.reference) {
      this.http.get<any>(
        `${environment.baseUrl}/PaymentGateway/verify-by-reference/${this.reference}`,
        { withCredentials: true }
      ).subscribe({
        next: (response) => {
          this.transaction = response?.entity ?? null;
          this.verifying = false;
          this.verified = true;
        },
        error: () => {
          this.verifying = false;
          this.error = true;
        }
      });
    } else {
      this.verifying = false;
      this.verified = true;
    }
  }

  get purpose(): string {
    if (!this.transaction) return '';
    return this.transaction.feeId ? 'School Fee Payment' : 'Wallet Top-up';
  }

  get purposeIcon(): string {
    return this.transaction?.feeId ? 'receipt_long' : 'account_balance_wallet';
  }

  get gatewayLogoUrl(): string | null {
    return this.transaction != null ? (GATEWAY_LOGOS[this.transaction.gateway] ?? null) : null;
  }

  goToPayments() {
    this.router.navigate(['/app/payment']);
  }
}
