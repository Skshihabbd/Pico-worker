import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import AddNewTaskForm from "./AddNewTaskForm";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaPlusCircle, FaCoins, FaInfoCircle } from "react-icons/fa";

const AddNewtask = () => {
  const { users } = useAuth();
  const axiosPublic = useAxiosSecure();

  const { data: user = {}, refetch, isLoading } = useQuery({
    queryKey: ["user", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${users?.email}`);
      return res.data;
    },
    enabled: !!users?.email,
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 lg:p-8">
      {/* 1. Page Header & Wallet Card */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight flex items-center justify-center md:justify-start gap-3">
            <FaPlusCircle className="text-indigo-600" /> Create New Task
          </h1>
          <p className="text-slate-500 font-medium italic">
            Fill in the details below to post a micro-task for workers.
          </p>
        </div>

        {/* User Balance Card (Real-time) */}
        <div className="bg-white px-8 py-4 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-50 flex items-center gap-4 group hover:scale-105 transition-transform duration-300">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl group-hover:rotate-12 transition-transform">
            <FaCoins size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Balance</p>
            <h2 className="text-2xl font-black text-slate-800">{isLoading ? "..." : user?.coin} <span className="text-sm font-bold text-slate-400 italic">Coins</span></h2>
          </div>
        </div>
      </div>

      {/* 2. Main Form Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
        {/* Decorative Top Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"></div>
        
        <div className="p-8 lg:p-12">
          {/* Important Tip Section */}
          <div className="mb-10 bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
             <FaInfoCircle className="text-indigo-600 mt-1" />
             <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                <span className="font-bold uppercase">Pro Tip:</span> Be very clear in your task description. High-quality instructions lead to better results from workers and fewer rejections.
             </p>
          </div>

          {/* Render the actual form */}
          <AddNewTaskForm info={user} fetch={refetch} />
        </div>
      </div>

      {/* 3. Helper Footer */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <p className="text-center text-slate-400 text-xs font-medium italic">
          Need help? Check our <span className="text-indigo-600 cursor-pointer hover:underline">Creator Guidelines</span> for posting high-conversion tasks.
        </p>
      </div>
    </div>
  );
};

export default AddNewtask;