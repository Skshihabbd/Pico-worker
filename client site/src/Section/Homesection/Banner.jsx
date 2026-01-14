/* eslint-disable react/no-unknown-property */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaLaptopCode, FaWallet, FaShieldAlt, FaRocket, FaUsers } from "react-icons/fa";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Complete Tasks",
      desc: "Earn money by finishing small digital jobs anytime, anywhere.",
      icon: <FaLaptopCode />,
      bg: "from-emerald-400 to-cyan-500",
    },
    {
      id: 2,
      title: "Fast Payouts",
      desc: "Withdraw your earnings directly to your mobile wallet instantly.",
      icon: <FaWallet />,
      bg: "from-amber-400 to-orange-500",
    },
    {
      id: 3,
      title: "Verified Tasks",
      desc: "Every task is manually checked for 100% security and trust.",
      icon: <FaShieldAlt />,
      bg: "from-rose-400 to-pink-600",
    },
    {
      id: 4,
      title: "Boost Income",
      desc: "Unlock new levels and earn more with our referral program.",
      icon: <FaRocket />,
      bg: "from-indigo-500 to-purple-600",
    },
    {
      id: 5,
      title: "Join Community",
      desc: "Connect with 15k+ workers and grow your skills together.",
      icon: <FaUsers />,
      bg: "from-blue-500 to-indigo-600",
    },
  ];

  return (
    <div className="bg-slate-900 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Content */}
        <div className="mb-12 text-center lg:text-left space-y-4">
          <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
            Unlock Your <span className="text-indigo-400">Earning Potential</span>
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl max-w-2xl">
            Simple tasks, real cash. Join the future of micro-tasking today.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
              loop={true}

          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper !pb-16"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`h-80 rounded-[2.5rem] bg-gradient-to-br ${slide.bg} p-8 text-white flex flex-col justify-between transition-transform duration-500 hover:scale-95 cursor-pointer shadow-xl relative overflow-hidden group`}>
                
                {/* Decorative Element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>

                <div className="space-y-6 relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl">
                    {slide.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{slide.title}</h3>
                    <p className="mt-2 text-white/80 text-sm leading-relaxed font-medium">
                      {slide.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                   Explore Now <span className="text-lg">→</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          width: 10px;
          height: 10px;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 5px;
          background: #818cf8 !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;