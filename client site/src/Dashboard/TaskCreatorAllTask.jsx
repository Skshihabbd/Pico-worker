import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaEdit, FaTrashAlt, FaCoins, FaLayerGroup } from "react-icons/fa";

const TaskCreatorAllTask = ({ info, idx, fetchs }) => {
  const axiosPublic = useAxiosSecure();
  const { users } = useAuth();

  // Fetching user data to handle coin refund during deletion
  const { data: user = {}, refetch } = useQuery({
    queryKey: ["user", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${users?.email}`);
      return res.data;
    },
    enabled: !!users?.email,
  });

  const { coin, email, name, role, _id, image } = user;

  const handleUserUpdate = async (id) => {
    // Elegant Confirmation Dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this task will refund the amount to your coins!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Emerald-500
      cancelButtonColor: "#f43f5e",  // Rose-500
      confirmButtonText: "Yes, delete it!",
      background: "#ffffff",
      customClass: {
        popup: 'rounded-[2rem]'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://server-side-nu-sooty.vercel.app/taskcreators/${id}`);
          const data = await res.json();
          if (data) {
            handleDelete(id, data);
          }
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      }
    });
  };

  const handleDelete = (ide, taskData) => {
    const payamounts = Number(coin) + Number(taskData?.payableAmount);

    if (isNaN(payamounts)) {
      Swal.fire("Error", "Could not calculate refund. Please try again.", "error");
      return;
    }

    const userUpdate = {
      name, email, role, coin: payamounts, image
    };

    // 1. Update User Coins (Refund)
    axiosPublic.put(`/user/${_id}`, userUpdate).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        // 2. Delete the Task
        axiosPublic.delete(`/taskcreator/${ide}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Deleted & Refunded!",
              text: "Task removed and coins returned to your account.",
              showConfirmButton: false,
              timer: 2000,
            });
            fetchs();
          }
        });
      }
    });
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-all border-b border-slate-100 group">
      <th className="text-slate-400 font-medium text-xs text-center">{idx + 1}</th>
      
      {/* Task Title */}
      <td>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold shadow-sm">
            {info.title.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-slate-700">{info.title}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-tighter">Task ID: {info._id.slice(-6)}</div>
          </div>
        </div>
      </td>

      {/* Quantity */}
      <td>
        <div className="flex items-center gap-2 text-slate-600 font-semibold">
          <FaLayerGroup className="text-slate-300" />
          {info.quantity} <span className="text-[10px] text-slate-400 font-normal">Workers</span>
        </div>
      </td>

      {/* Payable Amount */}
      <td>
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full w-fit font-bold text-sm border border-emerald-100">
          <FaCoins className="text-emerald-500" />
          {info.payableAmount}
        </div>
      </td>

      {/* Update Action */}
      <td className="text-center">
        <Link to={`/dashboard/taskupdate/${info._id}`}>
          <button className="btn btn-ghost btn-sm text-indigo-600 hover:bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
            <FaEdit size={18} />
          </button>
        </Link>
      </td>

      {/* Delete Action */}
      <td className="text-center">
        <button 
          onClick={() => handleUserUpdate(info._id)}
          className="btn btn-ghost btn-sm text-rose-500 hover:bg-rose-50 rounded-lg group-hover:scale-110 transition-transform"
        >
          <FaTrashAlt size={16} />
        </button>
      </td>
    </tr>
  );
};

export default TaskCreatorAllTask;