export enum TransactionStatus {
  Pending = 'Pending',
  Successful = 'Successful',
  Failed = 'Failed',
  Abandoned = 'Abandoned',
  Reversed = 'Reversed',
}

export enum TransactionType {
  Credit = 'Credit',
  Debit = 'Debit',
}

export enum PaymentGateway {
  Paystack = 'Paystack',
  Flutterwave = 'Flutterwave',
  Monnify = 'Monnify',
  Interswitch = 'Interswitch',
}

export interface TransactionListInterface {
  id: string;
  reference?: string;
  amount: number;
  currency?: string;
  status: number;
  gateway: number;
  transactionType: number;
  statusString?: string;
  gatewayString?: string;
  transactionTypeString?: string;
  gatewayReference?: string;
  gatewayResponse?: string;
  callbackUrl?: string;
  payerEmail?: string;
  payerName?: string;
  payerPhone?: string;
  metaData?: string;
  feeId?: string;
  studentId?: string;
  paidAt?: string;
}
