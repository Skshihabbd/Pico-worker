import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaTrashAlt,  FaUserEdit, FaCoins } from "react-icons/fa";

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
    let coins = coin; // Keep existing coins if just changing role
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
      <td className="text-center font-bold text-slate-400">{idx + 1}</td>
      
      {/* User Info */}
      <td>
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12 ring-2 ring-indigo-50">
              <img src={image} alt={name} />
            </div>
          </div>
          <div>
            <div className="font-black text-slate-700">{name}</div>
            <div className="badge badge-ghost badge-xs py-2 px-2 uppercase text-[9px] font-bold tracking-tighter">
              {role}
            </div>
          </div>
        </div>
      </td>

      {/* Contact & Coins */}
      <td>
        <div className="text-slate-600 font-medium">{email}</div>
        <div className="flex items-center gap-1 text-amber-600 font-bold text-xs mt-1">
          <FaCoins size={10} /> {coin || 0} <span className="text-[10px] text-slate-400 italic font-medium">Available</span>
        </div>
      </td>

      {/* Role Management */}
      <td>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-sm bg-white border-slate-200 hover:bg-slate-50 text-indigo-600 normal-case rounded-xl gap-2 shadow-sm">
            <FaUserEdit /> Change Role
          </label>
          <ul tabIndex={0} className="dropdown-content z-[20] menu p-2 shadow-2xl bg-white rounded-2xl w-52 border border-slate-100">
            <li className="menu-title text-[10px] uppercase tracking-widest text-slate-400">Select Role</li>
            <li><button onClick={() => updateRole("admin")} className="font-bold text-rose-600">Admin</button></li>
            <li><button onClick={() => updateRole("task creator")} className="font-bold text-indigo-600">Task Creator</button></li>
            <li><button onClick={() => updateRole("worker")} className="font-bold text-emerald-600">Worker</button></li>
          </ul>
        </div>
      </td>

      {/* Delete Action */}
      <td className="text-right">
        <button
          onClick={handleDelete}
          className="btn btn-ghost btn-circle text-rose-500 hover:bg-rose-50 transition-all"
          title="Delete User"
        >
          <FaTrashAlt size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ManageUserTable;