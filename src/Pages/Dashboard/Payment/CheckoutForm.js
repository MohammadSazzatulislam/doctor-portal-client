import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = ({ booking, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, errors } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: booking.name,
            email: booking.email,
          },
        },
      }
    );

    if (errors) {
      setCardError(errors.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {

      const payment = {
        bookingId: booking._id,
        price: booking.price,
        email: booking.email,
        transactionId : paymentIntent.id
      }

      fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization : localStorage.getItem("doctorToken")
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("congrats your payment completed");
            setTransactionId(paymentIntent.id);
          }
        })
        .catch((err) => console.log(err.message));
    }
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary mt-5 text-white  btn-xs"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <div>
        <p className="text-red-500 ">{cardError}</p>
      </div>
      <div>
        {success && (
          <>
            <p className="text-green-400 ">{success}</p>
            <p className="font-bold ">Your transactionId : {transactionId}</p>
          </>
        )}
      </div>
    </>
  );
};

export default CheckoutForm;
