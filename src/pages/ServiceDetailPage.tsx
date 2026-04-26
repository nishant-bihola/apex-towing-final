import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, ArrowRight, Truck, Timer, ShieldCheck, MapPin } from "lucide-react";
import { services } from "../data/services";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold">Service not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/70 md:bg-gradient-to-r md:from-black/90 md:via-black/60 md:to-transparent"></div>
        </div>
        
        <div className="max-w-[1230px] mx-auto px-4 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block drop-shadow-md">Our Expertise</span>
            <h1 className="text-5xl md:text-7xl font-bold !text-white tracking-tighter leading-none mb-6 drop-shadow-2xl">
              {service.title}
            </h1>
            <p className="text-white/90 text-xl leading-relaxed font-medium drop-shadow-lg">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-bold text-black mb-8 tracking-tight">Overview</h2>
              <div className="prose prose-lg text-paragraph-gray">
                <p className="leading-relaxed mb-8">
                  {service.longDescription}
                </p>
              </div>

              {/* Secondary Image within content */}
              <div className="my-12 rounded-xl overflow-hidden shadow-xl aspect-video border border-soft-gray">
                 <img 
                    src={service.image} 
                    alt="Service in action" 
                    className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                 />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                <div className="bg-light-gray p-6 rounded-xl border border-soft-gray">
                  <div className="w-16 h-16 bg-black flex items-center justify-center rounded-full mb-6 text-primary shadow-xl border-4 border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <Timer size={28} />
                  </div>
                  <h4 className="font-bold text-black mb-2">Fast Response</h4>
                  <p className="text-sm text-paragraph-gray">We aim to be on-site within 30 minutes for most areas.</p>
                </div>
                <div className="bg-light-gray p-6 rounded-xl border border-soft-gray">
                  <div className="w-16 h-16 bg-black flex items-center justify-center rounded-full mb-6 text-primary shadow-xl border-4 border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck size={28} />
                  </div>
                  <h4 className="font-bold text-black mb-2">Fully Insured</h4>
                  <p className="text-sm text-paragraph-gray">Rest easy knowing your vehicle is in safe, professional hands.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-black text-white p-10 md:p-16 rounded-10px shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/2">
                <Truck size={300} strokeWidth={1} />
              </div>
              
              <h3 className="text-3xl font-bold mb-10 relative z-10 flex items-center gap-4">
                What we offer
                <div className="h-[2px] w-12 bg-primary"></div>
              </h3>
              
              <ul className="space-y-6 relative z-10">
                {service.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-primary p-1 rounded-full mt-1">
                      <Check size={14} className="text-black stroke-[3]" />
                    </div>
                    <span className="text-lg font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-12 pt-10 border-t border-white/10 relative z-10">
                <Link to="/request" className="bg-primary hover:bg-white text-black pl-8 pr-2 py-2 rounded-full inline-flex items-center gap-10 transition-all duration-500 group shadow-xl">
                  <span className="font-bold text-sm tracking-widest uppercase">Book this service</span>
                  <div className="bg-black group-hover:bg-primary p-3 rounded-full group-hover:-rotate-45 transition-all duration-500">
                    <ArrowRight size={18} className="text-primary group-hover:text-black transition-colors" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="py-20 bg-light-gray border-t border-soft-gray">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-black font-bold text-sm tracking-widest uppercase mb-4 block underline decoration-primary decoration-4 underline-offset-8">More Solutions</span>
              <h2 className="text-4xl font-bold text-black tracking-tight">Our other services</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.filter(s => s.id !== serviceId).slice(0, 3).map((s, i) => (
              <Link 
                key={s.id}
                to={`/service/${s.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-soft-gray hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-black mb-4 group-hover:text-primary transition-colors">{s.title}</h4>
                  <p className="text-paragraph-gray text-sm line-clamp-2">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
