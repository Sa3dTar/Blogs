// controllers/subscriptionController.js

const Subscriptions = require('../models/subscriptionModel');
const { getAccessToken, createPaymobOrder, createPaymentIntention } = require('../services/paymobService');

const SUBSCRIPTION_PRICES = {
  '1 month': 50,
  '3 months': 120,
  '6 months': 200,
  '9 months': 270,
  '1 year': 350
};

const subscribeUser = async (req, res) => {
  const { typeSubscribtion, blogs_type } = req.body;
  const user = req.user;

  const price = SUBSCRIPTION_PRICES[typeSubscribtion];
  if (!price) return res.status(400).json({ message: 'Invalid subscription type' });

  try {
    const token = await getAccessToken();
    const orderId = await createPaymobOrder(token, price, user._id);
    const paymentURL = await createPaymentIntention(token, orderId, user.phone, user.email);

    const newSub = await Subscriptions.create({
      user_id: user._id,
      typeSubscribtion,
      paymentAcc: 'paymob',
      author: user._id,
      blogs_type
    });

    return res.json({ paymentURL });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Payment initialization failed' });
  }
};

module.exports = {
  subscribeUser,
};
