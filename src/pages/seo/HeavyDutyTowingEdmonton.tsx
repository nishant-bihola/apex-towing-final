import { motion } from "motion/react";
import { ArrowRight, Check, Truck, Tractor, AlertTriangle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleReviews from "../../components/GoogleReviews";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const HeavyDutyTowingEdmonton = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-[1230px] mx-auto px-4 relative z-10 text-white">
          <div className="max-w-[800px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-black font-bold">Industrial Recovery Specialists</span>
            </motion.div>
            <motion.h1 
              {...fadeIn}
              className="text-5xl md:text-7xl font-medium leading-tight mb-8 text-white"
            >
              Heavy-Duty Towing & Recovery Edmonton
            </motion.h1>
            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/50 mb-10 max-w-2xl"
            >
              Major equipment breakdown? Commercial fleet stranded? We have the power and expertise to handle any load. No job is too big. No wait is too long.
            </motion.p>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-5 w-full max-w-[340px]"
            >
              <a 
                href="tel:8259779460" 
                className="bg-primary hover:bg-white text-black pl-8 pr-2 py-2 rounded-full flex items-center justify-between transition-all duration-500 group shadow-lg hover:shadow-xl w-full"
              >
                <span className="font-bold text-[10px] tracking-widest uppercase">Call now: 825-977-9460</span>
                <div className="bg-black group-hover:bg-primary p-3 rounded-full transition-all duration-500">
                  <Phone size={18} className="text-primary group-hover:text-black transition-colors duration-500" />
                </div>
              </a>
              <Link to="/request" className="bg-primary hover:bg-white text-black pl-8 pr-2 py-2 rounded-full flex items-center justify-between transition-all duration-500 group shadow-xl w-full">
                <span className="font-medium uppercase tracking-widest text-[10px]">Request a tow now</span>
                <div className="bg-black group-hover:bg-primary p-3 rounded-full group-hover:rotate-[-45deg] transition-all duration-500">
                  <ArrowRight size={18} className="text-primary group-hover:text-black transition-colors duration-500" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/heavy_duty_tow_truck_1777190252910.png" alt="Heavy Duty Recovery" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>
      </section>

      {/* Stats/Specs */}
      <section className="py-24 bg-white">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-24">
            {[
              { label: "Max Capacity", val: "75+ Tons" },
              { label: "Fleet Size", val: "20+ Trucks" },
              { label: "Response Time", val: "30 Mins" },
              { label: "Experience", val: "15 Years" }
            ].map((stat, i) => (
              <div key={i} className="border-l-4 border-primary pl-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-paragraph-gray block mb-2">{stat.label}</span>
                <span className="text-4xl font-bold text-black">{stat.val}</span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
              <h2 className="text-4xl font-medium text-black mb-8">Specialized Industrial Recovery.</h2>
              <div className="space-y-4">
                {[
                  "Semi-Truck & Trailer Towing",
                  "Construction Equipment Transport",
                  "Bus & RV Recovery",
                  "Cargo Transfers & Cleanup",
                  "Winching & Uprighting Services",
                  "Commercial Fleet Contracts"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-4 border-b border-soft-gray last:border-0 group cursor-default">
                    <div className="w-10 h-10 bg-light-gray rounded-lg flex items-center justify-center text-black group-hover:bg-black group-hover:text-primary transition-colors">
                      <Truck size={20} />
                    </div>
                    <span className="text-lg font-medium text-black">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-light-gray p-12 rounded-3xl border border-soft-gray">
              <span className="text-black font-bold uppercase tracking-widest text-xs mb-6 block">Our Heavy-Duty Fleet</span>
              <p className="text-paragraph-gray mb-8">
                Our heavy-duty division is equipped with the latest technology, including rotators and high-capacity winches. We serve Edmonton, Sherwood Park, St. Albert, and all surrounding industrial areas.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-black">
                  <Check size={16} className="text-primary" strokeWidth={4} /> GPS Dispatched Fleet
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-black">
                  <Check size={16} className="text-primary" strokeWidth={4} /> Hazmat Cleanup Certified
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-black">
                  <Check size={16} className="text-primary" strokeWidth={4} /> WreckMaster Certified Operators
                </li>
              </ul>
              <a 
                href="tel:8259779460" 
                className="bg-black hover:bg-primary text-white hover:text-black pl-8 pr-2 py-2 rounded-full flex items-center justify-between transition-all duration-500 group shadow-2xl w-full"
              >
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[9px] font-bold opacity-40 group-hover:opacity-100 uppercase tracking-widest mb-1 transition-opacity">Heavy Duty Dispatch</span>
                  <span className="text-xl font-bold text-white group-hover:text-black">825-977-9460</span>
                </div>
                <div className="bg-primary group-hover:bg-black p-3.5 rounded-full transition-all duration-500">
                  <Phone size={18} className="text-black group-hover:text-primary transition-colors duration-500 fill-current" />
                </div>
              </a>
            </div>
          </div>

          <GoogleReviews />
        </div>
      </section>

      {/* Industrial Footer CTA */}
      <section className="py-24 bg-primary">
        <div className="max-w-[1230px] mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-medium text-black mb-8 max-w-4xl mx-auto">
            Edmonton's Heavy-Duty Experts. Available 24/7.
          </h2>
          <p className="text-black/60 text-xl mb-12 max-w-2xl mx-auto">
            Don't let equipment failure halt your operations. We're on standby right now.
          </p>
          <div className="flex flex-col gap-5 justify-center items-center">
            <a 
              href="tel:8259779460" 
              className="bg-black hover:bg-primary text-white hover:text-black pl-8 pr-2 py-2 rounded-full flex items-center justify-between transition-all duration-500 group shadow-lg hover:shadow-xl w-full max-w-[340px]"
            >
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[9px] font-bold opacity-40 group-hover:opacity-100 uppercase tracking-widest mb-1 transition-opacity">Instant Dispatch</span>
                <span className="text-xl font-bold">825-977-9460</span>
              </div>
              <div className="bg-primary group-hover:bg-black p-3.5 rounded-full transition-all duration-500">
                <Phone size={18} className="text-black group-hover:text-primary transition-colors duration-500 fill-current" />
              </div>
            </a>
            <Link to="/request" className="bg-black hover:bg-primary text-white hover:text-black pl-8 pr-2 py-2 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-between group w-full max-w-[340px]">
              <span className="font-medium uppercase tracking-widest text-[10px]">Request a tow now</span>
              <div className="bg-primary group-hover:bg-black p-3 rounded-full group-hover:rotate-[-45deg] transition-all duration-500">
                <ArrowRight size={18} className="text-black group-hover:text-primary transition-colors duration-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeavyDutyTowingEdmonton;
