import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navber = () => {
  const { users, logOut } = useAuth();
  const navlink = (
    <>
      {users ? (
        <>
          <ul className="flex lg:flex-row flex-col justify-between items-center text-black space-y-1 md:space-y-0 ">
            <Link to={"/dashboard"}>
              <li className=" hover:text-white hover:bg-[#188A46] p-4">
                Dashboard
              </li>
            </Link>
            <li className=" hover:text-white hover:bg-[#188A46] p-4">
              <Link to={"/profile"}>User profile</Link>
            </li>
            <li className=" hover:text-white hover:bg-[#188A46] p-4">
              Available coin{}
            </li>
            <li className=" hover:text-white hover:bg-[#188A46] p-4">
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <div className="lg:flex lg:gap-5 text-2xl">
            <Link to={"/login"}>
              <li className=" hover:text-white hover:bg-[#188A46] p-4">
                Login
              </li>
            </Link>
            <Link to={"/register"}>
              <li className=" hover:text-white hover:bg-[#188A46] p-4">
                Registration
              </li>
            </Link>
          </div>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-green-600">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="  menu menu-sm dropdown-content mt-3 z-10 p-2 w-40   border-2   shadow bg-white bg-opacity-75 rounded-box   "
          >
            {navlink}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Link to={"/"}>Pico Worker</Link>
        </a>
      </div>
      <div className="navbar-center hidden  lg:flex">
        <ul className=" menu-horizontal px-1">{navlink}</ul>
      </div>
      {users ? (
        <ul>
          <li>
            <Link>
              <img
                className="w-16 h-16 ml-12 lg:ml-24 rounded-full"
                src={users?.photoURL}
                alt=""
              />
            </Link>
          </li>
        </ul>
      ) : (
        <li className="ml-10 text-lg font-semibold text-white  hover:bg-[#188A46] p-4">
          <a href="https://youtu.be/eQzqfSGuEWk?t=2" target="_blank">
            Watch demo
          </a>
        </li>
      )}
    </div>
  );
};

export default Navber;
