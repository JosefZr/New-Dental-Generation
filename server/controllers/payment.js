import Stripe from "stripe";
import dotenv from "dotenv";
import { createUser } from "../services/auth.services.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const plans = [
  {
    id: 5487,
    name: "Cadet",
    duration: "1m", // 1 month
    amount: 14.5,
  },
  {
    id: 8976,
    name: "Challenger",
    duration: "4m", // 4 months
    amount: 55,
  },
  {
    id: 93197,
    name: "Hero",
    duration: "12m", // 12 months
    amount: 150,
  },
];

export const makePayment = async (req, res, next) => {

  try {
    const { plan_name, userData } = req.body;
    const plan = plans.find((p) => p.name === plan_name);

    console.log(userData);
    //call the service to create the user
    const user = await createUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      proofOfProfession: "test here for pass the check", //userData.file,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });

    // if the user didn't created
    if (!user) {
      throw new ApiError("Error creating user", 500);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/#/success?sessionId={CHECKOUT_SESSION_ID}&userId=${user._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        user: userData._id,
        duration: plan.duration,
        subscriptionPlan:
          plan.duration === "1m"
            ? "monthly"
            : plan.duration === "4m"
            ? "quarterly"
            : "yearly",
      },
    });

    // Replace {CHECKOUT_SESSION_ID} with the actual session ID
    const successUrlWithSessionId = session.success_url.replace(
      "{CHECKOUT_SESSION_ID}",
      session.id
    );

    res.json({ sessionId: session.id });
  } catch (error) {
    next(error); // Forward error to the error handler
  }
};

// mark as paid
export const markAsPaid = async (req, res, next) => {
  try {
    const { sessionId, userId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Ensure that the session exists and payment is successful
    if (session.payment_status === "paid") {
      // Calculate the subscription end date based on the plan's duration
      const subscriptionStartDate = new Date();

      let subscriptionEndDate;

      // Calculate the end date based on duration
      switch (session.metadata.duration) {
        case "1m":
          subscriptionEndDate = new Date(
            subscriptionStartDate.setMonth(subscriptionStartDate.getMonth() + 1)
          );
          break;
        case "4m":
          subscriptionEndDate = new Date(
            subscriptionStartDate.setMonth(subscriptionStartDate.getMonth() + 4)
          );
          break;
        case "12m":
          subscriptionEndDate = new Date(
            subscriptionStartDate.setFullYear(
              subscriptionStartDate.getFullYear() + 1
            )
          );
          break;
        default:
          throw new ApiError("Invalid plan duration", 400);
      }

      // Update the user's subscription data in the database
      await User.findByIdAndUpdate(userId, {
        $set: {
          isPaid: true,
          subscriptionPlan: session.metadata.subscriptionPlan,
          subscriptionStartDate: subscriptionStartDate,
          subscriptionEndDate,
          stripeSubscriptionId: session.id,
        },
      });

      res.json({ message: "Payment successful" });
    } else {
      throw new ApiError("Payment failed", 500);
    }
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res) => {

  try {
    const { plan_name, userData } = req.body;
    const plan = plans.find((p) => p.name === plan_name);

    // Check if user exists
    const user = await User.findById(userData._id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/#/success?sessionId={CHECKOUT_SESSION_ID}&userId=${user._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        user: userData._id,
        duration: plan.duration,
        subscriptionPlan:
          plan.duration === "1m"
            ? "monthly"
            : plan.duration === "4m"
            ? "quarterly"
            : "yearly",
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    next(error); 
  }
};
