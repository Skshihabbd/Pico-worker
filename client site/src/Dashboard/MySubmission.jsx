/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import MysubmissionTable from "./MysubmissionTable";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { HiOutlineInboxIn } from "react-icons/hi"; // Professional Icon
import { LuLayoutList } from "react-icons/lu";

const MySubmission = () => {
  const { users } = useAuth();
  const axiosPublic = useAxiosSecure();
  
  const { data: userworkerhomessubmit = [], isLoading } = useQuery({
    queryKey: ["userworkerhomessubmit", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/userworkerhomessubmit?email=${users.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      
      {/* ===== Elegant Header & Stats ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
            <HiOutlineInboxIn size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">My Submissions</h1>
            <p className="text-slate-500 text-sm font-medium">Track and manage your submitted tasks</p>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 px-6 py-3 bg-slate-900 rounded-2xl shadow-lg shadow-slate-200">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Total Submitted</p>
          <p className="text-white text-2xl font-black">{userworkerhomessubmit.length} <span className="text-xs font-normal text-slate-400">Tasks</span></p>
        </div>
      </div>

      {/* ===== Table Section ===== */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100"># Index</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Task Title</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Payable Amount</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Task Creator</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                // Skeleton Loader Simulation
                [1, 2, 3].map((n) => (
                  <tr key={n} className="animate-pulse">
                    <td colSpan="5" className="px-8 py-6 bg-slate-50/30"></td>
                  </tr>
                ))
              ) : userworkerhomessubmit.length > 0 ? (
                userworkerhomessubmit.map((info, idx) => (
                  <MysubmissionTable
                    key={info._id}
                    idx={idx}
                    info={info}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center text-slate-400">
                      <LuLayoutList size={48} className="mb-2 opacity-20" />
                      <p className="italic font-medium">You haven't submitted any tasks yet.</p>
                    </div>
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

export default MySubmission;