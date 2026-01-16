import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsersCog, FaSearch, FaFilter } from "react-icons/fa";
import ManageUserTable from "./ManageUserTable";
import useAxiosSecure from "../Hooks2/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usere?role=worker"); // Check spelling: /users?
      return res.data;
    },
  });

  // Filter functionality
  const filteredUsers = users.filter((user) =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-4 lg:p-10 bg-[#f8fafc] min-h-screen">
      
      {/* ===== Header Section ===== */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            Admin Dashboard
          </div>
          <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
              <FaUsersCog className="text-white text-2xl" />
            </div>
            Manage Users
          </h1>
          <p className="text-slate-500 font-medium">
            You have <span className="text-indigo-600 font-bold">{users.length}</span> total workers registered.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-2xl border-none bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm ring-1 ring-slate-200 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:shadow-md"
          />
        </div>
      </div>

      {/* ===== Table Container ===== */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        {/* Table Controls (Optional) */}
        <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <FaFilter className="text-[10px]" /> User List
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/80 backdrop-blur-md">
                <th className="py-5 px-6 text-center text-[11px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100">
                  #
                </th>
                <th className="py-5 px-4 text-left text-[11px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100">
                  User Profile
                </th>
                <th className="py-5 px-4 text-left text-[11px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100">
                  Contact & Coins
                </th>
                <th className="py-5 px-4 text-left text-[11px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100">
                  Role Action
                </th>
                <th className="py-5 px-8 text-right text-[11px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100">
                  Termination
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <span className="loading loading-ring loading-lg text-indigo-600" />
                      <span className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-tighter">
                        Fetching Data...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length ? (
                filteredUsers.map((info, idx) => (
                  <ManageUserTable
                    key={info._id}
                    idx={idx}
                    info={info}
                    fetch={refetch}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-32 text-center">
                    <div className="max-w-xs mx-auto opacity-40 grayscale">
                      <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" alt="no-data" className="w-20 mx-auto mb-4" />
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        No workers match your search
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;