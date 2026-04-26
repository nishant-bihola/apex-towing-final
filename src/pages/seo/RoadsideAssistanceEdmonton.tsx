import { motion } from "motion/react";
import { ArrowRight, Check, Battery, Lock, CircleDot, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleReviews from "../../components/GoogleReviews";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const RoadsideAssistanceEdmonton = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-black relative overflow-hidden">
        <div className="max-w-[1230px] mx-auto px-4 relative z-10 text-white">
          <div className="max-w-[800px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">Roadside Help 24/7</span>
            </motion.div>
            <motion.h1 
              {...fadeIn}
              className="text-5xl md:text-7xl font-medium leading-tight mb-8 text-white"
            >
              24/7 Roadside Assistance in Edmonton
            </motion.h1>
            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 max-w-2xl"
            >
              Locked out? Dead battery? Flat tire? We’ll get you moving fast. No waiting. No stress. Edmonton's most trusted roadside team is just a call away.
            </motion.p>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a href="tel:8259779460" className="bg-primary hover:bg-white text-black pl-8 pr-2 py-2 rounded-full flex items-center gap-10 transition-all duration-500 group shadow-2xl">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[9px] font-bold opacity-40 group-hover:opacity-100 uppercase tracking-widest mb-1 transition-opacity">Quick Dispatch</span>
                  <span className="text-xl font-bold">825-977-9460</span>
                </div>
                <div className="bg-black group-hover:bg-primary p-3.5 rounded-full transition-all duration-500">
                  <Phone size={18} className="text-primary group-hover:text-black transition-colors duration-500 fill-current" />
                </div>
              </a>
              <Link to="/request" className="text-white hover:text-primary transition-colors font-bold">
                Request Help Online
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Trust Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-24">
            {[
              { icon: <Battery size={32} />, title: "Jump Starts", desc: "Expert battery revival for Edmonton winters." },
              { icon: <Lock size={32} />, title: "Lockout Service", desc: "Damage-free entry into any vehicle make/model." },
              { icon: <CircleDot size={32} />, title: "Tire Changes", desc: "Safe, fast tire swaps on the side of any highway." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-light-gray p-10 rounded-3xl border border-soft-gray hover:border-primary transition-all"
              >
                <div className="bg-black text-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{item.title}</h3>
                <p className="text-paragraph-gray">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <GoogleReviews />
        </div>
      </section>

      {/* Fast Response Promise */}
      <section className="py-24 bg-primary">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-medium text-black mb-8 leading-tight">
                Our Fast Response Promise.
              </h2>
              <p className="text-lg text-black/70 mb-10 max-w-lg">
                We know that being stranded is stressful. That's why we've optimized our dispatch system to ensure help arrives in 30 minutes or less.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Serving Edmonton for 15 years",
                  "Call in 10 sec guarantee",
                  "Licensed & Insured",
                  "Available 24/7, 365 days"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-black">
                    <div className="bg-black text-primary p-1 rounded-full">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="/roadside_technician_edmonton_1777190264302.png" alt="Roadside Technician Edmonton" className="rounded-2xl shadow-3xl" />
              <div className="absolute -bottom-10 -left-10 bg-black text-white p-10 rounded-2xl hidden md:block">
                <span className="text-5xl font-bold text-primary block mb-2">15+</span>
                <span className="text-sm font-bold uppercase tracking-widest">Years of Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoadsideAssistanceEdmonton;
