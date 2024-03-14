"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getStripeClientSecret = async (reqBody: any) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: reqBody.amount * 100,
      currency: "uah",
      payment_method_types: ["card"],
      description: "Ukraine Aid Fund Payment",
    });
    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
