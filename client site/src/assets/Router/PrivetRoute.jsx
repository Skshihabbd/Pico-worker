import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const PrivetRoute = ({children}) => {

    const { users, loader } = useAuth()
    const location =useLocation()
    
  
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
   else if (users?.email) {
      return children;
    }
    else{
      return <Navigate state={location.pathname}  to={"/login"} replace></Navigate>;
    }
};

export default PrivetRoute;