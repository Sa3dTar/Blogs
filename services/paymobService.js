const axios = require('axios');

const baseURL = 'https://accept.paymob.com/api';

const apiKey = process.env.PAYMOB_API_KEY;
const integrationId = process.env.PAYMOB_INTEGRATION_ID;

const getAccessToken = async () => {
  const { data } = await axios.post(`${baseURL}/auth/tokens`, {
    api_key: apiKey,
  });
  return data.token;
};

const createPaymobOrder = async (token, amount, userId) => {
  const { data } = await axios.post(`${baseURL}/ecommerce/orders`, {
    auth_token: token,
    delivery_needed: false,
    amount_cents: amount * 100,
    currency: "EGP",
    items: [],
    merchant_order_id: `sub_${userId}_${Date.now()}`
  });
  return data.id;
};

const createPaymentIntention = async (token, orderId, phone, email) => {
  const { data } = await axios.post(`${baseURL}/acceptance/payment_keys`, {
    auth_token: token,
    amount_cents: 10000,
    expiration: 3600,
    order_id: orderId,
    billing_data: {
      phone_number: phone,
      email: email,
      first_name: "User",
      last_name: "Name",
      apartment: "NA",
      floor: "NA",
      street: "NA",
      building: "NA",
      city: "Cairo",
      country: "EG",
      state: "Cairo"
    },
    currency: "EGP",
    integration_id: integrationId,
  });

  return `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${data.token}`;
};

module.exports = {
  getAccessToken,
  createPaymobOrder,
  createPaymentIntention
};
