import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaTrashAlt, FaUserEdit, FaCoins } from "react-icons/fa";

const ManageUserTable = ({ info, fetch, idx }) => {
  const { name, email, image, coin, role, _id } = info;
  const axiosSecure = useAxiosSecure();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${name}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete user",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/managedeleteuser/${_id}`).then((res) => {
          if (res.data) {
            fetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
          }
        });
      }
    });
  };

  const updateRole = (newRole) => {
    let coins = coin;
    if (newRole === "admin") coins = 0;
    else if (newRole === "task creator") coins = 50;
    else if (newRole === "worker") coins = 10;

    const updateInfo = { name, email, image, coin: coins, role: newRole };

    axiosSecure.put(`/userup/${_id}`, updateInfo).then((res) => {
      if (res.data) {
        fetch();
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `${name} is now a ${newRole}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100">
      {/* Index - Fixed Width */}
      <td className="text-center font-bold text-slate-400 w-12">{idx + 1}</td>
      
      {/* User Info - Min Width added for mobile readability */}
      <td className="min-w-[200px]">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="avatar shrink-0">
            <div className="mask mask-squircle w-10 h-10 md:w-12 md:h-12 ring-2 ring-indigo-50">
              <img src={image} alt={name} className="object-cover" />
            </div>
          </div>
          <div className="truncate">
            <div className="font-black text-slate-700 text-sm md:text-base truncate max-w-[120px] md:max-w-none">
              {name}
            </div>
            <div className="badge badge-ghost badge-xs py-2 px-2 uppercase text-[9px] font-bold tracking-tighter">
              {role}
            </div>
          </div>
        </div>
      </td>

      {/* Contact & Coins - Min Width added */}
      <td className="min-w-[180px]">
        <div className="text-slate-600 font-medium text-xs md:text-sm truncate max-w-[150px] md:max-w-none">
            {email}
        </div>
        <div className="flex items-center gap-1 text-amber-600 font-bold text-xs mt-1">
          <FaCoins size={10} className="shrink-0" /> {coin || 0} 
          <span className="hidden sm:inline text-[10px] text-slate-400 italic font-medium ml-1">Available</span>
        </div>
      </td>

      {/* Role Management */}
      <td className="min-w-[150px]">
        <div className="dropdown dropdown-end md:dropdown-right">
          <label tabIndex={0} className="btn btn-xs md:btn-sm bg-white border-slate-200 hover:bg-slate-50 text-indigo-600 normal-case rounded-lg md:rounded-xl gap-2 shadow-sm shrink-0">
            <FaUserEdit /> <span className="hidden xs:inline">Role</span>
          </label>
          <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow-2xl bg-white rounded-2xl w-44 md:w-52 border border-slate-100">
            <li className="menu-title text-[10px] uppercase tracking-widest text-slate-400">Select Role</li>
            <li><button onClick={() => updateRole("admin")} className="font-bold text-rose-600 text-xs md:text-sm">Admin</button></li>
            <li><button onClick={() => updateRole("task creator")} className="font-bold text-indigo-600 text-xs md:text-sm">Task Creator</button></li>
            <li><button onClick={() => updateRole("worker")} className="font-bold text-emerald-600 text-xs md:text-sm">Worker</button></li>
          </ul>
        </div>
      </td>

      {/* Delete Action */}
      <td className="text-right pr-4 md:pr-10">
        <button
          onClick={handleDelete}
          className="btn btn-ghost btn-xs md:btn-md btn-circle text-rose-500 hover:bg-rose-50 transition-all shrink-0"
          title="Delete User"
        >
          <FaTrashAlt className="text-sm md:text-base" />
        </button>
      </td>
    </tr>
  );
};

export default ManageUserTable;