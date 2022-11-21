import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import Loading from "../../Shared/Loading/Loading";

// you must be your pk hide for .env file
const stripePromise = loadStripe(process.env.REACT_APP_PAYMENT_KEY);

const Payment = () => {
  const booking = useLoaderData();
  const { date, price, tretment, slot } = booking;
  const navigation = useNavigation();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://doctors-portal-server-khaki.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("doctorToken"),
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => console.log(err.message));
  }, [price]);

  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold">Payment for {tretment}</h1>
      <p>
        please pay <strong>${price}</strong> for your appoointment on {date} at
        {slot}
      </p>
      <div className="w-96 h-52 mx-auto my-12 border p-3">
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
