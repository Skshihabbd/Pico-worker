import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks2/useAxiosPublic";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn,users ,loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigation = useNavigate();

  const handleSocialLogin = async (sociallogin) => {
    const role = "worker";
    let Coin = 10;
  
    await sociallogin().then((result) => {
      console.log(result.user);
      if (result.user) {
        navigation(location?.state ? location.state : "/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfull",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(result.user);

        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          role: role,
          coin: Coin,
          image: result?.user?.photoURL,
        };
        console.log(userData);
        axiosPublic.post("/user", userData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "data send to server",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  return (
    <div className="flex flex-row gap-10 justify-center items-center pt-2">
      <button
      disabled={loading || users}
        onClick={() => handleSocialLogin(googleSignIn)}
        className=""
      >
        <img className="w-10" src="google.png" alt="" />
      </button>
      <button
      disabled={loading || users}
        onClick={() => handleSocialLogin(githubSignIn)}
        className=""
      >
         <img className="w-10" src="github.png" alt="" />
      </button>
    </div>
  );
};

export default SocialLogin;
