import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks2/useAxiosSecure";


const AdminRouter = ({ children }) => {
  const { users, loader } = useAuth();


  const axiosPublic = useAxiosSecure();
  //   const  data= axiosPublic.get(`user?email=${users.email}`)

  const { data: user = {} ,isLoading } = useQuery({
    queryKey: ["user" ,users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${users.email}`);
      return res.data;
    },
  });

  console.log(user);
  if (loader) {
      return (
        <div className="h-svh flex justify-center items-center w-full">
         <span className="loading loading-bars loading-xs"></span>
<span className="loading loading-bars loading-sm"></span>
<span className="loading loading-bars loading-md"></span>
<span className="loading loading-bars loading-lg"></span>
        </div>

      );
    }

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
    
  if  ( users  && user.role === "admin") {
    return children;
  }
     return <Navigate to={"/login"} replace></Navigate>;
};

export default AdminRouter;
