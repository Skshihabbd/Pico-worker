import { HiOutlineRocketLaunch, HiOutlineLightBulb, HiOutlineUserGroup } from "react-icons/hi2";

const About_Us = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      
      {/* --- Section 1: Hero Section --- */}
      <section className="relative py-20 px-6 bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase rounded-full tracking-widest">
                Who We Are
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Empowering Workers <br /> 
                <span className="text-emerald-500">Global Connectivity.</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                We are a platform dedicated to bridging the gap between talented workers and global opportunities. Our mission is to provide a secure, transparent, and efficient ecosystem where everyone can thrive.
              </p>
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2 relative">
               <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-[12px] border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                    alt="Team working" 
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Stats / Achievement Section --- */}
      <section className="py-20 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "50K+" },
              { label: "Total Earnings", value: "$2M+" },
              { label: "Countries", value: "120+" },
              { label: "Success Rate", value: "99%" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-3xl bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100">
                <h3 className="text-4xl font-black text-slate-900 mb-2">{stat.value}</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: Values / Mission Section --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Our Core Values</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              We believe in creating a future where work is accessible, fair, and rewarding for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                <HiOutlineRocketLaunch className="text-3xl" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Innovation</h4>
              <p className="text-slate-600 leading-relaxed italic">
                Continuously improving our technology to make micro-tasking smoother and faster for our community.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                <HiOutlineLightBulb className="text-3xl" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Transparency</h4>
              <p className="text-slate-600 leading-relaxed italic">
                Honesty and clarity are at the heart of everything we do, from payments to user interactions.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                <HiOutlineUserGroup className="text-3xl" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-4">Community</h4>
              <p className="text-slate-600 leading-relaxed italic">
                Building a supportive network where workers and employers help each other succeed and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About_Us;