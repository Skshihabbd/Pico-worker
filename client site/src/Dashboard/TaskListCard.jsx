import { Link } from "react-router-dom";
import { FaCoins, FaUsers, FaArrowRight, FaCheckCircle } from "react-icons/fa";

const TaskListCard = ({ info }) => {
  const { _id, title, taskdetails, image, coins, quantity, creator_name } = info;

  return (
    <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col h-full">
      
      {/* 1. Header Image with Floating Badges */}
      <div className="relative h-52 overflow-hidden m-3 rounded-[1.5rem]">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={image}
          alt={title}
        />
        
        {/* Coin Badge (Glassmorphism) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/50">
          <div className="bg-yellow-400 p-1.5 rounded-full shadow-inner">
             <FaCoins className="text-white text-xs" />
          </div>
          <span className="font-extrabold text-slate-800 text-sm tracking-tight">{coins}</span>
        </div>

        {/* Status/Verified Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-indigo-600/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-indigo-400/30">
          <FaCheckCircle className="text-indigo-200 text-xs" />
          <span className="text-white text-[10px] font-bold uppercase tracking-wider">Verified Task</span>
        </div>
      </div>

      {/* 2. Body Content */}
      <div className="px-6 pb-6 flex flex-col flex-grow">
        
        {/* Creator Info */}
        <div className="flex items-center gap-2 mb-3">
           <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
           <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">
             By {creator_name || "Premium Creator"}
           </span>
        </div>

        <h2 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
          {title.length > 35 ? title.slice(0, 35) + "..." : title}
        </h2>

        {/* Task Details with Line Clamp */}
        <p className="mt-3 text-slate-500 text-sm leading-relaxed flex-grow">
          {taskdetails.length > 80 ? taskdetails.slice(0, 80) + "..." : taskdetails}
        </p>

        {/* 3. Footer Stats & Action */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-[10px] text-slate-400 font-semibold uppercase">Vacancies</span>
             <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                <FaUsers className="text-indigo-400 text-sm" />
                <span>{quantity}</span>
             </div>
          </div>

          <Link to={`/dashboard/taskdetails/${_id}`}>
            <button className="relative flex items-center justify-center h-12 w-12 bg-slate-900 text-white rounded-2xl transition-all duration-300 group-hover:w-32 group-hover:bg-indigo-600 overflow-hidden shadow-lg shadow-slate-200 group-hover:shadow-indigo-200">
              <span className="absolute left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 font-bold text-sm whitespace-nowrap">
                View Task
              </span>
              <FaArrowRight className="absolute right-4 group-hover:right-4 transition-all duration-300" />
            </button>
          </Link>
        </div>
      </div>

      {/* Subtle Bottom Border Animation */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default TaskListCard;