import { RequestOptions, request } from "https";
import {
  CreatePaymentDto,
  InitParamsType,
  RequestOption,
  RequestPaymentResult,
  VerifyPaymentResult,
  VerifyPaymentInput,
  PaymentRequestInput,
} from "./types";
import { configs } from ".";
import { Currency, Language } from "./enums";

/**
 * payment4_nodejs_sdk • Simple typescript implementation of Payment4 nod-js api so you can use easily and fast.
 * @author Ali Rajabi
 * @date . 12/08/2023
 */
export class Payment4 {
  private initParam: InitParamsType;

  /**
   * constructor for Payment4
   * @param  {InitParamsType} initParam
   */
  constructor(initParam: InitParamsType) {
    if (!initParam) {
      throw new Error("\x1b[31m Payment4 : initParam is required \x1b[0m");
    }
    if (!initParam.apiKey) {
      throw new Error("\x1b[31m Payment4 : need to enter apiKey \x1b[0m");
    }
    if (!initParam.callbackUrl) {
      throw new Error("\x1b[31m Payment4 : need to enter callbackUrl \x1b[0m");
    }
    this.initParam = initParam;
  }

  /**
   * request new Payment from Payment4
   * @param  {PaymentRequestInput} params
   * @returns  Promise<RequestPaymentResult>
   * @throws errorCode
   */
  async requestPayment(
    params: PaymentRequestInput
  ): Promise<RequestPaymentResult> {
    if (!params) {
      throw new Error("\x1b[31m Payment4 : params is required \x1b[0m");
    }

    const {
      amount,
      callbackParams,
      language,
      webhookParams,
      webhookUrl,
      currency,
      cover,
    } = params;
    const { callbackUrl, sandBox } = this.initParam;

    if (!amount) {
      throw new Error("\x1b[31m Payment4 : amount is required \x1b[0m");
    }

    const data: CreatePaymentDto = {
      amount,
      callbackUrl,
      callbackParams,
      language: language || Language.EN,
      currency: currency || Currency.USD,
      sandBox: sandBox || false,
      webhookParams,
      webhookUrl,
      cover,
    };
    const option = this.makeOptions({ method: "POST", path: "payment" });
    const response = await this.makeRequest(data, option);
    const result: RequestPaymentResult = JSON.parse(response);
    return result;
  }

  /**
   * Verify payment from Payment4
   * @param  {VerifyPaymentInput} params
   * @returns  Promise<VerifyPaymentResult>
   * @throws errorCode
   */
  async verifyPayment(
    params: VerifyPaymentInput
  ): Promise<VerifyPaymentResult> {
    if (!params) {
      throw new Error("\x1b[31m Payment4 : params is required \x1b[0m");
    }

    const { paymentUid, ...otherData } = params;

    if (!params.amount) {
      throw new Error("\x1b[31m Payment4 : amount is required \x1b[0m");
    }
    if (!params.currency) {
      throw new Error("\x1b[31m Payment4 : currency is required \x1b[0m");
    }
    if (!params.paymentUid) {
      throw new Error("\x1b[31m Payment4 : paymentUid is required \x1b[0m");
    }
    const data = { paymentUid, ...otherData };
    const option = this.makeOptions({ method: "PUT", path: "payment/verify" });
    const response = await this.makeRequest(data, option);
    const result: VerifyPaymentResult = JSON.parse(response);
    return result;
  }

  /**
   * Make request to Payment4
   * @private method in Payment4
   * @param  {object} data
   * @param  {RequestOptions} requestOptions
   * @returns  RequestOptions
   */
  private makeRequest(
    data: object,
    requestOptions: RequestOptions
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const { baseUrl } = configs;
      const { path, ...options } = requestOptions;
      const requestR = request(baseUrl + path, options, (response) => {
        let responseData = "";

        response.on("data", (chunk) => {
          responseData += chunk;
        });

        response.on("end", () => {
          resolve(responseData);
        });
      });

      requestR.on("error", (error) => {
        reject(error);
      });
      requestR.write(JSON.stringify(data));
      requestR.end();
    });
  }

  /**
   * Make options from Payment4
   * @private method in Payment4
   * @param  {RequestOption} option
   * @returns  RequestOptions
   */
  private makeOptions(option: RequestOption): RequestOptions {
    const { method, path } = option;
    const { apiKey } = this.initParam;
    const requestOption: RequestOptions = {
      method,
      path,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    };
    return requestOption;
  }
}
