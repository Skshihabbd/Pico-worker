import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaCloudUploadAlt, FaPaperPlane } from "react-icons/fa";

const AddNewTaskForm = ({ info, fetch }) => {
  const { coin, email, name, role, _id, image } = info;
  const axiosPublic = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const SubmitTask = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const form = event.target;
    const taskQuantity = parseInt(form.quantity.value);
    const perTaskAmount = parseInt(form.payamount.value);
    const totalPayable = taskQuantity * perTaskAmount;

    // 1. Validation: Check if user has enough coins
    if (totalPayable > coin) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Insufficient Balance!",
        text: `You need ${totalPayable} coins, but you only have ${coin}.`,
        confirmButtonColor: "#4F46E5",
      });
    }

    try {
      // 2. Image Upload to ImgBB
      const imageFile = form.images.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=9c8539154be0bafb013ab02d1bbf342b`,
        formData
      );

      if (imgRes.data.success) {
        const taskInfo = {
          title: form.title.value,
          taskdetails: form.details.value,
          completionDate: form.date.value,
          quantity: taskQuantity,
          payableAmount: perTaskAmount, // Storing per task amount is better for logic
          totalPayable: totalPayable,
          submissionInfo: form.submissioninfo.value,
          image: imgRes.data.data.display_url,
          email: email,
          creatorName: name,
          currenttime: form.currenttime.value,
        };

        const userUpdate = {
          name, email, role, image,
          coin: coin - totalPayable,
        };

        // 3. Save Task & Update User Coin
        const taskRes = await axiosPublic.post("/taskcreator", taskInfo);
        if (taskRes.data.insertedId) {
          await axiosPublic.put(`/user/${_id}`, userUpdate);
          
          Swal.fire({
            icon: "success",
            title: "Task Posted Successfully!",
            text: `${totalPayable} coins deducted from your wallet.`,
            showConfirmButton: false,
            timer: 2000,
          });
          
          fetch(); // Refetch user data to update coin in UI
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-slate-50 text-slate-700 font-medium";
  const labelClass = "block text-sm font-bold text-slate-600 mb-2 ml-1";

  return (
    <form onSubmit={SubmitTask} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Title */}
        <div>
          <label className={labelClass}>Task Title</label>
          <input name="title" className={inputClass} placeholder="e.g. Subscribe to my channel" required type="text" />
        </div>

        {/* Completion Date */}
        <div>
          <label className={labelClass}>Completion Date</label>
          <input name="date" className={inputClass} required type="date" />
        </div>

        {/* Task Quantity */}
        <div>
          <label className={labelClass}>Task Quantity (Workers needed)</label>
          <input name="quantity" className={inputClass} placeholder="0" required type="number" min="1" />
        </div>

        {/* Payable Amount */}
        <div>
          <label className={labelClass}>Payable Amount (Per Task)</label>
          <input name="payamount" className={inputClass} placeholder="0" required type="number" min="1" />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className={labelClass}>Task Thumbnail / Image</label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-4 hover:border-indigo-400 transition-colors bg-slate-50">
            <input name="images" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required type="file" accept="image/*" />
            <div className="text-center">
              <FaCloudUploadAlt className="mx-auto text-slate-400 text-3xl mb-2" />
              <p className="text-sm text-slate-500 font-medium">Click to upload or drag and drop</p>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="md:col-span-2">
          <label className={labelClass}>Detailed Instructions</label>
          <textarea name="details" className={`${inputClass} h-32 resize-none`} placeholder="Describe what workers need to do..." required />
        </div>

        {/* Submission Info */}
        <div className="md:col-span-2">
          <label className={labelClass}>What worker should submit as proof?</label>
          <input name="submissioninfo" className={inputClass} placeholder="e.g. Screenshot of subscription" required type="text" />
        </div>

        {/* Hidden Current Time for Logic */}
        <input name="currenttime" type="hidden" value={new Date().toISOString()} />
      </div>

      {/* Submit Button */}
      <button 
        disabled={loading}
        className={`w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${loading ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
        type="submit"
      >
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <><FaPaperPlane /> Post Task Now</>
        )}
      </button>
    </form>
  );
};

export default AddNewTaskForm;