import { motion } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  Plus, 
  CircleDot, 
  Battery, 
  Lock, 
  Truck, 
  Tractor, 
  AlertTriangle,
  MapPin,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import GoogleReviews from "../components/GoogleReviews";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-0 bg-white overflow-hidden">
      <div className="max-w-[1230px] mx-auto px-3 sm:px-4">
        <div className="max-w-[660px] mb-8 md:mb-12">
          <motion.h1 
            {...fadeIn}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-[70px] leading-[1.1] font-medium mb-4 md:mb-6 text-black"
          >
            Stranded? We'll Get You Moving in <span className="text-primary">30 Minutes</span> or Less in Edmonton.
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-xl text-paragraph-gray mb-6 md:mb-8"
          >
            Don't let a breakdown derail your schedule. Whether it's a flat tire, a dead battery, or an emergency tow in Edmonton, our elite response team is available 24/7 to rescue you and your vehicle.
          </motion.p>
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 items-center"
          >
            <Link to="/request" className="bg-black hover:bg-primary text-white hover:text-black pl-5 md:pl-8 pr-2 py-2 rounded-full flex items-center gap-4 md:gap-10 transition-all duration-500 group shadow-lg hover:shadow-xl">
              <span className="font-medium text-xs sm:text-sm md:text-base">Request a tow now</span>
              <div className="bg-primary group-hover:bg-black p-2.5 md:p-3 rounded-full group-hover:-rotate-45 transition-all duration-500">
                <ArrowRight size={16} className="text-black group-hover:text-primary transition-colors duration-500" />
              </div>
            </Link>
            <a href="tel:8259779460" className="bg-white border border-[#0000001a] text-black px-4 py-2.5 md:px-10 md:py-5 rounded-full font-medium hover:border-[#00000080] transition-all text-xs sm:text-sm md:text-base">
              (825) 977-9460
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-20px overflow-hidden shadow-2xl border-4 border-white"
        >
          <img loading="lazy" 
            src="/home-hero.png" 
            alt="Apex Towing Emergency Service Truck in Edmonton" 
            className="w-full h-[260px] sm:h-[380px] md:h-[580px] object-cover hover:scale-105 transition-transform duration-1000"
            style={{ objectPosition: 'center 65%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          {/* Step bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-primary">
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between p-3 md:p-4 gap-0">
              {[
                { id: 1, text: "Request a Tow" },
                { id: 2, text: "Get a Fast Response" },
                { id: 3, text: "Safe Vehicle Transport" },
                { id: 4, text: "Back on the Road" }
              ].map((step) => (
                <div key={step.id} className="flex items-center justify-between gap-2 py-2 px-2 border-b border-black/10 lg:border-none last:border-none lg:w-auto">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="bg-black text-white px-2.5 py-1 rounded-60px text-[10px] md:text-[12px] font-bold shrink-0">Step {step.id}</span>
                    <span className="font-semibold text-black text-xs md:text-sm leading-tight truncate">{step.text}</span>
                  </div>
                  <ArrowRight size={14} className="text-black/40 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-12 md:py-32 bg-white">
      <div className="max-w-[1230px] mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-6xl font-medium text-black leading-tight mb-6 md:mb-12 max-w-4xl mx-auto"
          >
            Edmonton's #1 Choice for Rapid Roadside Recovery.
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-lg md:text-xl text-paragraph-gray leading-relaxed"
            >
              We aren't just a towing company; we're your safety net. Serving Edmonton, St. Albert, and Sherwood Park 24/7, we ensure that no driver in our region ever has to face the road alone.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-paragraph-gray leading-relaxed"
            >
              Precision, speed, and safety are the pillars of our local towing service. With a 30-minute average arrival time across Edmonton, we turn your emergency into a resolved situation.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-[1230px] mx-auto"
          >
            {[
              { title: "24/7 Edmonton Wide", icon: "/reliability_logo_1777169897427.png", desc: "Always on call, 24/7/365." },
              { title: "Rapid Arrival", icon: "/speed_efficiency_logo_1777169912100.png", desc: "On-site within 30 minutes or less." },
              { title: "Safety First", icon: "/safety_first_logo_1777169922737.png", desc: "Expert, damage-free recovery." },
              { title: "Certified Fleet", icon: "/professionalism_logo_1777169937556.png", desc: "Fully licensed and insured pros." }
            ].map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="group relative bg-white p-8 rounded-2xl border border-soft-gray hover:border-primary hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col items-center text-center"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative w-20 h-20 mb-6 p-1 rounded-full bg-light-gray group-hover:bg-primary transition-colors duration-500 flex items-center justify-center">
                  <img loading="lazy" 
                    src={item.icon} 
                    alt={item.title} 
                    className="w-14 h-14 object-contain group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mix-blend-multiply"
                  />
                </div>
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-primary-dark transition-colors">{item.title}</h3>
                <p className="text-sm text-paragraph-gray group-hover:text-black/80 transition-colors">{item.desc}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="p-1 rounded-full bg-black">
                    <Check size={12} className="text-primary" strokeWidth={4} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/about" className="inline-block bg-black text-white px-12 py-5 rounded-full font-bold hover:bg-primary hover:text-black transition-all shadow-xl hover:shadow-2xl">
              About our company
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <div className="max-w-[1230px] mx-auto px-3 sm:px-4 mb-12 md:mb-32">
      <div className="bg-light-gray rounded-10px p-4 sm:p-6 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
        {[
          { number: "30 Min", text: "Average response time to rescue you from the roadside." },
          { number: "10K+", text: "Successful rescues and vehicle recoveries completed." },
          { number: "20+", text: "Modern heavy-duty tow trucks ready for dispatch." },
          { number: "Always", text: "Available 24/7/365, ensuring you're never alone." }
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            {...fadeIn}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col"
          >
            <span className="text-2xl sm:text-3xl md:text-[46px] font-medium text-black mb-1 md:mb-2 leading-none">{stat.number}</span>
            <p className="text-dark-gray text-xs sm:text-sm md:text-base leading-[1.4]">{stat.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const roadside = [
    { title: "Flat Tire Change", description: "We provide fast and safe tire replacement so you can get back on the road without delay.", icon: <CircleDot size={20} /> },
    { title: "Jump Start Service", description: "We quickly restart dead batteries using professional-grade equipment, so you're never left stranded.", icon: <Battery size={20} /> },
    { title: "Car Lockout Assistance", description: "Locked out of your car? Our team responds fast to get you back inside and back on the road.", icon: <Lock size={20} /> }
  ];

  const towing = [
    { title: "Heavy-Duty Towing", description: "Towing for larger vehicles, including trucks, RVs, and commercial fleets.", icon: <Truck size={20} /> },
    { title: "Flatbed Towing", description: "Secure towing for luxury, classic, or damaged vehicles.", icon: <Tractor size={20} /> },
    { title: "Emergency Towing", description: "24/7 assistance for breakdowns, accidents, and stranded vehicles.", icon: <AlertTriangle size={20} /> }
  ];

  const [activeRoadside, setActiveRoadside] = useState<number | null>(null);
  const [activeTowing, setActiveTowing] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-32 bg-white font-sans">
      <div className="max-w-[1230px] mx-auto px-3 sm:px-4 grid lg:grid-cols-2 gap-10 lg:gap-8">
        {/* Roadside Section */}
        <div>
          <div className="mb-10 lg:mb-12">
            <span className="text-black font-semibold text-lg mb-4 block underline decoration-primary decoration-4 underline-offset-8">Roadside assistance services</span>
          </div>
          <div className="space-y-0 border-b border-soft-gray">
            {roadside.map((service, i) => (
              <div 
                key={i} 
                className="border-t border-soft-gray py-6 group cursor-pointer transition-colors"
                onClick={() => setActiveRoadside(activeRoadside === i ? null : i)}
              >
                <div className="flex justify-between items-center px-2 mb-2">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white shadow-sm border border-soft-gray rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                      <div className="bg-black w-full h-full rounded-full flex items-center justify-center text-primary">
                         {service.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-medium text-black tracking-tight leading-none">{service.title}</h3>
                  </div>
                  <div className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-transform duration-300 ${activeRoadside === i ? "rotate-45" : "group-hover:rotate-90"}`}>
                    <Plus size={20} className="text-black" />
                  </div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: activeRoadside === i ? "auto" : 0, opacity: activeRoadside === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pl-[72px] sm:pl-[88px] pr-4 sm:pr-8 pb-4 text-paragraph-gray text-sm sm:text-lg leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Towing Section */}
        <div>
          <div className="mb-10 lg:mb-12">
            <span className="text-black font-semibold text-lg mb-4 block underline decoration-primary decoration-4 underline-offset-8">Towing services</span>
          </div>
          <div className="space-y-0 border-b border-soft-gray">
            {towing.map((service, i) => (
              <div 
                key={i} 
                className="border-t border-soft-gray py-6 group cursor-pointer transition-colors"
                onClick={() => setActiveTowing(activeTowing === i ? null : i)}
              >
                <div className="flex justify-between items-center px-2 mb-2">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white shadow-sm border border-soft-gray rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                      <div className="bg-black w-full h-full rounded-full flex items-center justify-center text-primary">
                         {service.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium text-black tracking-tight leading-none">{service.title}</h3>
                  </div>
                  <div className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-transform duration-300 ${activeTowing === i ? "rotate-45" : "group-hover:rotate-90"}`}>
                    <Plus size={20} className="text-black" />
                  </div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: activeTowing === i ? "auto" : 0, opacity: activeTowing === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pl-[88px] pr-8 pb-4 text-paragraph-gray text-lg leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BannerCta = () => {
  return (
    <section className="px-4">
      <div className="max-w-[1230px] mx-auto relative rounded-10px overflow-hidden h-[280px] sm:h-[380px] md:h-[600px]">
        <img loading="lazy" 
          src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67d2bc621a21dd91bdf22ac8_pexels-jonathan-reynaga-861774-17429097%20(1).jpg" 
          alt="Apex Towing Night Roadside Assistance Vehicle in Edmonton" 
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 p-4 sm:p-6 md:p-14 flex flex-col justify-end md:flex-row md:justify-between md:items-end gap-4 md:gap-6">
          <div className="max-w-[600px]">
            <span className="text-primary font-bold text-xs sm:text-sm md:text-lg mb-2 md:mb-3 block uppercase tracking-wider">Roadside assistance</span>
            <h2 className="text-xl sm:text-3xl md:text-6xl font-bold !text-white leading-[1.1] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Emergency? Our Dispatchers are Standing By.
            </h2>
          </div>
          <Link to="/request" className="bg-white hover:bg-black text-black hover:text-primary pl-5 md:pl-8 pr-2 py-2 rounded-full flex items-center gap-4 md:gap-10 transition-all duration-500 group shrink-0 shadow-lg hover:shadow-xl w-fit">
            <span className="font-medium text-xs sm:text-sm md:text-base">Request a tow now</span>
            <div className="bg-primary group-hover:bg-white p-3 rounded-full group-hover:-rotate-45 transition-all duration-500">
              <ArrowRight size={18} className="text-black transition-colors duration-500" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[1230px] mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
        <div className="lg:w-1/2 w-full rounded-10px overflow-hidden h-[280px] sm:h-[380px] lg:max-h-[480px]">
          <img loading="lazy" 
            src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67e66774f3bed40f642d5774_pexels-19x14-8478232%20(1).webp" 
            alt="Certified Apex Towing Professional Recovery Team" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="lg:w-1/2 pl-0 lg:pl-10">
          <span className="text-black font-semibold text-base md:text-lg mb-4 block">Experts you can trust</span>
          <h2 className="text-3xl md:text-5xl font-medium text-black leading-tight mb-4 md:mb-6">
            Meet the Pros Behind the Rescue.
          </h2>
          <p className="text-base md:text-lg text-paragraph-gray mb-8 md:mb-10">
            Our certified professionals are dedicated to providing fast, reliable, and safe solutions whenever you need help.
          </p>
          <Link to="/about#team" className="bg-black text-white px-8 py-4 md:py-5 rounded-60px font-medium hover:bg-transparent hover:text-black border border-black transition-all inline-block">
            Meet our team
          </Link>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "How fast can you get to my location?", a: "Our average response time is 30 minutes or less, depending on your location and traffic conditions. We operate 24/7, so help is always available." },
    { q: "How much does towing cost?", a: "Towing costs depend on factors like distance, vehicle type, and service requirements. Contact us for a free quote based on your specific needs." },
    { q: "Do you offer roadside assistance, or just towing?", a: "Yes! In addition to towing, we provide roadside assistance, including jump-starts, tire changes, fuel delivery, and lockout services." },
    { q: "What areas do you serve?", a: "We offer towing and roadside assistance in Edmonton, St. Albert, Sherwood Park, and surrounding areas. If you're unsure whether we cover your location, give us a call!" },
    { q: "Is Apex Towing available 24/7?", a: "Yes! Our towing and roadside assistance services are available 24/7, ensuring help is always just a call away." }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-12 md:py-32 bg-white">
      <div className="max-w-[1230px] mx-auto px-3 sm:px-4 flex flex-col items-center">
        <motion.h2 
          {...fadeIn}
          className="text-2xl sm:text-4xl md:text-5xl font-medium text-black text-center mb-8 md:mb-16"
        >
          Frequently asked questions
        </motion.h2>
        <div className="w-full max-w-[980px] space-y-0 border-b border-soft-gray">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
              className={`border-t border-soft-gray py-6 transition-all ${idx === faqs.length - 1 ? "border-b" : ""}`}
            >
              <div 
                className="flex justify-between items-center cursor-pointer group py-2"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <h4 className={`text-base sm:text-xl md:text-2xl font-medium transition-colors duration-300 pr-4 ${openIndex === idx ? "text-black" : "text-paragraph-gray group-hover:text-black"}`}>
                  {faq.q}
                </h4>
                <div className={`transition-transform duration-500 ease-in-out ${openIndex === idx ? "rotate-45" : ""}`}>
                  <Plus size={24} className="text-paragraph-gray opacity-50" />
                </div>
              </div>
              {openIndex === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 pb-6 text-lg text-paragraph-gray leading-relaxed max-w-[800px]">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FindUs = () => {
  const address = "Edmonton, AB";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;

  return (
    <section id="find-us" className="py-12 md:py-32 bg-white">
      <div className="max-w-[1230px] mx-auto px-3 sm:px-4">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            {...fadeIn}
            className="order-2 lg:order-1"
          >
            <span className="text-black font-semibold text-lg mb-4 block underline decoration-primary decoration-4 underline-offset-8">Find us</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium text-black leading-tight mb-5 md:mb-8">
              Reliable recovery service across the region.
            </h2>
            <p className="text-sm sm:text-lg text-paragraph-gray mb-6 md:mb-10 max-w-[500px]">
              Our dispatch center is strategically located to ensure we can reach you anywhere within our service area in under 30 minutes.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black text-primary rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Our Location</h4>
                  <p className="text-paragraph-gray">{address}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black hover:bg-primary text-white hover:text-black px-5 sm:px-8 py-3 sm:py-5 rounded-60px font-medium flex items-center gap-2 sm:gap-3 transition-all duration-300 shadow-xl border border-black text-sm sm:text-base"
              >
                Google Maps
                <ExternalLink size={16} />
              </a>
              <a 
                href={appleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border-2 border-black text-black px-5 sm:px-8 py-3 sm:py-5 rounded-60px font-medium flex items-center gap-2 sm:gap-3 hover:bg-light-gray transition-all text-sm sm:text-base"
              >
                Apple Maps
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative group"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
            <div className="relative rounded-20px overflow-hidden shadow-2xl border-2 border-soft-gray aspect-square lg:aspect-video w-full h-full bg-light-gray">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d151818.825227!2d-113.633!3d53.546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0xc20f3a748c9038f!2sEdmonton%2C%20AB!5e0!3m2!1sen!2sca!4v1714080000000!5m2!1sen!2sca" 
                className="w-full h-full grayscale-[0.2] contrast-[1.1] brightness-[0.95] hover:grayscale-0 transition-all duration-700" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PrimaryCTA = () => {
  return (
    <section className="py-6 md:py-10 px-3 sm:px-4">
      <div className="max-w-[1230px] mx-auto bg-primary rounded-10px p-2 md:p-3">
        <div className="flex flex-col lg:flex-row bg-primary">
          <div className="lg:w-1/2 p-5 sm:p-6 md:p-10 lg:p-16">
            <div className="mb-5 md:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-[60px] font-medium leading-[1.1] text-black tracking-tighter">
                <span className="text-dark-gray block">Stuck in Edmonton?</span>
                Apex Towing is Just One Call Away.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-6 md:gap-12">
              <Link to="/request" className="bg-black hover:bg-primary text-white hover:text-black pl-6 md:pl-8 pr-2 py-2 rounded-full flex items-center gap-6 md:gap-10 transition-all duration-500 group shadow-2xl hover:shadow-none">
                <span className="font-medium text-sm md:text-base">Request a tow now</span>
                <div className="bg-primary group-hover:bg-black p-3 rounded-full group-hover:-rotate-45 transition-all duration-500">
                  <ArrowRight size={18} className="text-black group-hover:text-primary transition-colors duration-500" />
                </div>
              </Link>
              <div className="flex flex-col gap-3 md:gap-5">
                {[
                  "24/7 Emergency Service",
                  "Fast Response Time",
                  "Affordable & Transparent Pricing"
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-black font-medium text-sm md:text-lg">
                    <Check size={18} className="text-black shrink-0" strokeWidth={3} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[300px] md:h-[420px] lg:h-[560px] rounded-10px overflow-hidden">
            <img loading="lazy" 
              src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67d2e18af8d1c0c328adac3a_pexels-jakewymoore-12330350%20(1).webp" 
              alt="Apex Towing Flatbed Truck Service Edmonton" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <>
      <SEO 
        title="24/7 Emergency Towing & Roadside Assistance Edmonton"
        description="Need a tow in Edmonton? Apex Towing offers 24/7 emergency towing, flat tire changes, jump starts, and car lockout services. 30-minute response time guaranteed."
        keywords="towing edmonton, emergency towing edmonton, roadside assistance edmonton, flat tire change edmonton, car lockout service edmonton, jump start edmonton"
        schema={{
          "@context": "https://schema.org",
          "@type": "TowingService",
          "name": "Apex Towing",
          "image": "https://apex-towing-final.vercel.app/home-hero.png",
          "url": "https://apex-towing-final.vercel.app/",
          "telephone": "+1-825-977-9460",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Edmonton Area",
            "addressLocality": "Edmonton",
            "addressRegion": "AB",
            "addressCountry": "CA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 53.5461,
            "longitude": -113.4938
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "areaServed": ["Edmonton", "St. Albert", "Sherwood Park"]
        }}
      />
      <Hero />
      <About />
      <Stats />
      <Services />
      <BannerCta />
      <TeamSection />
      <GoogleReviews />
      <FAQ />
      <FindUs />
      <PrimaryCTA />
    </>
  );
}
