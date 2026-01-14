/* eslint-disable react/no-unescaped-entities */
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaEye, FaCheck, FaTimes, FaEllipsisV } from "react-icons/fa";

const TaskcreatorHometable = ({ info, idx, fetche }) => {
  const axiosPublic = useAxiosSecure();

  const handleUserDataget = async (emails, id) => {
    try {
      const response = await fetch(
        `https://server-side-nu-sooty.vercel.app/usercreatorhomes?email=${emails}`
      );
      const data = await response.json();
      if (data) {
        updateStatus(data, id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateStatus = (e, id) => {
    const payamount = info.payableAmount;
    const userCoinupdate = {
      name: e.name,
      email: e.email,
      role: e.role,
      coin: e.coin + payamount,
      image: e.image,
    };

    const updateInfo = {
      ...info,
      status: "approved",
    };

    // Update Task Status
    axiosPublic.put(`/hometaskupdate/${id}`, updateInfo).then((res) => {
      if (res.data) {
        fetche();
        Swal.fire({
          icon: "success",
          title: "Task Approved!",
          text: "The worker's status has been updated.",
          showConfirmButton: false,
          timer: 1500,
          background: '#f8fafc'
        });
      }
    });

    // Update User Coins
    axiosPublic.put(`/useruphomrcreator/${e._id}`, userCoinupdate);
  };

  const rejectStatus = (id) => {
    const updateInfo = {
      ...info,
      status: "rejected",
    };
    axiosPublic.put(`/hometaskupdate/${id}`, updateInfo).then((res) => {
      if (res.data) {
        fetche();
        Swal.fire({
          icon: "error",
          title: "Task Rejected",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Dynamic Status Style
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved": return "badge-success text-white bg-emerald-500 border-none";
      case "rejected": return "badge-error text-white bg-rose-500 border-none";
      default: return "badge-warning text-white bg-amber-500 border-none";
    }
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
      <th className="text-slate-400 font-medium text-xs">{idx + 1}</th>
      
      {/* Task Title */}
      <td>
        <div className="font-bold text-slate-700">{info.task_title}</div>
        <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
          Payable: <span className="text-indigo-600 font-bold">${info.payableAmount}</span>
        </div>
      </td>

      {/* Worker Info */}
      <td>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm text-slate-600">{info.worker_name}</span>
          <span className="text-xs text-slate-400 italic lowercase">{info.worker_email}</span>
          <div className={`badge badge-sm py-2 px-3 mt-1 font-bold ${getStatusStyle(info.status)}`}>
            {info.status}
          </div>
        </div>
      </td>

      {/* View Details */}
      <td>
        <button 
          onClick={() => document.getElementById(info._id).showModal()}
          className="btn btn-ghost btn-sm text-indigo-600 gap-2 hover:bg-indigo-50 normal-case"
        >
          <FaEye size={14} /> Details
        </button>
      </td>

      {/* Actions Dropdown */}
      <th className="text-right">
        <div className="dropdown dropdown-left lg:dropdown-bottom">
          <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
            <FaEllipsisV className="text-slate-400" />
          </label>
          <ul tabIndex={0} className="dropdown-content z-[20] menu p-2 shadow-2xl bg-white rounded-2xl w-44 border border-slate-100">
            <li className="menu-title text-slate-400 text-[10px] uppercase">Update Status</li>
            <li>
              <button 
                onClick={() => handleUserDataget(info.worker_email, info._id)}
                className="text-emerald-600 font-bold hover:bg-emerald-50"
              >
                <FaCheck /> Approve
              </button>
            </li>
            <li>
              <button 
                onClick={() => rejectStatus(info._id)}
                className="text-rose-500 font-bold hover:bg-rose-50"
              >
                <FaTimes /> Reject
              </button>
            </li>
          </ul>
        </div>
      </th>

      {/* Modal - Elegant Design */}
      <dialog id={info._id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-slate-50 p-0 overflow-hidden rounded-[2rem]">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-6 text-white">
            <h3 className="font-black text-xl tracking-tight">Submission Details</h3>
            <p className="text-indigo-100 text-xs mt-1">Review the worker's submitted work carefully.</p>
          </div>
          <div className="p-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-inner">
              <p className="text-slate-600 leading-relaxed italic">
                "{info.submission_details || "No details provided by the worker."}"
              </p>
            </div>
            <div className="modal-action mt-8">
              <form method="dialog">
                <button className="btn px-10 rounded-xl bg-slate-800 text-white hover:bg-slate-700 border-none">Close</button>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-slate-900/40 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>
    </tr>
  );
};

export default TaskcreatorHometable;