import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Timer, ShieldCheck, MapPin, Search } from "lucide-react";
import { services } from "../data/services";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const ServicesPage = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-[1230px] mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-6 block italic">Premium Solutions</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-10 italic !text-white">
              COMPREHENSIVE<br/>
              <span className="text-primary">RECOVERY SERVICES</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              From roadside assistance to heavy-duty trailer recovery, we provide the highest standard of service in the industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid of Services */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col h-full bg-white border border-soft-gray hover:border-primary rounded-10px overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                     <span className="bg-primary text-black font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">Explore</span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-paragraph-gray leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>
                  
                  <Link to={`/service/${service.id}`} className="flex items-center gap-4 text-black font-bold text-sm tracking-widest uppercase group-hover:gap-6 transition-all">
                    Learn more
                    <ArrowRight size={18} className="text-primary group-hover:rotate-[-45deg] transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-light-gray border-t border-soft-gray">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tighter mb-8">Why trust Apex?</h2>
            <p className="text-paragraph-gray max-w-2xl mx-auto">We combine state-of-the-art equipment with certified professionals to ensure every job is done right.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-black text-primary mx-auto flex items-center justify-center rounded-full mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-xl border-4 border-primary/10 group-hover:border-black/5">
                <Timer size={48} />
              </div>
              <h4 className="text-2xl font-bold mb-4">30 Min Response</h4>
              <p className="text-paragraph-gray">Time is critical in an emergency. We prioritize speed and safety above all else.</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-black text-primary mx-auto flex items-center justify-center rounded-full mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-xl border-4 border-primary/10 group-hover:border-black/5">
                <ShieldCheck size={48} />
              </div>
              <h4 className="text-2xl font-bold mb-4">Certified Team</h4>
              <p className="text-paragraph-gray">Every operator is trained and certified to handle complex vehicle recoveries.</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-black text-primary mx-auto flex items-center justify-center rounded-full mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-xl border-4 border-primary/10 group-hover:border-black/5">
                <MapPin size={48} />
              </div>
              <h4 className="text-2xl font-bold mb-4">Wide Coverage</h4>
              <p className="text-paragraph-gray">From city centers to remote highways, our fleet covers the entire region efficiently.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
