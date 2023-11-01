import { Language } from "./language.enum";

export interface CreatePaymentDto {
  amount: number;
  callbackUrl: string;
  sandBox?: boolean;
  webhookUrl?: string;
  webhookParams?: object;
  callbackParams?: object;
  language?: string;
}
export interface PaymentRequestType {
  amount: number;
  callbackParams?: object;
  webhookParams?: object;
  webhookUrl?: string;
  language?: Language;
}
export interface RequestPaymentResponseType {
  id: number;
  refUrl: string;
}

export interface VerifyPaymentRequest {
  amount: number;
  paymentId: string;
}

export interface VerifyResponseType {
  status: string;
  message: string;
  errorCode: number;
}
