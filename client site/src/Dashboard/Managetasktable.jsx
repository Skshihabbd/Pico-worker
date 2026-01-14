import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaTrashAlt, FaEye, FaCalendarAlt, FaLayerGroup } from "react-icons/fa";

const Managetasktable = ({ info, idx, fetchp }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently removed from the platform.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/managetasksall/${id}`).then((res) => {
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Task Deleted Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchp();
          }
        });
      }
    });
  };

  return (
    <>
      <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
        <td className="text-center font-bold text-slate-400">{idx + 1}</td>
        
        {/* Task Title */}
        <td className="max-w-xs">
          <div className="font-black text-slate-700 truncate" title={info.title}>
            {info.title}
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            ID: {info._id.slice(-6)}
          </div>
        </td>

        {/* Details Trigger */}
        <td>
          <button 
            onClick={() => document.getElementById(info._id).showModal()}
            className="btn btn-xs bg-indigo-50 text-indigo-600 border-none hover:bg-indigo-600 hover:text-white rounded-lg gap-2 px-3 py-2 h-auto"
          >
            <FaEye size={12} /> View Details
          </button>
        </td>

        {/* Quantity */}
        <td>
          <div className="flex items-center gap-2 text-slate-600 font-bold">
            <FaLayerGroup className="text-slate-300" />
            {info.quantity}
          </div>
        </td>

        {/* Completion Date */}
        <td>
          <div className="flex items-center gap-2 text-slate-500 text-sm italic">
            <FaCalendarAlt className="text-rose-300" />
            {info.completionDate}
          </div>
        </td>

        {/* Action */}
        <td className="text-right">
          <button
            onClick={() => handleDelete(info._id)}
            className="btn btn-ghost btn-circle text-rose-500 hover:bg-rose-50 transition-all"
            title="Remove Task"
          >
            <FaTrashAlt size={16} />
          </button>
        </td>
      </tr>

      {/* Modern Modal Design */}
      <dialog id={info._id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[2rem] p-8 border-t-8 border-indigo-600">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-black text-2xl text-slate-800 tracking-tight">Task Details</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
             <p className="text-slate-600 leading-relaxed font-medium">
               {info.taskdetails || "No detailed instructions provided."}
             </p>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-slate-800 text-white hover:bg-slate-900 border-none rounded-xl px-8 uppercase font-black tracking-widest text-xs">
                Close
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Managetasktable;