import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import WorkerApprovedSubmissionTable from "./WorkerApprovedSubmissionTable";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaCoins, FaCheckDouble, FaHandHoldingUsd } from "react-icons/fa";

const WorkerHomeState = () => {
  const axiosPublic = useAxiosSecure();
  const { users } = useAuth();

  const { data: userworkerhomes = {} } = useQuery({
    queryKey: ["userworkerhomes", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userworkerhomes?email=${users.email}`);
      return res.data;
    },
  });

  const { data: userworkerhomessubmit = [] } = useQuery({
    queryKey: ["userworkerhomessubmit", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userworkerhomessubmit?email=${users.email}`);
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

  const totalEarnings = userworkerhomessubmitpay.reduce(
    (acc, item) => acc + item.payableAmount,
    0
  );

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* ===== Stat Cards Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Coin Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-50 rounded-2xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
              <FaCoins size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Available Coins</p>
              <h3 className="text-2xl font-black text-slate-800">{userworkerhomes.coin || 0}</h3>
            </div>
          </div>
        </div>

        {/* Total Submissions Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
              <FaCheckDouble size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Submissions</p>
              <h3 className="text-2xl font-black text-slate-800">{userworkerhomessubmit.length}</h3>
            </div>
          </div>
        </div>

        {/* All Payable Amount Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <FaHandHoldingUsd size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Earnings</p>
              <h3 className="text-2xl font-black text-slate-800">{totalEarnings} <span className="text-sm font-normal text-slate-400">Coins</span></h3>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Table Section ===== */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-xl font-bold text-slate-800 italic">Approved Submissions</h2>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
            Recent {userworkerhomessubmitpay.length} Tasks
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Task Title</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Payable</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Creator</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {userworkerhomessubmitpay.length > 0 ? (
                userworkerhomessubmitpay.map((info, idx) => (
                  <WorkerApprovedSubmissionTable
                    key={info._id}
                    idx={idx}
                    info={info}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-slate-400 italic">
                    No approved submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerHomeState;