import { useQuery } from "@tanstack/react-query";
import ManageUserTable from "./ManageUserTable";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaUsersCog, FaSearch } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usere?role=worker");
      return res.data;
    },
  });

  return (
    <div className="p-4 lg:p-8 bg-slate-50 min-h-screen min-w-max">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
            <FaUsersCog className="text-indigo-600" /> Manage Users
          </h2>
          <p className="text-slate-400 text-sm font-medium italic mt-1">
            Total {users.length} workers found.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search by email..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Table Container - Overflow Control Eikhane thakte hobe */}
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 ">
        <div className="overflow-x-auto w-full"> 
          <table className="table  border-separate border-spacing-y-0"> 
            <thead className="bg-slate-50/80">
              <tr className="border-none">
                <th className="py-5 text-center text-slate-400 uppercase text-[10px] tracking-widest font-black">#</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">User Profile</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Contact & Coins</th>
                <th className="py-5 text-slate-400 uppercase text-[10px] tracking-widest font-black">Role Action</th>
                <th className="py-5 text-right text-slate-400 uppercase text-[10px] tracking-widest font-black pr-10">Termination</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <span className="loading loading-spinner loading-md text-indigo-600"></span>
                      <span className="text-slate-500 font-bold italic">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((info, idx) => (
                  <ManageUserTable
                    key={info._id}
                    idx={idx}
                    info={info}
                    fetch={refetch}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-slate-400 font-black opacity-30 uppercase">
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;