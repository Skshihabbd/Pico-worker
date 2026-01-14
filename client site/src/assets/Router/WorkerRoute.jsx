import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks2/useAxiosSecure";

const WorkerRoute = ({ children }) => {
  const { users, loader } = useAuth();

  //   const location = useLocation();

  const axiosPublic = useAxiosSecure();
  //   const  data= axiosPublic.get(`user?email=${users.email}`)

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${users.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-svh flex justify-center items-center w-full">
        <div className="animate-pulse flex space-x-4 p-4 border rounded-xl shadow-sm bg-white max-w-md w-full">
          <div className="rounded-full bg-gray-300 h-12 w-12" />
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (users && user.role === "worker") {
    console.log(user.role);
    return children;
  } else {
    return <Navigate to={"/login"} replace></Navigate>;
  }
};

export default WorkerRoute;
