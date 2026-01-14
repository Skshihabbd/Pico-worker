import { useNavigate } from "react-router-dom";
import { FaCoins, FaGem, FaCrown, FaRocket } from "react-icons/fa";

const PurchaseCoin = () => {
  const coinPackages = [
    { coins: 10, price: 1, icon: <FaCoins />, color: "from-blue-400 to-indigo-500", label: "Starter" },
    { coins: 100, price: 9, icon: <FaRocket />, color: "from-emerald-400 to-teal-600", label: "Growth" },
    { coins: 500, price: 19, icon: <FaGem />, color: "from-purple-500 to-fuchsia-600", label: "Business", popular: true },
    { coins: 1000, price: 39, icon: <FaCrown />, color: "from-amber-400 to-orange-500", label: "Ultimate" },
  ];

  const navigate = useNavigate();

  const handleNavigate = (coin, price) => {
    navigate(`/dashboard/paymentroute/${coin}/${price}`);
  };

  return (
    <div className="p-6 lg:p-12 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">
          Fuel Your <span className="text-indigo-600">Campaigns</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto italic">
          Select a coin package to post more tasks and reach thousands of workers instantly.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-8 max-w-7xl mx-auto">
        {coinPackages.map((pkg, index) => (
          <div 
            key={index} 
            className={`relative bg-white rounded-[2.5rem] p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center border-2 ${
              pkg.popular ? "border-indigo-500 scale-105 z-10" : "border-transparent"
            }`}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <span className="absolute -top-5 bg-indigo-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                Most Popular
              </span>
            )}

            {/* Package Icon */}
            <div className={`w-20 h-20 bg-gradient-to-br ${pkg.color} rounded-3xl flex items-center justify-center text-3xl text-white shadow-2xl mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform`}>
              {pkg.icon}
            </div>

            {/* Package Info */}
            <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">{pkg.label}</h4>
            <h3 className="text-4xl font-black text-slate-800 mb-2">{pkg.coins}</h3>
            <p className="text-slate-500 font-bold mb-8 italic">Total Coins</p>

            <div className="mb-8">
               <span className="text-4xl font-black text-slate-800">${pkg.price}</span>
               <span className="text-slate-400 font-medium italic"> /one-time</span>
            </div>

            {/* Buy Button */}
            <button
              onClick={() => handleNavigate(pkg.coins, pkg.price)}
              className={`w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all shadow-lg ${
                pkg.popular 
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" 
                : "bg-slate-800 hover:bg-slate-900 shadow-slate-200"
              }`}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Security Trust Badge */}
      <div className="mt-16 flex justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Secure Payment via Stripe & SSL</p>
      </div>
    </div>
  );
};

export default PurchaseCoin;