import { useQuery } from "@tanstack/react-query";
import TaskListCard from "./TaskListCard";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"; // Fixed Import
import { BiTask } from "react-icons/bi";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: alltasks = [] } = useQuery({
    queryKey: ["alltasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/taskcreatorall");
      return res.data;
    },
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-20 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-[10px]">
            <BiTask size={20} className="animate-pulse" />
            <span>Marketplace</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
            Available <span className="text-indigo-600">Tasks</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Discover {alltasks.length} opportunities to earn coins today.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full md:w-64 text-sm"
            />
          </div>
          <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
            <HiOutlineAdjustmentsHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alltasks.map((info) => (
          <TaskListCard key={info._id} info={info} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;