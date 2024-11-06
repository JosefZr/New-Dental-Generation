// controllers/payment.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your actual secret key

export const makePayment = async (req, res, next) => {
  try {
    const { amount, currency, successUrl, cancelUrl,name } = req.body; // Get data from request

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'eur',
            product_data: {
              name: name,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.CLIENT_URL}/success`,
      cancel_url: cancelUrl || `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    next(error); // Forward error to the error handler
  }
};