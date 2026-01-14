/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import TaskCreatorAllTask from "./TaskCreatorAllTask";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaTasks, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Mytasks = () => {
  const { users } = useAuth();
  const axiosPublic = useAxiosSecure();

  const { data: task = [], refetch, isLoading } = useQuery({
    queryKey: ["task", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/taskcreator?email=${users?.email}`);
      return res.data;
    },
    enabled: !!users?.email, // Email thaklei query cholbe
  });

  return (
    <div className="p-4 lg:p-8 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <FaTasks className="text-indigo-600" /> My Created Tasks
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1 italic">
            Manage, update, or delete the tasks you have posted.
          </p>
        </div>
        
        <Link to="/dashboard/add-task">
          <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl px-6 gap-2 shadow-lg shadow-indigo-200">
            <FaPlusCircle /> Create New Task
          </button>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg text-indigo-600"></span>
            </div>
          ) : task.length > 0 ? (
            <table className="table w-full border-separate border-spacing-y-0">
              {/* Head */}
              <thead className="bg-slate-50/80">
                <tr className="border-none">
                  <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black text-center">#</th>
                  <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Task Title</th>
                  <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Quantity</th>
                  <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Payable Amount</th>
                  <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black text-center">Update</th>
                  <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {task.map((info, idx) => (
                  <TaskCreatorAllTask
                    fetchs={refetch}
                    key={info._id}
                    info={info}
                    idx={idx}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-200">
                <FaTasks size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-400">No tasks created yet</h3>
              <p className="text-slate-300 mb-8 max-w-xs">You haven't posted any tasks for workers to complete.</p>
              <Link to="/dashboard/add-task" className="btn btn-outline btn-indigo rounded-xl px-8">
                 Post Your First Task
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Simple Footer inside Card */}
      <div className="mt-6 flex justify-between items-center px-4">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Showing {task.length} tasks
        </p>
      </div>
    </div>
  );
};

export default Mytasks;