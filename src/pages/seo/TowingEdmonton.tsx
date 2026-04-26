import { motion } from "motion/react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleReviews from "../../components/GoogleReviews";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const TowingEdmonton = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-light-gray relative overflow-hidden">
        <div className="max-w-[1230px] mx-auto px-4 relative z-10">
          <div className="max-w-[800px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">Fast Response Edmonton</span>
            </motion.div>
            <motion.h1 
              {...fadeIn}
              className="text-5xl md:text-7xl font-medium leading-tight mb-8 text-black"
            >
              Reliable Towing Services in Edmonton
            </motion.h1>
            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl text-paragraph-gray mb-10 max-w-2xl"
            >
              Stranded? We’ll get you moving fast. Apex Towing provides professional, 24/7 towing and recovery services across the Greater Edmonton Area. No waiting. No stress.
            </motion.p>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a href="tel:8259779460" className="bg-black hover:bg-primary text-white hover:text-black pl-8 pr-2 py-2 rounded-full flex items-center gap-10 transition-all duration-500 group shadow-2xl">
                <span className="font-medium">Call 825-977-9460</span>
                <div className="bg-primary group-hover:bg-black p-3 rounded-full group-hover:-rotate-45 transition-all duration-500">
                  <Phone size={18} className="text-black group-hover:text-primary" fill="currentColor" />
                </div>
              </a>
              <Link to="/request" className="text-black font-bold border-b-2 border-primary py-1 hover:border-black transition-all">
                Request a tow online
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background Image/Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-20">
          <img src="/modern_tow_truck_edmonton_1777190238701.png" alt="Edmonton Towing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-light-gray" />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1230px] mx-auto px-4">
          <GoogleReviews />
        </div>
      </section>

      {/* Service Specifics */}
      <section className="py-24 bg-light-gray">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl">
              <img src="/heavy_duty_tow_truck_1777190252910.png" alt="Professional Towing Edmonton" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Serving Edmonton for 15 Years</span>
              <h2 className="text-4xl md:text-5xl font-medium text-black mb-8 leading-tight">
                Why Edmonton drivers choose Apex Towing.
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Fast response promise", desc: "We arrive within 30 minutes in most Edmonton neighborhoods." },
                  { title: "Available 24/7 – Call in 10 sec", desc: "Our dispatch center is always live, day or night." },
                  { title: "Professional certified team", desc: "Licensed and insured operators for your peace of mind." },
                  { title: "Flat rate pricing", desc: "No hidden fees, no surprise charges on the road." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="bg-primary p-2 rounded-full h-fit">
                      <Check size={16} className="text-black" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">{item.title}</h4>
                      <p className="text-paragraph-gray text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="bg-black rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-4xl md:text-6xl font-medium text-white mb-8 relative z-10">
              Ready to get back on the road?
            </h2>
            <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto relative z-10">
              One call is all it takes. Our Edmonton dispatchers are ready to send help your way immediately.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <a href="tel:8259779460" className="bg-primary hover:bg-white text-black px-12 py-5 rounded-full font-bold transition-all shadow-xl">
                Call Now: 825-977-9460
              </a>
              <Link to="/request" className="bg-white/10 hover:bg-white/20 text-white px-12 py-5 rounded-full font-bold border border-white/20 transition-all backdrop-blur-sm">
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TowingEdmonton;
