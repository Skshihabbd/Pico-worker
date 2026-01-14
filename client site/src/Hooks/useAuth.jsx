import { useContext } from "react";
import { authContext } from "../AuthInfo/AuthProvider";

const useAuth = () => {
    const auth=useContext(authContext)
    return auth;
};

export default useAuth;