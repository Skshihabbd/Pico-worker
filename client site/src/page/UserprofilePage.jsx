import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Swal from "sweetalert2";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { RiEditLine } from "react-icons/ri";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks2/useAxiosSecure";

const UserprofilePage = () => {
  const { users, updateUser } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const url = form.url.value;
    const userInfo = { name, image: url };

    try {
      await updateUser(name, url);
      const result = await axiosSecure.patch(`/infoupdate?email=${users?.email}`, userInfo);
      
      if (result.data) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          background: "#fff",
          color: "#1e293b",
          confirmButtonColor: "#10b981",
          timer: 1500,
        });
        closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-10 relative overflow-hidden font-sans">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-50"></div>

      {/* Main Horizontal Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row items-stretch">
        
        {/* Left Side: Image Section */}
        <div className="md:w-2/5 bg-slate-50/50 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-slate-100">
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-400 blur-2xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img
              className="w-40 h-40 md:w-56 md:h-56 rounded-3xl object-cover border-8 border-white shadow-2xl relative z-10 rotate-3 group-hover:rotate-0 transition-transform duration-500"
              src={users?.photoURL || "https://via.placeholder.com/200"}
              alt="Profile"
            />
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none uppercase">
              {users?.displayName?.split(" ")[0] || "User"}
            </h2>
            <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full tracking-widest">
              Verified Member
            </span>
          </div>
        </div>

        {/* Right Side: Details Section */}
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Personal Information</h1>
            <p className="text-slate-500 mt-1">Details about your account and identity</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-10">
            {/* Info Item 1 */}
            <div className="flex items-center gap-5 p-4 bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:bg-white hover:shadow-sm">
              <div className="h-12 w-12 bg-white flex items-center justify-center rounded-xl shadow-sm text-emerald-500">
                <HiOutlineUser className="text-2xl" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Full Name</p>
                <p className="text-slate-700 font-semibold text-lg">{users?.displayName || "Not Set"}</p>
              </div>
            </div>

            {/* Info Item 2 */}
            <div className="flex items-center gap-5 p-4 bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:bg-white hover:shadow-sm">
              <div className="h-12 w-12 bg-white flex items-center justify-center rounded-xl shadow-sm text-blue-500">
                <HiOutlineMail className="text-2xl" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email Address</p>
                <p className="text-slate-700 font-semibold text-lg">{users?.email}</p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="w-fit flex items-center gap-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-200 group active:scale-95"
          >
            <RiEditLine className="text-xl group-hover:rotate-12 transition-transform" /> 
            Update Profile Details
          </button>
        </div>
      </div>

      {/* Modern Modal (Light Mode) */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white p-10 shadow-2xl transition-all border border-slate-100">
                  <Dialog.Title className="text-2xl font-bold text-slate-900 text-center">Edit Profile</Dialog.Title>
                  <p className="text-slate-500 text-sm text-center mb-8 italic">Enhance your digital identity</p>

                  <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 ml-1 uppercase">Display Name</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        type="text" name="name" defaultValue={users?.displayName} required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 ml-1 uppercase">Avatar URL</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                        type="url" name="url" defaultValue={users?.photoURL} required
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={closeModal} className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
                      <button type="submit" className="flex-1 px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 shadow-lg transition-all">Save Changes</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserprofilePage;