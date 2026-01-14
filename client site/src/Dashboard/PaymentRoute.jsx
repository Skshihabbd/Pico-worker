import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckOut from "./CheckOut";
import { FaLock, FaShieldAlt, FaCoins } from "react-icons/fa";

// Load Stripe outside of component to avoid recreation on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentRoute = () => {
  const { coin, price } = useParams();

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-slate-100">
        
        {/* 1. Order Summary Side (Left) */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-8 lg:p-12 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <FaShieldAlt className="text-teal-400 text-2xl" />
              </div>
              <h2 className="text-xl font-black tracking-tight uppercase">Secure Checkout</h2>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-black">Finalizing your <span className="text-teal-400 italic">Order</span></h1>
              <p className="text-indigo-100/70 font-medium">You are about to purchase a coin package. Your coins will be added instantly after successful payment.</p>
            </div>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-[2rem] p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-indigo-200 font-bold uppercase text-xs tracking-widest">Plan Details</span>
              <FaCoins className="text-amber-400" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-3xl font-black">{coin} Coins</h3>
                <p className="text-indigo-200 text-sm italic">Micro-task Credits</p>
              </div>
              <div className="text-right">
                <h3 className="text-3xl font-black text-teal-400">${price}</h3>
                <p className="text-indigo-200 text-sm italic tracking-tighter">Total Payable</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Stripe Elements Side (Right) */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
             <h3 className="text-2xl font-black text-slate-800 mb-2">Payment Details</h3>
             <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <FaLock className="text-emerald-500" />
                <span>Encrypted & SSL Secured</span>
             </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
             {/* Stripe Element Provider */}
            <Elements stripe={stripePromise}>
              <CheckOut info={{ coins: coin, prices: price }} />
            </Elements>
          </div>

          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Powered by <span className="text-indigo-600">Stripe</span> Gateway
          </p>
        </div>

      </div>
    </div>
  );
};

export default PaymentRoute;