import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { useState } from "react";
import { FaCheckCircle, FaMoneyCheckAlt, FaClock } from "react-icons/fa";

const Adminhometable = ({ info, idx, fetcher }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handledataget = async (email, id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://server-side-nu-sooty.vercel.app/usercreatorhomes?email=${email}`
      );
      const data = await response.json();
      
      if (data) {
        updateStatus(data, id);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  };

  const updateStatus = async (userData, withdrawalId) => {
    const updatedCoinBalance = userData.coin - info.WithdrawCoin;

    const updateUser = {
      name: userData.name,
      email: userData.email,
      coin: updatedCoinBalance,
      image: userData.image,
      role: userData.role,
    };

    try {
      // 1. Update User Balance
      const userRes = await axiosSecure.put(`/adminhomeallpayment/${userData._id}`, updateUser);
      
      if (userRes.data) {
        // 2. Delete/Complete Withdrawal Request
        const deleteRes = await axiosSecure.delete(`/adminhomeallpayment/${withdrawalId}`);
        
        if (deleteRes.data) {
          Swal.fire({
            icon: "success",
            title: "Payment Processed!",
            text: `Approved withdrawal for ${info.worker_name}. Balance updated.`,
            showConfirmButton: false,
            timer: 2000,
            customClass: { popup: 'rounded-[1.5rem]' }
          });
          fetcher(); // Refresh Table
        }
      }
    } catch (error) {
      Swal.fire("Error", "Transaction failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
      <td className="font-bold text-slate-400 text-center">{idx + 1}</td>
      
      {/* Worker Info */}
      <td>
        <div className="font-bold text-slate-700">{info.worker_name}</div>
        <div className="text-[10px] text-slate-400 font-medium italic">{info.worker_email}</div>
      </td>

      {/* Coin & Amount */}
      <td>
        <div className="flex flex-col">
          <span className="font-black text-indigo-600">{info.WithdrawCoin} Coins</span>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <FaMoneyCheckAlt size={10} /> ${info.withdrawAmount}
          </span>
        </div>
      </td>

      {/* Account Info */}
      <td>
        <div className="font-semibold text-slate-600">{info.accountnumber}</div>
        <div className="badge badge-ghost badge-xs font-bold py-2 px-3 rounded-md uppercase tracking-tighter">
          {info.paymentSystem}
        </div>
      </td>

      {/* Time */}
      <td className="text-slate-500 text-xs">
        <div className="flex items-center gap-1.5">
          <FaClock className="text-slate-300" />
          {new Date(info.currenttime).toLocaleDateString()}
        </div>
      </td>

      {/* Action */}
      <td className="text-right">
        <button
          disabled={loading}
          onClick={() => handledataget(info.worker_email, info._id)}
          className={`btn btn-sm px-6 rounded-xl border-none font-bold transition-all shadow-md ${
            loading 
              ? "bg-slate-200 text-slate-400" 
              : "bg-indigo-600 hover:bg-emerald-500 text-white"
          }`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <div className="flex items-center gap-2">
               <FaCheckCircle /> Approve
            </div>
          )}
        </button>
      </td>
    </tr>
  );
};

export default Adminhometable;