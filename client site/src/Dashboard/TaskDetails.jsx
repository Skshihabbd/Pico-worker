import { useLoaderData } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import Swal from "sweetalert2";
import Countdownreact from "../components/Countdownreact";
import { FaCoins, FaUserEdit, FaCalendarAlt, FaIdBadge } from "react-icons/fa";

const TaskDetails = () => {
  const Data = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { users } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    title,
    taskdetails,
    image,
    payableAmount,
    creatorName,
    email,
    currenttime,
    completionDate,
  } = Data;

  // Check if task is expired
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(completionDate).getTime();
      if (end - now <= 0) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [completionDate]);

  const { data: userr = {} } = useQuery({
    queryKey: ["userr", users?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${users?.email}`);
      return res.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const SubmissionDetails = form.submitdetails.value;

    const SubmissionInfo = {
      task_id: _id,
      task_title: title,
      task_img_url: image,
      payableAmount: payableAmount,
      worker_email: userr.email,
      submission_details: SubmissionDetails,
      worker_name: userr.name,
      creator_email: email,
      creator_name: creatorName,
      current_Date: new Date().toISOString(),
      status: "pending",
    };

    axiosSecure.post("/tasksubmission", SubmissionInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Submitted Successfully!",
          text: "Your work is now pending for review.",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
        setIsOpen(false);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-10 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
        
        {/* Left: Task Image */}
        <div className="lg:w-1/2 relative">
          <img src={image} alt={title} className="w-full h-full object-cover min-h-[300px]" />
          <div className="absolute top-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            <FaCoins className="text-yellow-400" /> {payableAmount} Coins
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:w-1/2 p-8 lg:p-12 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">{title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-md">
              <FaUserEdit className="text-indigo-500" /> <span>{creatorName}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-md">
              <FaIdBadge className="text-indigo-500" /> <span>ID: {_id.slice(-6)}</span>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-500">
            <h3 className="font-bold text-indigo-900 mb-2 underline">Task Instructions:</h3>
            <p className="text-gray-700 leading-relaxed">{taskdetails}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400 uppercase">Deadline</p>
                <p className="text-sm font-semibold text-gray-700">{completionDate}</p>
              </div>
            </div>
            <div>
               <p className="text-xs text-gray-400 uppercase mb-1">Time Remaining</p>
               <Countdownreact startDateTime={currenttime} endDateTime={completionDate} />
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            disabled={isExpired}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all 
              ${isExpired 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-indigo-200 hover:scale-[1.02]"
              }`}
          >
            {isExpired ? "Task Expired" : "Submit Your Work"}
          </button>
        </div>
      </div>

      {/* Elegant Submission Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 border-b pb-4 mb-6">
                    Proof of Work
                  </Dialog.Title>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Submission Details / Proof Links
                      </label>
                      <textarea
                        required
                        name="submitdetails"
                        rows="6"
                        placeholder="Explain your work or paste required screenshots/links here..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      ></textarea>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-md transition"
                      >
                        Complete Submission
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TaskDetails;