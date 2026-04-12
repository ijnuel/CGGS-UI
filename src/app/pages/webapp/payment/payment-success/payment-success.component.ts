import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingFacade } from '../../../../store/global-loading/global-loading.facade';
import { environment } from '../../../../../environments/environment';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private globalLoadingFacade: GlobalLoadingFacade
  ) {}

  ngOnInit() {
    // Payment gateways typically redirect back with a reference or transaction ID
    this.reference = this.route.snapshot.queryParams['reference']
      ?? this.route.snapshot.queryParams['trxref']
      ?? this.route.snapshot.queryParams['transaction_id']
      ?? null;

    if (this.reference) {
      this.http.get<any>(
        `${environment.baseUrl}/PaymentGateway/verify-by-reference/${this.reference}`,
        { withCredentials: true }
      ).subscribe({
        next: () => {
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
      this.verified = true; // Assume success if no reference (manual redirect)
    }
  }

  goToPayments() {
    this.router.navigate(['/app/payment']);
  }
}
