import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import Adminhomestate from "./Adminhomestate";
import Adminhometable from "./Adminhometable";
import { FaHistory, FaFilter } from "react-icons/fa";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: adminhomeallpayment = [], refetch, isLoading } = useQuery({
    queryKey: ["adminhomeallpayment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminhomeallpayment");
      return res.data;
    },
  });

  return (
    <div className="p-4 lg:p-8 bg-slate-50 min-h-screen">
      {/* 1. Analytics Cards Section */}
      <div className="mb-10">
        <Adminhomestate />
      </div>

      {/* 2. Table Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <FaHistory className="text-indigo-600" /> Withdrawal Requests
          </h2>
          <p className="text-slate-400 text-sm font-medium italic">
            Review and approve pending payouts for workers.
          </p>
        </div>

        {/* Optional Filter Button */}
        <button className="btn btn-sm bg-white border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl px-4 normal-case shadow-sm">
          <FaFilter size={12} /> Filter Requests
        </button>
      </div>

      {/* 3. Main Table Container */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            {/* Table Head */}
            <thead className="bg-slate-50/80">
              <tr className="border-none">
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black text-center">#</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Worker Name</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Coin Details</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Payment Info</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Request Time</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black text-right">Admin Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <span className="loading loading-spinner loading-lg text-indigo-600"></span>
                  </td>
                </tr>
              ) : adminhomeallpayment.length > 0 ? (
                adminhomeallpayment.map((info, idx) => (
                  <Adminhometable 
                    key={info._id} 
                    idx={idx} 
                    fetcher={refetch} 
                    info={info} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                       <p className="text-slate-400 font-bold text-lg italic">No pending withdrawal requests!</p>
                       <p className="text-slate-300 text-sm">Everything is up to date.</p>
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

export default AdminHome;