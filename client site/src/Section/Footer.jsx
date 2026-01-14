/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaCcPaypal, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-white/5">
      {/* ===== Line 1: Main Content ===== */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter">
              Pico<span className="text-teal-400">-Worker</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              The world's leading micro-tasking platform. Earn money by doing simple tasks or grow your business with our global workforce.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors cursor-pointer">
                <MdEmail size={20} />
                <span className="text-sm">support@picoworker.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors cursor-pointer">
                <MdPhoneInTalk size={20} />
                <span className="text-sm">+880 123 456 789</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h3 className="text-lg font-bold mb-6">Platform</h3>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link to="/doctor-list" className="hover:text-teal-400 transition-colors">Find Jobs</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition-colors">Post a Task</Link></li>
              <li><Link to="/blood-donors" className="hover:text-teal-400 transition-colors">Top Earners</Link></li>
              <li><Link to="/clinics" className="hover:text-teal-400 transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link to="/blog" className="hover:text-teal-400 transition-colors">Our Blog</Link></li>
              <li><Link to="/faq" className="hover:text-teal-400 transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Social & Community */}
          <div>
            <h3 className="text-lg font-bold mb-6">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-teal-500 transition-all group">
                <FaFacebook size={20} className="group-hover:scale-110" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-teal-500 transition-all group">
                <FaTwitter size={20} className="group-hover:scale-110" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-teal-500 transition-all group">
                <FaLinkedin size={20} className="group-hover:scale-110" />
              </a>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Global Community</p>
          </div>
        </div>
      </div>

      {/* ===== Line 2: Bottom Bar ===== */}
      <div className="bg-black/40 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium order-2 md:order-1 text-center">
            © 2026 Pico-Worker. All rights reserved. Designed for the Future Workforce.
          </p>
          
          <div className="flex items-center gap-6 order-1 md:order-2 opacity-60 hover:opacity-100 transition-opacity">
            <FaCcPaypal size={35} className="text-blue-400" />
            <FaCcVisa size={35} className="text-white" />
            <FaCcMastercard size={35} className="text-orange-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;