# PAYMENT4 OFFICIAL SDK

- Easy And Fast
- Promises/A+ Compatible
- Sandboxing

## 🕹 Usage

Install the package from `npm` or `yarn` and require it in your Node project:

```bash
npm install payment4
```

```javascript
const Payment4 = require("payment4");
// or
import Payment4 from "payment4";
```

### Create Payment4 instance

```javascript
/**
 * Create Payment4 instance
 * apiKey and callbackUrl are both required.
 * sandBox is optional.
*/
const initParams: InitParamsType = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  callbackUrl: 'https://your-domain/verify';
  sandBox: false;
};
const payment4 = Payment4(initParams);
```

## 📢 API

### ★ Request Payment:

```javascript
/**
 * amount is required
 * callbackParams, webhookParams, webhookUrl, language are optional
 * if no language given, the language default is english
 */
const params: PaymentRequestType = {
  amount: 100,
  callbackParams: { "your-key": "your-value" },
  webhookParams: { "your-key": "your-value" },
  webhookUrl: "https://your-domain.com/webhook",
  language: "en",
};
/**
 * requestPayment
 * @param {PaymentRequestType} params
 * @returns Promise<String>
 */
const paymentUrl = await payment4.requestPayment(params);
```

### ★ Payment Verification:

```javascript
/**
 * amount and paymentId are required
 */
const params: VerifyPaymentRequest = {
  amount: 100,
  paymentId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
};
/**
 * Verify Payment from PaymentId.
 * @param  {VerifyPaymentRequest} params
 * @returns Promise<boolean>
 */
const response = await payment4.verifyPayment(request);
```

---

## 👋 Contribution

Contributions are welcome. Please submit PRs or just file an issue if you see something broken or in
need of improving.

Powered by [Payment4](https://payment4.com)
