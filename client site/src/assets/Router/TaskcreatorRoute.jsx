/* eslint-disable no-unused-vars */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks2/useAxiosPublic";


const TaskcreatorRoute = ({ children }) => {
  const { users, loader } = useAuth();

  const location = useLocation();

  const axiosPublic =useAxiosPublic()
  //   const  data= axiosPublic.get(`user?email=${users.email}`)

  const { data: user = {},isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${users.email}`);
      return res.data;
    },
  });

  if(isLoading){

    return(
  
      <div className="h-svh flex justify-center items-center w-full">
       <span className="loading loading-bars loading-xs"></span>
<span className="loading loading-bars loading-sm"></span>
<span className="loading loading-bars loading-md"></span>
<span className="loading loading-bars loading-lg"></span>
      </div>
  )
  } 

  console.log(user);

  if (users && user.role === "task creator") {
    return children;
  }
  return <Navigate to={"/login"} replace></Navigate>;
};

export default TaskcreatorRoute;
