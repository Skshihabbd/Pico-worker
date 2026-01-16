import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle, FaCoins, FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks2/useAxiosSecure";

const DashBoardNavbar = () => {
  const { users, logOut } = useAuth(); // Assuming logOut exists in useAuth
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const { data: user = {} } = useQuery({
    queryKey: ["user", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${users.email}`);
      return res.data;
    },
  });

  // Modal-er baire click korle bondho hobar logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Logo Section */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-md shadow-indigo-100">
                <FaCoins className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent hidden sm:block">
                PicoWorker
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Coins Display */}
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full shadow-sm group hover:bg-yellow-100 transition-colors">
              <div className="bg-yellow-400 p-1 rounded-full animate-pulse group-hover:animate-none">
                <FaCoins className="text-white text-[10px]" />
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
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white items-center justify-center font-bold">
                    {user.notifications.length}
                  </span>
                </span>
              )}
            </button>

            <div className="h-8 w-[1px] bg-gray-200 hidden xs:block"></div>

            {/* Profile Section with Modal */}
            <div className="relative" ref={modalRef}>
              <div 
                className="flex items-center gap-3 pl-2 cursor-pointer group"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <div className="hidden md:flex flex-col items-end select-none">
                  <span className="text-sm font-bold text-gray-800 leading-none mb-1 group-hover:text-indigo-600 transition-colors">
                    {user?.name || "User"}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-semibold uppercase tracking-wider">
                    {user?.role || "Member"}
                  </span>
                </div>

                <div className="relative">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="profile"
                      className={`w-10 h-10 rounded-full object-cover border-2 transition-all shadow-sm ${
                        isModalOpen ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-indigo-100 group-hover:border-indigo-500'
                      }`}
                    />
                  ) : (
                    <FaUserCircle className="text-4xl text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  )}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </div>

              {/* ===== Mini Modal (Dropdown) ===== */}
              {isModalOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="p-4 border-b border-gray-50 bg-slate-50/50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                    <p className="text-sm font-bold text-gray-700 truncate">{users?.email}</p>
                  </div>
                  
                  <div className="p-2">
                    <Link 
                      to="/" 
                      onClick={() => setIsModalOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                    >
                      <FaHome className="text-lg opacity-70" />
                      Home Page
                    </Link>
                    
                    <Link 
                      to="/profile" 
                      onClick={() => setIsModalOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                    >
                      <FaUser className="text-lg opacity-70" />
                      View Profile
                    </Link>
                  </div>

                  <div className="p-2 border-t border-gray-50">
                    <button 
                      onClick={() => {
                        logOut();
                        setIsModalOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <FaSignOutAlt className="text-lg opacity-70" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardNavbar;