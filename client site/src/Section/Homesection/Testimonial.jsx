/* eslint-disable react/no-unescaped-entities */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Samuel",
      role: "Micro-task Worker",
      image: "https://media.istockphoto.com/id/1503019927/photo/young-man-holding-invisible-dental-aligners.webp?b=1&s=170667a&w=0&k=20&c=A2IJJyUzLWgawvGi327uLkNX95anaWKX1Ah09TXKckE=",
      review: "The best experience I've had on a micro-tasking site. The payments are fast and the interface is incredibly smooth."
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Task Creator",
      image: "https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=NtM9Wbs1DBiGaiowsxJY6wNCnLf0POa65rYEwnZymrM=",
      review: "Finding reliable workers for my small projects has never been easier. Highly recommended for quality results."
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Top Earner",
      image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
      review: "I've tried many platforms, but this one stands out for its transparency and community support. Five stars!"
    }
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h4 className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-sm">Testimonials</h4>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-800">What Our <span className="text-indigo-600">Users Say</span></h2>
          <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="mySwiper rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-100"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white p-8 lg:p-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-20 min-h-[500px]">
                
                {/* Image Section */}
                <div className="relative shrink-0">
                  <div className="w-48 h-48 lg:w-72 lg:h-72 rounded-[2.5rem] overflow-hidden border-8 border-indigo-50 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-indigo-600 p-4 rounded-2xl shadow-lg text-white">
                    <FaQuoteLeft size={24} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="space-y-2">
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">{item.name}</h3>
                    <p className="text-indigo-500 font-bold text-sm uppercase tracking-widest">{item.role}</p>
                  </div>
                  
                  <p className="text-slate-600 text-lg lg:text-2xl leading-relaxed italic font-medium">
                    "{item.review}"
                  </p>

                  <div className="flex justify-center lg:justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Swiper Pagination */}
      <style >{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #6366f1;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 10px;
        }
        .swiper-pagination {
          bottom: 30px !important;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;