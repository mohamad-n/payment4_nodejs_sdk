import { IncomingMessage, RequestOptions, request } from "http";
import { InitParamsType } from "./types/init.params.type";
import {
  CreatePaymentDto,
  PaymentRequestType,
  VerifyPaymentRequest,
} from "./types/payment.type";
import { Language } from "./types/language.enum";
import { RequestOption } from "./types/request.options.type";
import { configs } from "./config";

/**
 * payment4_nodejs_sdk • Simple typescript implementation of Payment4 nodjs api so you can use easily and fast.
 * @author Ali Rajabi
 * @date . 12/08/2023
 */
export class Payment4 {
  private initParam: InitParamsType;

  /**
   * constructor for Payment4
   * @param  {InitParamsType} initParam
   */
  private constructor(initParam: InitParamsType) {
    this.initParam = initParam;
  }

  /**
   * createInstance from Payment4
   * @param  {InitParamsType} initParam
   * @returns Payment4
   */
  static createInstance(initParam: InitParamsType): Payment4 {
    const { apiKey, callbackUrl } = initParam;
    if (!apiKey) {
      throw new Error("\x1b[31m Payment4 : need to enter apiKey \x1b[0m");
    }
    if (!callbackUrl) {
      throw new Error("\x1b[31m Payment4 : need to enter callbackUrl \x1b[0m");
    }
    return new Payment4(initParam);
  }

  /**
   * request new Payment from Payment4
   * @param  {PaymentRequestType} params
   * @returns  Promise<String>
   * @throws errorCode
   */
  async requestPayment(params: PaymentRequestType): Promise<String> {
    const { amount, callbackParams, language, webhookParams, webhookUrl } =
      params;
    const { callbackUrl, sandBox } = this.initParam;
    const data: CreatePaymentDto = {
      amount,
      callbackUrl,
      callbackParams,
      language: language || Language.EN,
      sandBox: sandBox || false,
      webhookParams,
      webhookUrl,
    };
    const option = this.makeOptions({ method: "POST", path: "payment" });
    const response = await this.makeRequest(data, option);
    const responseBody = JSON.parse(response);
    if (responseBody.status != undefined && !responseBody.status) {
      throw responseBody.errorCode;
    }
    return responseBody.refUrl;
  }

  /**
   * Verify payment from Payment4
   * @param  {VerifyPaymentRequest} params
   * @returns  Promise<boolean>
   * @throws errorCode
   */
  async verifyPayment(params: VerifyPaymentRequest): Promise<boolean> {
    const { amount, paymentId: payment_id } = params;
    const data = { amount, payment_id };
    const option = this.makeOptions({ method: "PUT", path: "payment/verify" });
    const response = await this.makeRequest(data, option);
    const responseBody = JSON.parse(response);
    if (responseBody.status != undefined && !responseBody.status) {
      throw responseBody.errorCode;
    }
    return true;
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
      const requestR = request(
        baseUrl + path,
        options,
        (response: IncomingMessage) => {
          let responseData = "";

          response.on("data", (chunk) => {
            responseData += chunk;
          });

          response.on("end", () => {
            resolve(responseData);
          });
        }
      );

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
