/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {  FaInfoCircle, FaLock } from "react-icons/fa";

const CheckOut = ({ info }) => {
  const { users } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const { prices, coins } = info;
  const coinConvert = parseInt(coins);

  const [cardError, setCardError] = useState("");
  const [process, setProcess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  // Fetch Client Secret
  useEffect(() => {
    if (prices >= 1) {
      const getClientSecret = async () => {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          totalPrice: prices,
        });
        setClientSecret(data.clientSecret);
      };
      getClientSecret();
    }
  }, [prices, axiosSecure]);

  // Sync User Data
  const { data: user = {}, refetch } = useQuery({
    queryKey: ["user", users?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${users?.email}`);
      return res.data;
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcess(true);
    const card = elements.getElement(CardElement);
    if (card == null) return;

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcess(false);
      return;
    } else {
      setCardError("");
    }

    // Confirm Payment
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: users?.email || "anonymous",
          name: users?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcess(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const userUpdate = {
        ...user,
        coin: (user.coin || 0) + coinConvert,
      };

      try {
        const res = await axiosSecure.put(`/user/${user._id}`, userUpdate);
        if (res.data.modifiedCount > 0) {
          refetch();
          setIsPaid(true);
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: `Added ${coinConvert} coins to your wallet.`,
            confirmButtonColor: "#4F46E5",
            customClass: { popup: 'rounded-[2rem]' }
          });
        }
      } catch (err) {
        setCardError("Database update failed. Please contact support.");
      }
    }
    setProcess(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Input Container */}
        <div className="group transition-all duration-300">
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">
            Credit or Debit Card
          </label>
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1e293b",
                    fontFamily: "Inter, sans-serif",
                    "::placeholder": { color: "#94a3b8" },
                  },
                  invalid: { color: "#e11d48" },
                },
              }}
            />
          </div>
        </div>

        {/* Error Message */}
        {cardError && (
          <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-shake">
            <FaInfoCircle /> {cardError}
          </div>
        )}

        {/* Action Button */}
        <button
          disabled={!stripe || !clientSecret || process || isPaid}
          type="submit"
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${
            isPaid 
            ? "bg-emerald-500 text-white cursor-default" 
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          }`}
        >
          {process ? (
            <ImSpinner9 className="animate-spin text-xl" />
          ) : isPaid ? (
            "Payment Completed"
          ) : (
            <>
              <FaLock className="text-sm opacity-50" />
              Pay ${prices} Securely
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-50">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-5" />
      </div>
    </div>
  );
};

// Simple shake animation for errors
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
`;
document.head.appendChild(styleTag);

export default CheckOut;