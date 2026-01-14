import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaClipboardList, FaInfoCircle } from "react-icons/fa";

const TaskcreatorUpdate = () => {
  const data = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    _id,
    submissionInfo,
    taskdetails,
    title,
  } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const updateInfo = {
      ...data, // Keeping previous unedited fields (like image, coin, etc.)
      title: form.title.value,
      taskdetails: form.details.value,
      submissionInfo: form.submit.value,
    };

    axiosSecure.put(`/taskcollectionupdate/${_id}`, updateInfo).then((res) => {
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Task Updated!",
          text: "Your changes have been saved successfully.",
          showConfirmButton: false,
          timer: 1500,
          background: "#fff",
          customClass: {
            popup: 'rounded-[2rem]'
          }
        });
        navigate("/dashboard/mytasks"); // Redirecting back to list
      }
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-slate-50 text-slate-700 font-medium";
  const labelClass = "block text-sm font-bold text-slate-600 mb-2 ml-1";

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 lg:p-8 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <FaEdit size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Update Task</h2>
              <p className="text-indigo-100 text-xs font-medium italic">Refine your task details for better results</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-6">
          
          {/* Task Title */}
          <div>
            <label className={labelClass}><FaClipboardList className="inline mr-2 text-indigo-500" /> Task Title</label>
            <input
              required
              type="text"
              name="title"
              defaultValue={title}
              className={inputClass}
              placeholder="Enter task title"
            />
          </div>

          {/* Task Details */}
          <div>
            <label className={labelClass}><FaInfoCircle className="inline mr-2 text-indigo-500" /> Task Details</label>
            <textarea
              required
              name="details"
              defaultValue={taskdetails}
              className={`${inputClass} h-32 resize-none`}
              placeholder="Detailed instructions..."
            />
          </div>

          {/* Submission Proof Info */}
          <div>
            <label className={labelClass}><FaEdit className="inline mr-2 text-indigo-500" /> Submission Proof Info</label>
            <input
              required
              type="text"
              name="submit"
              defaultValue={submissionInfo}
              className={inputClass}
              placeholder="What should workers submit?"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              type="submit" 
              className="btn flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border-none h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-200 transition-all"
            >
              Save Changes
            </button>
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="btn flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 border-none h-14 rounded-2xl font-black uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskcreatorUpdate;