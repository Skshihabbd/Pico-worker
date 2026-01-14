import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaCoins, FaHourglassHalf, FaWallet } from "react-icons/fa";

const Taskcreatorstatehome = () => {
  const { users } = useAuth();
  const axiosPublic = useAxiosSecure();

  // Fetching User Data for Coins
  const { data: user = {} } = useQuery({
    queryKey: ["user", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${users?.email}`);
      return res.data;
    },
    enabled: !!users?.email,
  });

  // Fetching Task Data for Stats
  const { data: taskhome = [] } = useQuery({
    queryKey: ["taskhome", users?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/taskcreatorhome?email=${users?.email}`
      );
      return res.data;
    },
    enabled: !!users?.email,
  });

  // Calculating Stats
  const totalPayment = taskhome.reduce((acc, item) => acc + (item.payableAmount || 0), 0);
  const pendingTasks = taskhome.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const stats = [
    {
      id: 1,
      label: "Available Coins",
      value: user?.coin || 0,
      icon: <FaCoins />,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-orange-200",
    },
    {
      id: 2,
      label: "Pending Quantity",
      value: pendingTasks,
      icon: <FaHourglassHalf />,
      color: "from-indigo-500 to-blue-600",
      shadow: "shadow-blue-200",
    },
    {
      id: 3,
      label: "Total Committed",
      value: `${totalPayment} Coins`,
      icon: <FaWallet />,
      color: "from-emerald-400 to-teal-600",
      shadow: "shadow-emerald-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((item) => (
        <div
          key={item.id}
          className={`relative overflow-hidden bg-gradient-to-br ${item.color} rounded-[2rem] p-8 text-white shadow-2xl ${item.shadow} hover:scale-105 transition-all duration-300 cursor-default group`}
        >
          {/* Decorative Circle Background */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-2">
              <p className="text-white/80 font-bold uppercase tracking-widest text-[10px]">
                {item.label}
              </p>
              <h2 className="text-3xl font-black tabular-nums">
                {item.value}
              </h2>
            </div>
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-2xl shadow-inner">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Taskcreatorstatehome;