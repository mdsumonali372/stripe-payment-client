import React, { useState } from "react";
import PropTypes from "prop-types";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./Card.css";

const PaymentForm = ({ stripe }) => {
  const [amount, setAmount] = useState(""); // State to hold the amount

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    const { token } = await stripe.createToken();

    fetch("http://localhost:5000/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.id,
        amount: parseFloat(amount) * 100, // Convert amount to cents
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);
        if (data.success) {
          alert("Payment successful!");
        } else {
          alert(`Payment failed: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full sumon max-w-[1220px] flex justify-center items-center mx-auto h-screen">
      <div className="bg-[#ECECEC] w-full max-w-[375px] mx-auto p-5 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[16px] text-[#4A4A4A] mb-2 text-center block">
              Credit/Debit Card Payment
            </label>
            <CardElement className="custom-card-element" />
          </div>
          <div>
            <label className="block mb-2 text-[16px] text-[#4A4A4A]">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-md px-3 h-11"
              placeholder="Enter amount"
            />
          </div>
          <div className="w-full">
            <button
              className="bg-[#02843D] w-full h-11 rounded-md text-white"
              type="submit"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PaymentForm.propTypes = {
  stripe: PropTypes.object.isRequired,
};

export default injectStripe(PaymentForm);
