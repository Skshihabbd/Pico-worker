import { FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

const WorkerApprovedSubmissionTable = ({ info, idx }) => {
  const { task_title, payableAmount, creator_name, status } = info;

  return (
    <tr className="hover:bg-slate-50/80 transition-colors group border-b border-slate-100 last:border-none">
      {/* Index Column */}
      <td className="py-4 pl-6">
        <span className="text-slate-400 font-medium text-sm">#{idx + 1}</span>
      </td>

      {/* Task Title */}
      <td className="py-4">
        <div className="flex flex-col">
          <span className="text-slate-700 font-semibold group-hover:text-indigo-600 transition-colors">
            {task_title}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Task Submission</span>
        </div>
      </td>

      {/* Payable Amount */}
      <td className="py-4 text-center lg:text-left">
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
          <HiOutlineCurrencyDollar className="text-lg" />
          <span>{payableAmount}</span>
        </div>
      </td>

      {/* Creator Name */}
      <td className="py-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <FaUserCircle size={18} />
          </div>
          <span className="text-slate-600 text-sm font-medium">{creator_name}</span>
        </div>
      </td>

      {/* Status Badge */}
      <td className="py-4 pr-6">
        <div className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm 
          ${status === 'approved' 
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
            : "bg-amber-50 text-amber-600 border border-amber-100"
          }`}>
          {status === 'approved' && <FaCheckCircle className="text-xs" />}
          {status}
        </div>
      </td>
    </tr>
  );
};

export default WorkerApprovedSubmissionTable;