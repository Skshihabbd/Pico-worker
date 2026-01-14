import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "./SocialLogin";
import { RiLoader2Line } from "react-icons/ri";

// import Footer from "../../sharedcomponent/footer/Footer";
const Login = () => {
  const { SignIn, users, loader, setLoader } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const [success, setSuccess] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);
    SignIn(email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(toast("login successfull"));

        reset();
        navigate(location?.state ? location.state : "/");
      })
      .catch((errores) => {
        console.log(errores.message);
        setError(toast("user Information is wrong"));
        setLoader(false);
      });
  };
  return (
    <div className="  w-full h-screen roboto bg-gradient-to-r from-[#080807] via-[#7784b1]
    to-[#000000] py-10 flex items-center justify-center relative">
      {/* Optional: Helmet */}
      {/* <Helmet><title>realstate | login</title></Helmet> */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-0"></div>
      {/* Glassmorphism Login Box */}
      <div className="lg:w-1/4 w-11/12 mx-auto my-8 bg-white/10 backdrop-blur-md shadow-xl rounded-xl border border-white/20">
        <div className="w-full">
          <SocialLogin />
        </div>
        <h1 className="text-center my-5 text-white font-bold roboto">
          Login your account
        </h1>
        <hr className="w-5/6 mx-auto mb-6 border-white/30" />
        <div className="px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-16">
              <label className="text-white roboto">Email</label>
              <br />
              <input
                className="w-full text-white bg-opacity-0 bg-white placeholder:text-white text-black mb-1 h-10 outline-none border-2 border-white rounded-sm px-2 placeholder:text-sm"
                type="email"
                name="email"
                required
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-white">This field is required</span>
              )}
            </div>
            <br />
            <label htmlFor="passcode" className="text-white">
              Password
            </label>
            <br />
            <div className="h-16">
              <input
                className="w-full bg-opacity-0 bg-white placeholder:text-white text-white mb-1 h-10 outline-none border-2 border-white rounded-sm px-2 placeholder:text-sm"
                type="password"
                name="password"
                id="passcode"
                required
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-white">This field is required</span>
              )}
              <p className="text-red-400">{error}</p>
            </div>

            <button
              disabled={loader ||users}
              className="w-full py-3 my-2  bg-green-600 text-white roboto"
            >
              {loader ? (
                <RiLoader2Line className="animate-spin mx-auto text-xl" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          {users ? (
            <p className="text-center text-green-500 pb-5 roboto">{success || 'successfully login'}</p>
          ) : (
            <p className="text-center text-white pb-5 roboto">
              Dont have an account
              <Link to="/register" className="text-green-500 ml-3">
                Register
              </Link>
            </p>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
