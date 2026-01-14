import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUserCircle, FaSignOutAlt, FaThLarge, FaCoins } from "react-icons/fa";

const NavbarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { users, logOut } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* ===== Main Glassmorphism Navbar ===== */}
      <div className="bg-gradient-to-r from-[#1f5752]/95 to-[#2CC0A5]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 shadow-2xl shadow-teal-900/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all duration-300">
              <span className="text-[#1f5752] font-black text-2xl tracking-tighter">P</span>
            </div>
            <p className="text-xl font-black tracking-tight text-white">
              Pico<span className="text-teal-200">-Worker</span>
            </p>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs font-bold uppercase tracking-[0.15em] transition-all hover:text-teal-200 ${
                      isActive ? "text-teal-200 border-b-2 border-teal-200 pb-1" : "text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-5">
            {users ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 p-1.5 pr-4 rounded-full border border-white/20 transition-all active:scale-95"
                >
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 shadow-inner">
                    <FaUserCircle size={24} />
                  </div>
                  <div className="text-left hidden sm:block leading-none">
                    <p className="text-white text-[10px] font-bold uppercase opacity-70">Welcome</p>
                    <p className="text-white text-xs font-black">{users.displayName?.split(" ")[0] || "Worker"}</p>
                  </div>
                </button>

                {/* Elegant Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 p-2 animate-fadeIn overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Status</p>
                        <p className="text-xs font-bold text-teal-600 flex items-center gap-1 mt-1">
                            <FaCoins size={10} /> Verified Earner
                        </p>
                    </div>
                    <Link 
                        to="/dashboard" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 p-3 text-slate-600 hover:bg-teal-50 rounded-xl transition-all font-bold text-sm"
                    >
                      <FaThLarge className="text-teal-500" /> Dashboard
                    </Link>
                    <button 
                      onClick={logOut}
                      className="w-full flex items-center gap-3 p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm mt-1"
                    >
                      <FaSignOutAlt /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/register" 
                className="hidden lg:flex px-8 py-2.5 bg-white text-[#1f5752] font-black rounded-full text-xs tracking-widest hover:bg-teal-50 transition-all shadow-xl shadow-[#1f5752]/20 uppercase"
              >
                Join Now
              </Link>
            )}

            {/* Mobile Burger Menu Icon */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Sidebar (Mobile View) ===== */}
      <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className={`fixed top-0 left-0 w-[280px] h-full bg-white p-8 shadow-2xl transition-transform duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-12">
             <div className="text-2xl font-black text-slate-800 tracking-tight">Pico<span className="text-teal-600">-W</span></div>
             <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-lg text-slate-500"><HiX size={20} /></button>
          </div>
          
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  onClick={() => setIsMenuOpen(false)} 
                  to={link.path} 
                  className="text-slate-500 text-lg font-bold block hover:text-teal-600 transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {users && (
                 <li className="pt-4 border-t border-slate-100">
                    <Link onClick={() => setIsMenuOpen(false)} to="/dashboard" className="text-teal-600 text-lg font-bold block">My Dashboard</Link>
                 </li>
            )}
            {!users && (
              <li className="pt-6">
                <Link onClick={() => setIsMenuOpen(false)} to="/register" className="w-full text-center block py-4 bg-teal-600 text-white rounded-2xl font-black shadow-lg shadow-teal-200 transition-transform active:scale-95 uppercase text-xs tracking-widest">Start Earning</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMenu;