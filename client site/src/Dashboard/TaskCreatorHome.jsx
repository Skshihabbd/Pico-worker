import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import TaskcreatorHometable from "./TaskcreatorHometable";
import Taskcreatorstatehome from "./Taskcreatorstatehome";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaInbox, FaListAlt } from "react-icons/fa";

const TaskCreatorHome = () => {
  const { users } = useAuth();
  const axiosPublic = useAxiosSecure();

  const { data: taskhomesubmits = [], refetch, isLoading } = useQuery({
    queryKey: ["taskhomesubmit", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/taskcreatorhomesubmit?email=${users?.email}`
      );
      return res.data;
    },
    enabled: !!users?.email, // Email thaklei query cholbe
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 lg:p-8">
      {/* 1. Stats Section (Overview Cards) */}
      <div className="mb-10">
        <Taskcreatorstatehome />
      </div>

      {/* 2. Table Section Container */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Table Header Section */}
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <FaListAlt size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Recent Submissions</h2>
              <p className="text-xs text-slate-400 font-medium italic">Review and manage worker proof submissions</p>
            </div>
          </div>
          
          <div className="badge badge-lg bg-slate-100 text-slate-600 border-none font-bold py-4 px-6 rounded-xl">
             Total: {taskhomesubmits.length}
          </div>
        </div>

        {/* 3. The Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg text-indigo-600"></span>
            </div>
          ) : taskhomesubmits.length > 0 ? (
            <table className="table w-full border-separate border-spacing-y-2 px-4">
              {/* Head */}
              <thead className="bg-slate-50/50">
                <tr className="border-none">
                  <th className="text-slate-400 uppercase text-[10px] tracking-widest font-black rounded-l-2xl">#</th>
                  <th className="text-slate-400 uppercase text-[10px] tracking-widest font-black">Task Information</th>
                  <th className="text-slate-400 uppercase text-[10px] tracking-widest font-black">Worker Profile</th>
                  <th className="text-slate-400 uppercase text-[10px] tracking-widest font-black text-center">Submission</th>
                  <th className="text-slate-400 uppercase text-[10px] tracking-widest font-black text-right rounded-r-2xl">Actions</th>
                </tr>
              </thead>
              
              <tbody className="before:block before:h-4">
                {taskhomesubmits.map((info, idx) => (
                  <TaskcreatorHometable
                    key={info._id}
                    idx={idx}
                    fetche={refetch}
                    info={info}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 border-2 border-dashed border-slate-200">
                <FaInbox size={30} />
              </div>
              <h3 className="text-lg font-bold text-slate-400">No submissions found</h3>
              <p className="text-sm text-slate-300">New worker submissions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCreatorHome;