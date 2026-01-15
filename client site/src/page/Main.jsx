import { Outlet } from "react-router-dom";
import NavbarMenu from "../Section/NavbarMenu";
// import Navber from "../Section/Navber";
// import Footer from "../Section/Footer";

const Main = () => {
  return (
    <div>
      {/* topbar */}
     <div className="relative w-full overflow-hidden bg-gradient-to-r from-black via-emerald-500 to-blue-600 py-3 shadow-lg">
  {/* Decorative Light Glow */}
  <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
  
  <div className="relative flex items-center">
    {/* Scrolling Container */}
    <div className="flex animate-marquee whitespace-nowrap items-center">
      <p className="text-white text-sm md:text-base font-bold uppercase tracking-wider px-4 flex items-center gap-2">
        <span className="bg-white text-emerald-600 px-2 py-0.5 rounded-md text-[10px] animate-pulse">New</span>
        Mega Bonus start from today! Enjoy 20% Extra coins per work
        <span className="mx-10 opacity-50">•</span>
      </p>
      
      {/* Duplicate for seamless loop */}
      <p className="text-white text-sm md:text-base font-bold uppercase tracking-wider px-4 flex items-center gap-2">
        <span className="bg-white text-emerald-600 px-2 py-0.5 rounded-md text-[10px] animate-pulse">New</span>
        Mega Bonus start from today! Enjoy 20% Extra coins per work
        <span className="mx-10 opacity-50">•</span>
      </p>
    </div>
  </div>

  {/* Styles for the animation */}
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 25s linear infinite;
    }
  `}} />
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
