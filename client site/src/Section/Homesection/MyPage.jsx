import { useQuery } from "@tanstack/react-query";
import { FaUsersCog, FaSearch } from "react-icons/fa";

import ManageUserTable from "../../Dashboard/ManageUserTable";
import useAxiosSecure from "../../Hooks2/useAxiosSecure";

const MyPage = () => {
     const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usere?role=worker");
      return res.data;
    },
  });
    return (
         <section className="p-4 lg:p-8 bg-slate-50 min-h-screen">
      
      {/* ===== Header ===== */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-black text-slate-800">
            <FaUsersCog className="text-indigo-600" />
            Manage Users
          </h1>
          <p className="mt-1 text-sm italic font-medium text-slate-400">
            Total {users.length} workers found
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* ===== Card ===== */}
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

        {/* ===== Scroll Area ===== */}
        <div className="overflow-x-auto">
          <table className="table-fixed min-w-[1000px] w-full border-separate border-spacing-y-0">
            
            {/* Header */}
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr>
                <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  #
                </th>
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                  User Profile
                </th>
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Contact & Coins
                </th>
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Role Action
                </th>
                <th className="py-4 pr-8 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Termination
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="loading loading-spinner loading-md text-indigo-600" />
                      <span className="italic font-bold text-slate-500">
                        Loading users...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : users.length ? (
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
                  <td
                    colSpan={5}
                    className="py-24 text-center text-slate-400 font-black uppercase opacity-30"
                  >
                    No users found
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

export default MyPage;