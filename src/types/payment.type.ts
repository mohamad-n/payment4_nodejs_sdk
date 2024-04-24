import { Currency, Language } from "../enums";
import { CoverRange } from ".";

export type RequestPaymentResult = {
  id: number;
  paymentUid: string;
  paymentUrl: string;
};

export type CreatePaymentDto = {
  amount: number;
  callbackUrl: string;
  sandBox?: boolean;
  webhookUrl?: string;
  webhookParams?: object;
  callbackParams?: object;
  language?: Language;
  currency?: Currency;
  cover?: CoverRange;
};

export type PaymentRequestInput = {
  amount: number;
  callbackParams?: object;
  webhookParams?: object;
  webhookUrl?: string;
  language?: Language;
  currency?: Currency;
  cover?: CoverRange;
};

export type VerifyPaymentInput = {
  amount: number;
  currency: string;
  paymentUid: string;
};

export type VerifyPaymentResult = {
  paymentStatus: string;
  amountDifference?: string;
  verified: boolean;
};
