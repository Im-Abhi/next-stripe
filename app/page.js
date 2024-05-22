"use client";

import { loadStripe } from "@stripe/stripe-js";

export default function Home() {
  const products = [
    {
      dish: "alloo",
      price: 100,
      qnty: 2,
    },
  ];

  const makePayment = async () => {
    const stripe = await loadStripe(process.env.STRIPE_PRIVATE_KEY);

    const body = {
      products: products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch("http://localhost:3000/api/handlePayment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={makePayment}>checkout</button>
    </main>
  );
}
