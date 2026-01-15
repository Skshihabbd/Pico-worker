import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoEyeOff, IoEye, IoCloudUploadOutline } from "react-icons/io5";
import { RiLoader4Line } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks2/useAxiosPublic";
import SocialLogin from "./SocialLogin";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { SignUp, updateUser, setLoader, users } = useAuth();
  const [ setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name);
      setImagePreview(URL.createObjectURL(file));
      setValue("photourl", e.target.files, { shouldValidate: true });
    }
  };

  const onSubmit = async (datas) => {
    const { email, password, UserName, role, photourl } = datas;
    const formData = new FormData();
    formData.append("image", photourl[0]);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      if (data.success) {
        const photoURL = data.data.display_url;
        await SignUp(email, password);
        await updateUser(UserName, photoURL);

        const userData = {
          name: UserName,
          email,
          role,
          coin: role === "worker" ? 10 : 50,
          image: photoURL,
        };

        const res = await axiosPublic.post("/user", userData);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Welcome aboard!",
            text: "Your account has been created successfully.",
            background: "#1e293b",
            color: "#fff",
            confirmButtonColor: "#10b981",
          });
          reset();
          setImagePreview(null);
          navigate(location?.state || "/");
        }
      }
    } catch (err) {
      setError(err.message);
      setLoader(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] relative overflow-hidden py-12 px-4">
      {/* Elegance Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
        <div className="p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-slate-400 mt-2">Join our community and start earning coins</p>
          </div>

          <SocialLogin />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#161f33] px-4 text-slate-500">Or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <input
                  {...register("UserName", { required: "Name is required" })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                  placeholder="John Doe"
                />
                {errors.UserName && <p className="text-xs text-red-400 ml-1">{errors.UserName.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>}
              </div>

              {/* Role Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">I want to be a...</label>
                <select
                  {...register("role", { required: "Please select a role" })}
                  className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled selected>Select Role</option>
                  <option value="worker">Worker (Earn Coins)</option>
                  <option value="task creator">Task Creator (Post Tasks)</option>
                </select>
                {errors.role && <p className="text-xs text-red-400 ml-1">{errors.role.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { 
                        required: "Required",
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                            message: "Uppercase, Lowercase, & Number required"
                        }
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-[10px] text-red-400 leading-tight">{errors.password.message}</p>}
              </div>
            </div>

            {/* Photo Upload Area */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Profile Picture</label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center gap-3 bg-white/5 border-2 border-dashed border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all rounded-xl p-4 cursor-pointer group">
                  <IoCloudUploadOutline className="text-slate-400 group-hover:text-emerald-400" size={24} />
                  <span className="text-slate-400 group-hover:text-emerald-400 text-sm font-medium">
                    {fileName || "Click to upload image"}
                  </span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
                {imagePreview && (
                  <div className="w-16 h-16 rounded-xl border-2 border-emerald-500/50 overflow-hidden shrink-0">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  {...register("checkbook", { required: true })}
                  className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-white/5 checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer"
                />
                <svg className="absolute w-3.5 h-3.5 hidden peer-checked:block left-[3px] text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">I accept the Terms & Conditions</span>
            </label>

            <button
              disabled={loading || users}
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center"
            >
              {loading ? <RiLoader4Line className="animate-spin text-2xl" /> : "Create My Account"}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;