import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaUsers, FaCoins, FaCreditCard, FaChartLine } from "react-icons/fa";

const Adminhomestate = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Total Users
  const { data: adminhomealluser = [] } = useQuery({
    queryKey: ["adminhomealluser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminhomealluser");
      return res.data;
    },
  });

  // Fetch Total Payments
  const { data: adminhomeallpayment = [] } = useQuery({
    queryKey: ["adminhomeallpayment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminhomeallpayment");
      return res.data;
    },
  });

  // Calculate Total Coins in Circulation
  const totalCoins = adminhomealluser.reduce((acc, item) => acc + (item.coin || 0), 0);

  const adminStats = [
    {
      id: 1,
      name: "Total Users",
      value: adminhomealluser.length,
      icon: <FaUsers />,
      color: "from-indigo-600 to-violet-700",
      description: "Active platform members"
    },
    {
      id: 2,
      name: "Total Coins",
      value: totalCoins.toLocaleString(),
      icon: <FaCoins />,
      color: "from-amber-400 to-orange-600",
      description: "Coins currently in circulation"
    },
    {
      id: 3,
      name: "Total Transactions",
      value: adminhomeallpayment.length,
      icon: <FaCreditCard />,
      color: "from-rose-500 to-pink-700",
      description: "Completed payment orders"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {adminStats.map((stat) => (
        <div 
          key={stat.id}
          className="relative group overflow-hidden bg-white p-1 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          {/* Decorative Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
          
          <div className="relative bg-white rounded-[2.4rem] p-8 flex items-center gap-6">
            {/* Icon Container */}
            <div className={`p-5 rounded-3xl bg-gradient-to-br ${stat.color} text-white text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
              {stat.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <span className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
                {stat.name}
              </span>
              <h2 className="text-4xl font-black text-slate-800 tracking-tight tabular-nums">
                {stat.value}
              </h2>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400 font-bold italic">
                <FaChartLine className="text-emerald-500" />
                {stat.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Adminhomestate;