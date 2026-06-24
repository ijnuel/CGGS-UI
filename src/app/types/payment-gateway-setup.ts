import { PaymentGatewayEnum } from './fee';

export interface PaymentGatewaySetupListInterface {
  id: string;
  gateway: PaymentGatewayEnum;
  isActive: boolean;
  // All gateways
  secretKey?: string;
  publicKey?: string;
  // Flutterwave
  webhookSecret?: string;
  // Monnify
  contractCode?: string;
  // Interswitch
  macKey?: string;
  productId?: string;
  payItemId?: string;
  paymentPageUrl?: string;
  baseUrl: string;
}

export interface PaymentGatewaySetupFormInterface {
  id?: string;
  gateway: number;
  isActive: boolean;
  secretKey?: string;
  publicKey?: string;
  webhookSecret?: string;
  contractCode?: string;
  macKey?: string;
  productId?: string;
  payItemId?: string;
  paymentPageUrl?: string;
  baseUrl: string;
}
