import { Link, NavLink, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
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

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition-all
     ${
       isActive
         ? "bg-white text-indigo-700 shadow translate-x-1"
         : "text-indigo-100 hover:bg-white/10 hover:text-white"
     }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Top Navbar ===== */}
      <header className="fixed top-0 inset-x-0 h-16 z-40">
        <DashBoardNavbar />
      </header>

      {/* ===== Mobile Menu Button ===== */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md shadow"
      >
        <HiMenuAlt2 size={22} />
      </button>

      {/* ===== Overlay ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-50 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-indigo-500/30">
          <Link
            to="/"
            className="text-xl font-bold italic tracking-tight"
          >
            Pico<span className="text-yellow-400">Worker</span>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded hover:bg-white/10"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Role */}
        <div className="px-6 py-4">
          <p className="text-xs uppercase tracking-widest text-indigo-300 font-semibold">
            {alluser.role || "Dashboard"} Menu
          </p>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
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
      <main className="pt-16 lg:ml-72 min-h-screen">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
