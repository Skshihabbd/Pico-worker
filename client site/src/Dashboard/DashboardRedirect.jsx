/* eslint-disable react/no-unescaped-entities */
import { FaWallet, FaCheckCircle, FaClock, FaTrophy, FaChartLine, FaTasks } from "react-icons/fa";

const DashboardRedirect = () => {
  // Mock data - real data apnar logic theke ashbe
  const stats = [
    {
      id: 1,
      title: "Available Balance",
      value: "$45.50",
      subValue: "910 Coins",
      icon: <FaWallet />,
      color: "from-emerald-400 to-teal-600",
      shadow: "shadow-emerald-200"
    },
    {
      id: 2,
      title: "Completed Tasks",
      value: "124",
      subValue: "+12 this week",
      icon: <FaCheckCircle />,
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-indigo-200"
    },
    {
      id: 3,
      title: "Pending Proofs",
      value: "08",
      subValue: "Awaiting approval",
      icon: <FaClock />,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-orange-200"
    },
    {
      id: 4,
      title: "Current Level",
      value: "Gold",
      subValue: "Top 5% Worker",
      icon: <FaTrophy />,
      color: "from-purple-500 to-fuchsia-600",
      shadow: "shadow-fuchsia-200"
    }
  ];

  return (
    <div className="p-6 lg:p-10 bg-slate-50 min-h-screen">
      {/* 1. Welcome Header */}
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
          Welcome Back, <span className="text-indigo-600 italic">Shihab!</span> 👋
        </h1>
        <p className="text-slate-500 font-medium italic">Here is what's happening with your earnings today.</p>
      </div>

      {/* 2. Colorful Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((item) => (
          <div 
            key={item.id} 
            className={`relative overflow-hidden bg-gradient-to-br ${item.color} rounded-[2rem] p-8 text-white shadow-2xl ${item.shadow} hover:scale-105 transition-transform duration-500 cursor-pointer group`}
          >
            {/* Background Decorative Circles */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <p className="text-white/80 font-bold uppercase tracking-widest text-[10px]">{item.title}</p>
                <h2 className="text-4xl font-black">{item.value}</h2>
                <p className="text-white/70 text-xs font-medium">{item.subValue}</p>
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-2xl">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Quick Actions & Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        
        {/* Recent Activity Card */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaChartLine className="text-indigo-600" /> Earning Insights
            </h3>
            <button className="text-xs font-bold text-indigo-600 hover:underline">View Full Report</button>
          </div>
          
          {/* Placeholder for Chart */}
          <div className="h-64 w-full bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center">
            <p className="text-slate-400 font-medium italic text-sm text-center">
                [ Chart: Task Completion vs Earnings Trend ] <br /> 
                <span className="text-[10px] uppercase">Graph will appear here</span>
            </p>
          </div>
        </div>

        {/* Suggested Tasks */}
        <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FaTasks className="text-teal-400" /> Hot Tasks
            </h3>
            <div className="space-y-4 relative z-10">
                {[1, 2, 3].map((t) => (
                    <div key={t} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                        <p className="text-sm font-bold">Subscribe to YouTube Channel</p>
                        <div className="flex justify-between mt-2">
                            <span className="text-teal-400 font-black text-xs">$0.15</span>
                            <span className="text-white/50 text-[10px] font-bold uppercase">2 mins left</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-4 bg-teal-500 hover:bg-teal-400 text-white font-black rounded-2xl shadow-xl shadow-teal-900/40 transition-all">
                Find More Tasks
            </button>
            <div className="absolute bottom-0 right-0 opacity-10 -mb-10 -mr-10">
                <FaTasks size={200} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardRedirect;