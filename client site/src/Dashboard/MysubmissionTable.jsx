import { FaUserCircle, FaCoins, FaRegClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MysubmissionTable = ({ info, idx }) => {
  const { task_title, payableAmount, creator_name, status } = info;

  // Status-er upor base kore color and icon thik kora
  const statusStyles = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
      icon: <FaRegClock className="text-xs" />,
    },
    approved: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
      icon: <FaCheckCircle className="text-xs" />,
    },
    rejected: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
      icon: <FaTimesCircle className="text-xs" />,
    },
  };

  const currentStatus = statusStyles[status?.toLowerCase()] || statusStyles.pending;

  return (
    <tr className="hover:bg-slate-50/80 transition-all duration-300 group border-b border-slate-100 last:border-none">
      {/* Index Column */}
      <td className="py-5 px-6">
        <span className="text-slate-400 font-medium text-sm">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </td>

      {/* Task Title */}
      <td className="py-5 px-4">
        <div className="flex flex-col max-w-xs lg:max-w-md">
          <span className="text-slate-700 font-semibold truncate group-hover:text-indigo-600 transition-colors">
            {task_title}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">
            Manual Submission
          </span>
        </div>
      </td>

      {/* Payable Amount */}
      <td className="py-5 px-4">
        <div className="flex items-center justify-center gap-1.5 bg-slate-100/50 w-fit px-3 py-1 rounded-lg">
          <FaCoins className="text-yellow-500 text-xs" />
          <span className="text-slate-700 font-bold text-sm">
            {payableAmount}
          </span>
        </div>
      </td>

      {/* Creator Name */}
      <td className="py-5 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400">
            <FaUserCircle size={20} />
          </div>
          <span className="text-slate-600 text-sm font-medium">{creator_name}</span>
        </div>
      </td>

      {/* Status Badge */}
      <td className="py-5 px-8 text-right">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm transition-transform group-hover:scale-105 ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}>
          {currentStatus.icon}
          {status}
        </div>
      </td>
    </tr>
  );
};

export default MysubmissionTable;