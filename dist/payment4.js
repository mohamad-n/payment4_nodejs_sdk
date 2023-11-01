"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment4 = void 0;
const http_1 = require("http");
const language_enum_1 = require("./types/language.enum");
const config_1 = require("./config");
/**
 * payment4_nodejs_sdk • Simple typescript implementation of Payment4 nodjs api so you can use easily and fast.
 * @author Ali Rajabi
 * @date . 12/08/2023
 */
class Payment4 {
    /**
     * constructor for Payment4
     * @param  {InitParamsType} initParam
     */
    constructor(initParam) {
        this.initParam = initParam;
    }
    /**
     * createInstance from Payment4
     * @param  {InitParamsType} initParam
     * @returns Payment4
     */
    static createInstance(initParam) {
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
    requestPayment(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, callbackParams, language, webhookParams, webhookUrl } = params;
            const { callbackUrl, sandBox } = this.initParam;
            const data = {
                amount,
                callbackUrl,
                callbackParams,
                language: language || language_enum_1.Language.EN,
                sandBox: sandBox || false,
                webhookParams,
                webhookUrl,
            };
            const option = this.makeOptions({ method: "POST", path: "payment" });
            const response = yield this.makeRequest(data, option);
            const responseBody = JSON.parse(response);
            if (responseBody.status != undefined && !responseBody.status) {
                throw responseBody.errorCode;
            }
            return responseBody.refUrl;
        });
    }
    /**
     * Verify payment from Payment4
     * @param  {VerifyPaymentRequest} params
     * @returns  Promise<boolean>
     * @throws errorCode
     */
    verifyPayment(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, paymentId: payment_id } = params;
            const data = { amount, payment_id };
            const option = this.makeOptions({ method: "PUT", path: "payment/verify" });
            const response = yield this.makeRequest(data, option);
            const responseBody = JSON.parse(response);
            if (responseBody.status != undefined && !responseBody.status) {
                throw responseBody.errorCode;
            }
            return true;
        });
    }
    /**
     * Make request to Payment4
     * @private method in Payment4
     * @param  {object} data
     * @param  {RequestOptions} requestOptions
     * @returns  RequestOptions
     */
    makeRequest(data, requestOptions) {
        return new Promise((resolve, reject) => {
            const { baseUrl } = config_1.configs;
            const { path } = requestOptions, options = __rest(requestOptions, ["path"]);
            const requestR = (0, http_1.request)(baseUrl + path, options, (response) => {
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
    makeOptions(option) {
        const { method, path } = option;
        const { apiKey } = this.initParam;
        const requestOption = {
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
exports.Payment4 = Payment4;
