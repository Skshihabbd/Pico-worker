import { Link, NavLink, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiMenuAlt2 } from "react-icons/hi"; // Modern Icon
import { IoMdClose } from "react-icons/io";   // Modern Icon

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { useState } from "react";
import DashBoardNavbar from "./DashBoardNavbar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { users } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: alluser = {} } = useQuery({
    queryKey: ["user", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${users.email}`);
      return res.data;
    },
  });

  // Improved Nav Style with Active Indicator
  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 group
     ${
       isActive
         ? "bg-white text-indigo-700 shadow-lg translate-x-2"
         : "text-indigo-100 hover:bg-white/10 hover:text-white"
     }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ===== Mobile Menu Button (Fixed at Top Left) ===== */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="p-2 bg-indigo-600 text-white rounded-md shadow-lg focus:outline-none"
        >
          <HiMenuAlt2 size={24} />
        </button>
      </div>

      {/* ===== Top Navbar ===== */}
      <header className="fixed top-0 left-0 w-full z-30">
        <DashBoardNavbar />
      </header>

      {/* ===== Overlay (sm + md only) ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Sidebar Header & Close Button */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-indigo-500/30">
          <h2 className="text-2xl font-bold tracking-tight italic">
            <Link to="/">Task<span className="text-yellow-400">Flow</span></Link>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* User Role Info */}
        <div className="px-6 py-4">
           <p className="text-xs uppercase tracking-widest text-indigo-300 font-semibold mb-4">
             {alluser.role || 'Dashboard'} Menu
           </p>
        </div>

        {/* Menu Items */}
        <nav className="px-4 space-y-2">
          {alluser.role === "admin" && (
            <>
              <NavLink to="/dashboard/adminhome" onClick={() => setOpen(false)} className={navStyle}>Admin Home</NavLink>
              <NavLink to="/dashboard/manageuser" onClick={() => setOpen(false)} className={navStyle}>Manage Users</NavLink>
              <NavLink to="/dashboard/managetask" onClick={() => setOpen(false)} className={navStyle}>Manage Task</NavLink>
            </>
          )}

          {alluser.role === "task creator" && (
            <>
              <NavLink to="/dashboard/creatorhome" onClick={() => setOpen(false)} className={navStyle}>Creator Home</NavLink>
              <NavLink to="/dashboard/addnewtask" onClick={() => setOpen(false)} className={navStyle}>Add New Task</NavLink>
              <NavLink to="/dashboard/mytask" onClick={() => setOpen(false)} className={navStyle}>My Tasks</NavLink>
              <NavLink to="/dashboard/purchasecoin" onClick={() => setOpen(false)} className={navStyle}>Purchase Coin</NavLink>
              <NavLink to="/dashboard/paymenthistory" onClick={() => setOpen(false)} className={navStyle}>Payment History</NavLink>
            </>
          )}

          {alluser.role === "worker" && (
            <>
              <NavLink to="/dashboard/workerhome" onClick={() => setOpen(false)} className={navStyle}>Worker Home</NavLink>
              <NavLink to="/dashboard/tasklist" onClick={() => setOpen(false)} className={navStyle}>Task List</NavLink>
              <NavLink to="/dashboard/mysubmission" onClick={() => setOpen(false)} className={navStyle}>My Submissions</NavLink>
              <NavLink to="/dashboard/withdraw" onClick={() => setOpen(false)} className={navStyle}>Withdrawals</NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 transition-all duration-300 lg:ml-72 min-h-screen">
        {/* Padding to avoid overlap with fixed navbar */}
        <div className="pt-10  lg:p-10">
          <div className=" rounded-2xl shadow-sm min-h-[80vh]  lg:pt-10">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;