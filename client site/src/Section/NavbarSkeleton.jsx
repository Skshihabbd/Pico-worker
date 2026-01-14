
const NavbarSkeleton = () => {
     return (
   <div className="h-screen w-full flex justify-center items-center bg-fuchsia-300">
    <img  className="animate-spin w-16" src="loading.png" alt="" />
   </div>
  );

};

export default NavbarSkeleton;