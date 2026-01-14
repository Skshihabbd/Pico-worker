import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle, FaCoins } from "react-icons/fa"; // Added Coin Icon

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks2/useAxiosSecure";

const DashBoardNavbar = () => {
  const { users } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: user = {} } = useQuery({
    queryKey: ["user", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${users.email}`);
      return res.data;
    },
  });

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Logo Section */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FaCoins className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent hidden sm:block">
                PicoWorker
              </span>
            </Link>
          </div>

          {/* Right Section: User Info, Coins, Notifications */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Coins/Balance Display */}
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full shadow-sm group hover:bg-yellow-100 transition-colors">
              <div className="bg-yellow-400 p-1 rounded-full animate-pulse group-hover:animate-none">
                <FaCoins className="text-white text-xs" />
              </div>
              <span className="text-sm font-bold text-yellow-700">
                {user?.coins || 0} <span className="hidden xs:inline text-xs font-medium">Coins</span>
              </span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
              <IoIosNotifications className="text-2xl" />
              {user?.notifications?.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white items-center justify-center">
                    {user.notifications.length}
                  </span>
                </span>
              )}
            </button>

            {/* Vertical Divider */}
            <div className="h-8 w-[1px] bg-gray-200 hidden xs:block"></div>

            {/* Profile Section */}
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-gray-800 leading-none mb-1">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-semibold uppercase tracking-wider">
                  {user?.role || "Member"}
                </span>
              </div>

              <div className="relative group cursor-pointer">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 group-hover:border-indigo-500 transition-all shadow-sm"
                  />
                ) : (
                  <FaUserCircle className="text-4xl text-gray-400 group-hover:text-indigo-500 transition-colors" />
                )}
                {/* Online Status Dot */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardNavbar;