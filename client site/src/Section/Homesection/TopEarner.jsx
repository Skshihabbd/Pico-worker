import { FaCrown, FaCoins } from "react-icons/fa";

const TopEarner = ({ info }) => {
  const { image, coin, name, role } = info;

  return (
    <div className="group relative bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-500 flex flex-col items-center">
      
      {/* 1. Profile Image with Crown Badge */}
      <div className="relative">
        {/* Animated Background Ring */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-1"></div>
        
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </div>

        {/* Floating Crown Badge */}
        <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-xl shadow-lg transform -rotate-12 group-hover:rotate-0 transition-all duration-300">
          <FaCrown size={16} />
        </div>
      </div>

      {/* 2. User Info */}
      <div className="mt-6 text-center space-y-1">
        <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-amber-600 transition-colors">
          {name || "Top Earner"}
        </h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          {role || "Worker"}
        </p>
      </div>

      {/* 3. Coin Stats Badge */}
      <div className="mt-6 w-full">
        <div className="bg-slate-50 group-hover:bg-amber-50 border border-slate-100 group-hover:border-amber-100 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300">
          <div className="bg-amber-400 p-1.5 rounded-full shadow-sm">
            <FaCoins className="text-white text-xs" />
          </div>
          <span className="text-lg font-black text-slate-700">
            {coin} <span className="text-[10px] text-slate-400 font-bold uppercase">Coins</span>
          </span>
        </div>
      </div>

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-50/20 opacity-0 group-hover:opacity-100 rounded-[2.5rem] pointer-events-none transition-opacity"></div>
    </div>
  );
};

export default TopEarner;