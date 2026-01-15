import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks2/useAxiosPublic";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn, users, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSocialLogin = async (socialProvider) => {
    try {
      const result = await socialProvider();
      
      if (result?.user) {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          role: "worker", // Default role
          coin: 10,
          image: result.user.photoURL,
        };

        // Check/Post user to database
        // eslint-disable-next-line no-unused-vars
        const res = await axiosPublic.post("/user", userData);
        
        // Success Toast
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome!",
          text: "Login successful",
          showConfirmButton: false,
          timer: 1500,
          background: "#1e293b",
          color: "#fff",
        });

        navigate(location?.state || "/");
      }
    } catch (error) {
      console.error("Social Login Error:", error.message);
      // Optional: Handle cancellation or error toast here
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mt-2">
      {/* Google Button */}
      <button
        disabled={loading || users}
        onClick={() => handleSocialLogin(googleSignIn)}
        className="flex items-center justify-center gap-3 w-full sm:w-1/2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
        <span className="text-white text-sm font-medium">Google</span>
      </button>

      {/* GitHub Button */}
      <button
        disabled={loading || users}
        onClick={() => handleSocialLogin(githubSignIn)}
        className="flex items-center justify-center gap-3 w-full sm:w-1/2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaGithub className="text-2xl text-white group-hover:scale-110 transition-transform" />
        <span className="text-white text-sm font-medium">GitHub</span>
      </button>
    </div>
  );
};

export default SocialLogin;