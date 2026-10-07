export interface RefundInterface {
  id: string;
  transactionId: string;
  amount: number;
  reason: string;
  status: number;
  refundReference?: string;
  notes?: string;
  processedAt?: string;
  createdDate: string;
  transactionReference?: string;
  payerName?: string;
  payerEmail?: string;
  transactionAmount: number;
  gateway: number;
}
