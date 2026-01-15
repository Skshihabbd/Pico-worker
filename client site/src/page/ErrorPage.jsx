import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft, HiOutlineExclamationCircle } from "react-icons/hi";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans px-6">
      {/* Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Animated Icon Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
            <HiOutlineExclamationCircle className="text-[120px] text-red-500 relative z-10 animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-8xl font-black text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] select-none">
          404
        </h1>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Oops! Page Not Found
        </h2>
        
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all duration-300 group"
          >
            <HiOutlineArrowNarrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <Link
            to="/"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/20 active:scale-95"
          >
            Back to Home
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            Need help? <Link to="/contact" className="text-emerald-400 hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;