import { useQuery } from "@tanstack/react-query";
import Banner from "../Section/Homesection/Banner";
import useAxiosSecure from "../Hooks2/useAxiosSecure";
import { FaTasks, FaWallet, FaShieldAlt, FaTrophy } from "react-icons/fa";
import Testimonial from "../Section/Homesection/Testimonial";
import TopEarner from "../Section/Homesection/TopEarner";
import Footer from "../Section/Footer";
import MyPage from "../Section/Homesection/MyPage";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: homepagedata = [] } = useQuery({
    queryKey: ["homepagedata"],
    queryFn: async () => {
      const res = await axiosSecure.get("/homepagedata");
      return res.data;
    },
  });

  return (
    <div className="w-full relative bg-white">
      {/* 1. Banner Section */}
      <div className="relative z-30 shadow-lg">
        <Banner />
      </div>

      {/* ===== Elegant Stacking Features ===== */}
      <div className="relative">
        {/* Feature 1: Simplicity */}
        <div className="h-screen sticky top-0 flex items-center justify-center p-4 bg-white">
          <div className="w-full lg:w-11/12 h-[85vh] bg-indigo-600 rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center text-white p-10 text-center relative overflow-hidden">
            <div className="absolute top-10 left-10 opacity-10 animate-pulse">
              <FaTasks size={200} />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter">
              Small Tasks. <br /> Big Impact.
            </h2>
            <p className="max-w-2xl text-indigo-100 text-lg lg:text-xl font-medium leading-relaxed opacity-90">
              Join thousands of workers earning daily by completing simple,
              verified micro-tasks from global creators.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <span className="px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full font-bold">
                🚀 Fast Payouts
              </span>
              <span className="px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full font-bold">
                🛠️ Easy Tools
              </span>
            </div>
          </div>
        </div>

        {/* Feature 2: Trust */}
        <div className="h-screen sticky top-12 flex items-center justify-center p-4">
          <div className="w-full lg:w-11/12 h-[85vh] bg-slate-900 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-white p-10 text-center relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <FaShieldAlt size={300} />
            </div>
            <div className="bg-emerald-500/20 p-6 rounded-full mb-8 border border-emerald-500/30">
              <FaShieldAlt size={50} className="text-emerald-400" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter text-emerald-400">
              Guaranteed <br /> Safety
            </h2>
            <p className="max-w-xl text-slate-400 text-lg lg:text-xl font-medium">
              We act as a trusted escrow. Your earnings are held safely and
              released immediately upon task approval.
            </p>
          </div>
        </div>

        {/* Feature 3: Conversion */}
        <div className="h-screen sticky top-24 flex items-center justify-center p-4">
          <div className="w-full lg:w-11/12 h-[85vh] bg-gradient-to-tr from-violet-700 to-indigo-900 rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center text-white p-10 text-center relative overflow-hidden border-b-8 border-violet-500/30">
            <div className="mb-8 p-6 bg-white/5 rounded-full backdrop-blur-sm">
              <FaWallet size={60} className="text-yellow-400 animate-bounce" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter">
              Withdrawal <br /> Freedom
            </h2>
            <p className="max-w-2xl text-violet-100 text-xl font-medium">
              20 Coins = $1. Seamlessly withdraw your hard-earned money directly
              to your favorite mobile wallet.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Community & Social Proof (Non-Sticky for better flow) ===== */}
      <div className="relative z-40 bg-white rounded-t-[5rem] -mt-20  border-t border-slate-100">
        {/* Section 4: Impact Stats */}
        <div className="max-w-7xl mx-auto px-6 pt-32">
          <div className="text-center space-y-4 mb-20">
            <h4 className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-sm">
              Real-time Stats
            </h4>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-800">
              Our Community Impact
            </h2>
            <div className="h-2 w-24 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard value="50k+" label="Tasks Completed" color="indigo" />
            <StatCard value="$10k+" label="Total Payouts" color="emerald" />
            <StatCard value="15k+" label="Verified Workers" color="amber" />
          </div>
        </div>

        {/* Section 5: Top Earners */}
        <div className="max-w-7xl mx-auto px-6 pt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs">
                <FaTrophy size={18} />
                <span>Hall of Fame</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">
                Meet Our <span className="text-indigo-600">Top Earners</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium max-w-xs text-center md:text-right">
              The most dedicated workers on our platform this month.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {homepagedata.slice(0, 6).map((info) => (
              <TopEarner key={info._id} info={info} />
            ))}
          </div>
        </div>

        {/* Section 6: Testimonials */}
        <div className="pt-32">
          <Testimonial />
        </div>

        {/* test */}
        <div>
          <MyPage />
        </div>
        {/* test */}
        {/* footer */}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ value, label, color }) => {
  const colors = {
    indigo: "text-indigo-600 bg-indigo-50",
    emerald: "text-emerald-600 bg-emerald-50",
    amber: "text-amber-600 bg-amber-50",
  };
  return (
    <div className="p-10 bg-white rounded-[2.5rem] text-center border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
      <h4 className={`text-6xl font-black mb-3 ${colors[color].split(" ")[0]}`}>
        {value}
      </h4>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:text-slate-600 transition-colors">
        {label}
      </p>
    </div>
  );
};

export default Home;
