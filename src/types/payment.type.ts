
export type CreatePaymentDto = {
  amount: number;
  callbackUrl: string;
  sandBox?: boolean;
  webhookUrl?: string;
  webhookParams?: object;
  callbackParams?: object;
  language?: string;
  currency?: string;
};
export type PaymentRequestType = {
  amount: number;
  callbackParams?: object;
  webhookParams?: object;
  webhookUrl?: string;
  language?: string;
  currency?: string;
};
export type RequestPaymentResponseType = {
  id: number;
  refUrl: string;
};

export type VerifyPaymentRequest = {
  amount: number;
  currency: string;
  paymentId: string;
};

export type VerifyResponseType = {
  status: string;
  message: string;
  errorCode: number;
};
