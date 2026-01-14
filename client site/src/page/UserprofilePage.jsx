import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
const UserprofilePage = () => {
  const { users, updateUser } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const axiosSecure=useAxiosSecure()

  const openModal = () => {
    setIsOpen(true);
  };

  const formData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const url = form.url.value;
    console.log(form);
    console.log(url, name);
    const userInfo={
        name:name ,
        image:url,

    }
    console.log(userInfo)
    try {
       await updateUser(name, url);

const result=await axiosSecure.patch(`/infoupdate?email=${users?.email}`,userInfo)
if(result){
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsOpen(false);
}

    
    } catch {
      (err) => {
        console.log(err);
      };
    }
  };
  return (
    <div className="h-screen text-2xl space-y-4 flex flex-col-reverse justify-center items-center">
      <button
        onClick={openModal}
        className="btn btn-outline btn-success w-6/12 mt-12"
      >
        Update user
      </button>
      <p>Email:{users?.email}</p>
      <p>Name:{users?.displayName}</p>
      <p>
        <img className="w-24 h-24 rounded-full" src={users?.photoURL} alt="" />
      </p>
      <hr className=" w-10 " />
      <h1>User Profile Information</h1>

      <div>
        <Dialog
          className="relative bg-black z-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed  inset-0 flex w-screen items-center justify-center  ">
            <Dialog.Panel className="bg-black w-6/12 h-4/6">
              <Dialog.Title className="text-white text-center text-4xl">
                Update Profile
              </Dialog.Title>
              <Dialog.Description className="text-white mb-6 text-center mt-4 ">
                This will Update your Name And Profile Picture
              </Dialog.Description>

              <form
                onSubmit={formData}
                className="flex gap-12 flex-col justify-center items-center"
              >
                <input
                  className="h-12 w-9/12 outline-0 bg-orange-700 pl text-black placeholder-slate-950 "
                  type="text"
                  placeholder="input Your Name"
                  name="name"
                  required
                />
                <input
                  className="h-12 w-9/12 outline-0  "
                  type="url"
                  name="url"
                  placeholder="input Your Photo-Url"
                  required
                />
                <button type="submit" className="btn w-6/12 btn-secondary">
                  Deactivate
                </button>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserprofilePage;
