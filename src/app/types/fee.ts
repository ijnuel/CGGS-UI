import { SchoolTermSessionListInterface } from './school-term-session';
import { StudentClassListInterface } from './student-class';
import { ClassListInterface } from './class';

export enum PaymentStatusEnum {
  Pending = 0,
  PartiallyPaid = 1,
  Paid = 2,
  Overpaid = 3,
}

export enum PaymentGatewayEnum {
  None = 0,
  Paystack = 1,
  Flutterwave = 2,
  Monnify = 3,
}

export enum TermEnum {
  First = 1,
  Second = 2,
  Third = 3,
}

export interface FeeTypeListInterface {
  id: string;
  name: string;
  description?: string;
  createdByDefault: boolean;
  compulsory: boolean;
  feeSetups?: FeeSetupListInterface[];
}

export interface FeeTypeFormInterface {
  id?: string;
  name: string;
  description?: string;
  createdByDefault: boolean;
  compulsory: boolean;
}

export interface FeeSetupListInterface {
  id: string;
  feeTypeId: string;
  amount: number;
  classId: string;
  schoolTermSessionId: string;
  inUse: boolean;
  feeType?: FeeTypeListInterface;
  class?: ClassListInterface;
  schoolTermSession?: SchoolTermSessionListInterface;
}

export interface FeeSetupFormInterface {
  id?: string;
  feeTypeId: string;
  amount: number;
  classId: string;
  schoolTermSessionId: string;
  inUse: boolean;
}

export interface FeeLineListInterface {
  id: string;
  feeId: string;
  feeTypeId: string;
  feeSetupId: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  settledAmount: number;
  status: PaymentStatusEnum;
  feeType?: FeeTypeListInterface;
  feeSetup?: FeeSetupListInterface;
  payments?: PaymentListInterface[];
}

export interface FeeListInterface {
  id: string;
  studentClassId: string;
  schoolTermSessionId: string;
  studentClass?: StudentClassListInterface;
  schoolTermSession?: SchoolTermSessionListInterface;
  feeLines?: FeeLineListInterface[];
}

export interface PaymentListInterface {
  id: string;
  feeLineId: string;
  amountPaid: number;
  paymentDate: string;
  paymentMethod?: string;
  paymentReversed: boolean;
  transactionId?: string;
}

export interface GenerateFeesByTermSessionRequest {
  schoolTermSessionId: string;
  classId: string;
}

export interface GenerateFeesBySessionAndTermRequest {
  sessionId: string;
  term: TermEnum;
  classId: string;
}

export interface GenerateFeesByTermSessionForStudentRequest {
  schoolTermSessionId: string;
  classId: string;
  studentId: string;
}

export interface GenerateFeesBySessionAndTermForStudentRequest {
  sessionId: string;
  term: TermEnum;
  classId: string;
  studentId: string;
}

export interface InitiatePaymentRequest {
  gateway: PaymentGatewayEnum;
  amount: number;
  email: string;
  name: string;
  phone?: string;
  callbackUrl?: string;
  narration?: string;
  feeId?: string;
  metaData?: Record<string, any>;
}
