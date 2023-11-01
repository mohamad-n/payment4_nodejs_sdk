import { InitParamsType } from "./types/init.params.type";
import { PaymentRequestType, VerifyPaymentRequest } from "./types/payment.type";
/**
 * payment4_nodejs_sdk • Simple typescript implementation of Payment4 nodjs api so you can use easily and fast.
 * @author Ali Rajabi
 * @date . 12/08/2023
 */
export declare class Payment4 {
    private initParam;
    /**
     * constructor for Payment4
     * @param  {InitParamsType} initParam
     */
    private constructor();
    /**
     * createInstance from Payment4
     * @param  {InitParamsType} initParam
     * @returns Payment4
     */
    static createInstance(initParam: InitParamsType): Payment4;
    /**
     * request new Payment from Payment4
     * @param  {PaymentRequestType} params
     * @returns  Promise<String>
     * @throws errorCode
     */
    requestPayment(params: PaymentRequestType): Promise<String>;
    /**
     * Verify payment from Payment4
     * @param  {VerifyPaymentRequest} params
     * @returns  Promise<boolean>
     * @throws errorCode
     */
    verifyPayment(params: VerifyPaymentRequest): Promise<boolean>;
    /**
     * Make request to Payment4
     * @private method in Payment4
     * @param  {object} data
     * @param  {RequestOptions} requestOptions
     * @returns  RequestOptions
     */
    private makeRequest;
    /**
     * Make options from Payment4
     * @private method in Payment4
     * @param  {RequestOption} option
     * @returns  RequestOptions
     */
    private makeOptions;
}
