import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import useAxiosPublic from "../Hooks2/useAxiosPublic";
import Swal from "sweetalert2";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { SignUp, updateUser, setLoader,users } = useAuth();
  const [error, setError] = useState(" ");
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imgShortName, setImgShortName] = useState(null);
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
      const fileName = file.name;

      const shortName =
        fileName.length > 5 ? fileName.slice(0, 7) + "..." : fileName;
      setImgShortName(shortName);

      const imageUrl = URL.createObjectURL(file);

      console.log("imageurl", imageUrl);
      setImage(imageUrl);
      setValue("photourl", e.target.files, { shouldValidate: true });
    }
  };

  const onSubmit = async (datas) => {
    const email = datas.email;
    const password = datas.password;
    const name = datas.UserName;
    const image = datas.photourl[0];
    console.log("datas", datas);
    const role = datas.role;
    console.log("image", image);
    const formData = new FormData();
    formData.append("image", image);
    console.log("this is form data", formData);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://api.imgbb.com/1/upload?key=9c8539154be0bafb013ab02d1bbf342b",
        formData
      );
      console.log("data paiche", data.data.display_url);
      if (data) {
        console.log("data paiche", data.data.display_url);
        await SignUp(email, password);
        await updateUser(name, data.data.display_url);

        let Coin = role === "worker" ? 10 : 50;

        const userData = {
          name,
          email,
          role,
          coin: Coin,
          image: data.data.display_url,
        };

        const res = await axiosPublic.post("/user", userData);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account Created",
            showConfirmButton: false,
            timer: 1500,
          });

          reset();
          setImage(null);
          navigate(location?.state ? location.state : "/");
        }

        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoader(false);
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-screen grid place-items-center overflow-auto bg-gradient-to-r from-[#03071e] 
    to-[#d18e8e] w-full"
    >
      <div className="md:w-3/4 lg:w-2/4 mx-auto border border-white/20 h-auto ">
        <div className="flex justify-center">
          <SocialLogin />
        </div>
        <p className="text-white roboto py-1 text-center">Or</p>
        <h1 className="text-center mb-1 text-white roboto py-1">
          Register your account
        </h1>
        <hr className="w-5/6 mx-auto mb-2" />
        <div className="px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex md:flex-row flex-col justify-between flex-wrap 
            w-5/6 mx-auto gap-y-3"
          >
            {/* Name */}
            <div className="md:w-[47%]">
              <label htmlFor="text" className="text-white roboto">
                Your name
              </label>
              <input
                className="w-full text-white roboto bg-opacity-0 bg-white placeholder:text-white text-black mb-1 h-8 outline-none border-[1px] border-white rounded-sm placeholder:text-sm px-2"
                type="text"
                name="name"
                id="texts"
                placeholder="Enter your name"
                {...register("UserName", { required: true })}
              />
              {errors.UserName && (
                <span className="text-green-500 roboto">
                  This field is required
                </span>
              )}
            </div>

            {/* Email */}
            <div className="md:w-[47%]">
              <label htmlFor="email" className="text-white roboto">
                Email
              </label>
              <input
                className="w-full text-white roboto bg-opacity-0 bg-white placeholder:text-white text-black h-8 outline-none border-[1px] border-white rounded-sm px-2 placeholder:text-sm"
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter email"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                onFocus={() => setError("")}
              />
              {errors.email && (
                <span className="text-green-500 roboto">
                  {errors.email.message}
                </span>
              )}
              <p className="text-green-500 roboto">{error}</p>
            </div>

            {/* Image Upload */}
            <div className="w-full flex justify-between items-end">
              <div className={` ${image ? "md:w-[70%]" : "w-full"} `}>
                <div>
                  <label
                    htmlFor="urll"
                    className="block text-white roboto mb-2"
                  >
                    Photo
                  </label>

                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      name="url"
                      onChange={handleImageChange}
                      id="urll"
                      className="peer absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex w-full items-center justify-between px-4 py-2 bg-white/10 border border-white backdrop-blur-md text-white roboto cursor-pointer hover:bg-white/20 transition duration-200">
                      <span className="peer-placeholder-shown:text-white text-sm">
                        {image ? (
                          <p className="text-sm text-white">{imgShortName}</p>
                        ) : (
                          " Upload image (JPG, PNG)"
                        )}
                      </span>
                      <img className="w-5" src="upload.png" alt="" />
                    </div>
                  </div>

                  {errors.photourl && (
                    <span className="text-green-500 roboto mt-1 block">
                      {errors.photourl.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              <div
                className={`h-10 md:h-20 md:w-3/12 border-2 ${
                  image ? "" : "hidden"
                } `}
              >
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full  object-cover rounded"
                />
              </div>
            </div>
            {/* Role */}
            <div className="md:w-[47%]">
              <label htmlFor="urll" className="text-white roboto">
                Role
              </label>
              <select
                className="w-full roboto text-white bg-opacity-0 bg-black placeholder:text-white mb-1 h-8 rounded-full outline-none border-[1px] border-white rounded-sm px-2 placeholder:text-sm"
                {...register("role", { required: "Please select a role" })}
              >
                <option disabled selected value="">
                  Select your role
                </option>
                <option className="text-black" value="worker">
                  Worker
                </option>
                <option className="text-black" value="task creator">
                  Task creator
                </option>
              </select>
              {errors.role && (
                <span className="text-green-500">{errors.role.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="relative md:w-[47%]">
              <label htmlFor="passcode" className="text-white roboto">
                Password
              </label>
              <input
                className="w-full text-white roboto bg-opacity-0 bg-white placeholder:text-white text-black mb-1 h-8 outline-none border-[1px] border-white rounded-sm px-2 placeholder:text-sm"
                type={showPassword ? "text" : "password"}
                name="password"
                id="passcode"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must not exceed 16 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "Password must have at least one uppercase, one lowercase, and one number",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-7 top-8"
              >
                {showPassword ? (
                  <IoEye className="text-white text-lg" />
                ) : (
                  <IoEyeOff className="text-white text-lg" />
                )}
              </button>
              {errors.password && (
                <span className="text-green-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Checkbox */}
            <div className="pt-5">
              <input
                type="checkbox"
                name="checkbox"
                id="check"
                {...register("checkbook", { required: true })}
              />
              <label htmlFor="check" className="text-white mb-4 roboto">
                Accept Term & Conditions
              </label>
              <br />
              {errors.checkbook && (
                <span className="text-green-500 roboto">
                  This field is required
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={loading || users}
              type="submit"
              className="w-full bg-white py-2 my-3 md:mt-3"
            >
              {loading ? (
                <img
                  className="animate-spin w-7 mx-auto"
                  src="loading.png"
                  alt=""
                />
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-white roboto py-3">
            Have an account
            <Link to="/login" className="text-green-500 roboto pl-4">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
