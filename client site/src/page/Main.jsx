import { Outlet } from "react-router-dom";
import NavbarMenu from "../Section/NavbarMenu";
// import Navber from "../Section/Navber";
// import Footer from "../Section/Footer";

const Main = () => {
  return (
    <div>
      {/* topbar */}
      <div className="bg-white w-full h-[50px] flex justify-center items-center">
        <p className="text-black md:text-md md:font-bold text-center roboto ">
          Mega Bonus start from today 20% Per-work
        </p>
      </div>
      <div className="sticky top-0 z-40">
        <NavbarMenu />
      </div>

      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Main;
