/* eslint-disable react/no-unescaped-entities */

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { RiLoader2Line } from "react-icons/ri";
import useAuth from "../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { SignIn, users, loader, setLoader } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await SignIn(data.email, data.password);
      toast.success("Welcome back!");
      reset();
      navigate(location?.state || "/");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 mt-2 text-sm">Please enter your details to sign in</p>
          </div>

          {/* Social Login Section */}
          <div className="mb-6">
            <SocialLogin />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1e293b] px-2 text-slate-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                placeholder="name@company.com"
              />
              {errors.email && <span className="text-xs text-red-400 mt-1 ml-1">{errors.email.message}</span>}
            </div>

            <div>
              <div className="flex justify-between mb-1.5 ml-1">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <Link to="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Forgot password?</Link>
              </div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                placeholder="••••••••"
              />
              {errors.password && <span className="text-xs text-red-400 mt-1 ml-1">{errors.password.message}</span>}
            </div>

            <button
              disabled={loader || users}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-900/20 flex items-center justify-center mt-4"
            >
              {loader ? <RiLoader2Line className="animate-spin text-2xl" /> : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-400 mt-8 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-400 font-medium hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
      
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default Login;