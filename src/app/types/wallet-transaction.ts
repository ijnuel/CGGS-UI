export interface WalletTransactionInterface {
  id: string;
  studentWalletId: string;
  amount: number;
  transactionDate: string;
  transactionId?: string;
}
