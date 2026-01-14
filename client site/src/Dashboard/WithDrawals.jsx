import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaWallet, FaCoins, FaUniversity, FaCalendarAlt } from "react-icons/fa";

const WithDrawals = () => {
  const axiosPublic = useAxiosSecure();
  const { users } = useAuth();
  
  const { data: userworkerhomes = {}, refetch } = useQuery({
    queryKey: ["userworkerhomes", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userworkerhomes?email=${users.email}`);
      return res.data;
    },
  });

  const { data: userworkerhomessubmitpay = [] } = useQuery({
    queryKey: ["userworkerhomessubmitpay", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userworkerhomessubmitpay?email=${users.email}`);
      return res.data;
    },
  });

  const totalAvailableCoins = userworkerhomessubmitpay.reduce((acc, item) => acc + item.payableAmount, userworkerhomes.coin || 0);
  const conversionRate = 20; // 20 coins = 1 dollar

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const withdrawCoin = parseInt(form.withdrawcoin.value);
    const withdrawAmount = withdrawCoin / conversionRate;
    const currenttime = form.submittime.value;
    const paymentSystem = form.system.value;
    const accountnumber = form.accountnumber.value;

    if (withdrawCoin > totalAvailableCoins) {
      return Swal.fire({
        icon: "error",
        title: "Insufficient Balance",
        text: "You don't have enough coins to withdraw!",
        confirmButtonColor: "#4F46E5",
      });
    }

    if (withdrawCoin < 20) {
        return Swal.fire({
          icon: "warning",
          text: "Minimum withdrawal is 20 coins (1 dollar)",
        });
      }

    const postInfo = {
      WithdrawCoin: withdrawCoin,
      withdrawAmount: withdrawAmount,
      currenttime,
      paymentSystem,
      accountnumber,
      worker_email: userworkerhomes.email,
      worker_name: userworkerhomes.name,
      status: 'pending'
    };

    axiosPublic.post("/withdraw", postInfo).then((res) => {
      if (res.data.insertedId) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Request Sent!",
          text: "Your withdrawal request is pending for approval.",
          timer: 2000,
          showConfirmButton: false,
        });
        form.reset();
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 animate-fadeIn">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">Withdraw Your Earnings</h2>
        <p className="text-slate-500 mt-2">Conversion: <span className="font-bold text-indigo-600">{conversionRate} Coins = $1.00</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Earnings Overview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            <FaWallet className="absolute -right-4 -bottom-4 text-white/10 text-9xl" />
            <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">Available Balance</p>
            <h3 className="text-4xl font-black mt-2 flex items-center gap-2">
              <FaCoins className="text-yellow-400" /> {totalAvailableCoins}
            </h3>
            <p className="text-indigo-100 mt-4 pt-4 border-t border-white/20">
              Equivalent to: <span className="text-xl font-bold">${(totalAvailableCoins / conversionRate).toFixed(2)}</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3">Important Note:</h4>
            <ul className="text-sm text-slate-500 space-y-2 list-disc ml-4">
              <li>Minimum withdrawal: 20 coins</li>
              <li>Processing time: 24-48 hours</li>
              <li>Ensure account number is correct</li>
            </ul>
          </div>
        </div>

        {/* Right: Withdrawal Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaCoins className="text-indigo-500" /> Coin to Withdraw
              </label>
              <input
                required
                name="withdrawcoin"
                type="number"
                placeholder="Enter coin amount (e.g. 100)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-500" /> Current Date
              </label>
              <input
                required
                name="submittime"
                type="datetime-local"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaUniversity className="text-indigo-500" /> Payment System
              </label>
              <select
                required
                name="system"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="" disabled selected>Select Payment Method</option>
                <option value="bkash">Bkash</option>
                <option value="rocket">Rocket</option>
                <option value="nagad">Nagad</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Account Number</label>
              <input
                required
                name="accountnumber"
                type="text"
                placeholder="Account Number (e.g. 017...)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.01] transition-all duration-300 mt-4"
            >
              Withdraw Now
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default WithDrawals;