import { FaCrown, FaCoins } from "react-icons/fa";
// Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TopEarnerSlider = ({ info }) => {
  if (!info || info.length === 0) return null;

  return (
    <div className="w-full py-10 px-4">
      <Swiper
        loop={true}

          slidesPerView={1}
          spaceBetween={100}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper !pb-16"
      >
        {info.map((user, index) => (
          <SwiperSlide key={index}>
            <div className="group relative bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-500 flex flex-col items-center">
              
              {/* Profile Image with Crown Badge */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-1"></div>
                
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>

                <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-xl shadow-lg transform -rotate-12 group-hover:rotate-0 transition-all duration-300">
                  <FaCrown size={16} />
                </div>
              </div>

              {/* User Info */}
              <div className="mt-6 text-center space-y-1">
                <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-amber-600 transition-colors">
                  {user.name || "Top Earner"}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  {user.role || "Worker"}
                </p>
              </div>

              {/* Coin Stats Badge */}
              <div className="mt-6 w-full">
                <div className="bg-slate-50 group-hover:bg-amber-50 border border-slate-100 group-hover:border-amber-100 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300">
                  <div className="bg-amber-400 p-1.5 rounded-full shadow-sm">
                    <FaCoins className="text-white text-xs" />
                  </div>
                  <span className="text-lg font-black text-slate-700">
                    {user.coin} <span className="text-[10px] text-slate-400 font-bold uppercase">Coins</span>
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-50/20 opacity-0 group-hover:opacity-100 rounded-[2.5rem] pointer-events-none transition-opacity"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopEarnerSlider;