import { useQuery } from "@tanstack/react-query";
import Managetasktable from "./Managetasktable";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaTasks, FaSearch, FaFilter } from "react-icons/fa";

const Managetask = () => {
  const axiosSecure = useAxiosSecure();

  const { data: managetasksall = [], refetch, isLoading } = useQuery({
    queryKey: ["managetasksall"],
    queryFn: async () => {
      const res = await axiosSecure.get("/managetasksall");
      return res.data;
    },
  });

  return (
    <div className="p-4 lg:p-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <FaTasks className="text-indigo-600" /> Platform Tasks
          </h2>
          <p className="text-slate-400 text-sm font-medium italic mt-1">
            Monitoring and managing {managetasksall.length} active tasks across the platform.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Find a task..." 
                className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm bg-white w-48 lg:w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
           </div>
           <button className="btn btn-square bg-white border-slate-200 hover:bg-slate-100 text-slate-500 rounded-xl">
              <FaFilter size={14} />
           </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            {/* Table Head */}
            <thead className="bg-slate-50/80">
              <tr className="border-none">
                <th className="py-5 text-center text-slate-400 uppercase text-[10px] tracking-widest font-black">#</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Task Information</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black text-center">Reference</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Availability</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Deadline</th>
                <th className="py-5 text-right text-slate-400 uppercase text-[10px] tracking-widest font-black pr-10">Control</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-24 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <span className="loading loading-ring loading-lg text-indigo-600"></span>
                      <span className="text-slate-500 font-bold italic">Gathering task data...</span>
                    </div>
                  </td>
                </tr>
              ) : managetasksall.length > 0 ? (
                managetasksall.map((info, idx) => (
                  <Managetasktable
                    fetchp={refetch}
                    key={info._id}
                    idx={idx}
                    info={info}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-24 text-center">
                    <div className="flex flex-col items-center opacity-40">
                       <FaTasks size={48} className="text-slate-300 mb-4" />
                       <p className="text-slate-500 font-black text-xl italic uppercase tracking-widest">
                         No tasks found
                       </p>
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

export default Managetask;