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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const Hero = () => {
  return (
    <section className="pt-32 pb-0 bg-white overflow-hidden">
      <div className="max-w-[1230px] mx-auto px-4">
        <div className="max-w-[660px] mb-12">
          <motion.h1 
            {...fadeIn}
            className="text-5xl md:text-6xl lg:text-[70px] leading-[1.1] font-medium mb-6 text-black"
          >
            Fast, reliable, roadside assistance
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-paragraph-gray mb-8"
          >
            Whether you're dealing with a breakdown, a flat tire, or an unexpected roadside emergency, our team is available 24/7 to get you back on track.
          </motion.p>
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link to="/request" className="bg-black hover:bg-primary text-white hover:text-black pl-8 pr-2 py-2 rounded-full flex items-center gap-10 transition-all duration-500 group shadow-lg hover:shadow-xl">
              <span className="font-medium">Request a tow now</span>
              <div className="bg-primary group-hover:bg-black p-3 rounded-full group-hover:-rotate-45 transition-all duration-500">
                <ArrowRight size={18} className="text-black group-hover:text-primary transition-colors duration-500" />
              </div>
            </Link>
            <a href="tel:4805550103" className="bg-white border border-[#0000001a] text-black px-10 py-5 rounded-full font-medium hover:border-[#00000080] transition-all">
              +(480) 555-0103
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
            alt="Towing Service Truck" 
            className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-primary p-4 md:p-6 flex flex-wrap justify-between items-center gap-4">
            {[
              { id: 1, text: "Request a Tow" },
              { id: 2, text: "Get a Fast Response" },
              { id: 3, text: "Safe Vehicle Transport" },
              { id: 4, text: "Back on the Road" }
            ].map((step, idx, arr) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="bg-black text-white px-4 py-1.5 rounded-60px text-[12px] font-bold">Step {step.id}</span>
                  <span className="font-semibold text-black text-sm md:text-base">{step.text}</span>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight size={18} className="hidden lg:block text-black/30" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[1230px] mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-medium text-black leading-tight mb-12 max-w-4xl mx-auto"
          >
            We are committed to providing fast, reliable, and professional roadside assistance.
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-paragraph-gray leading-relaxed"
            >
              We are available 24/7, 365 days a year, ensuring help is always within reach when you need it most.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-paragraph-gray leading-relaxed"
            >
              With an average response time of 30 minutes, we prioritize getting you back on the road quickly and safely.
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
              { title: "Reliability", icon: "/reliability_logo_1777169897427.png", desc: "Count on us 24/7." },
              { title: "Speed & Efficiency", icon: "/speed_efficiency_logo_1777169912100.png", desc: "30-minute response." },
              { title: "Safety First", icon: "/safety_first_logo_1777169922737.png", desc: "Expert handling." },
              { title: "Professionalism", icon: "/professionalism_logo_1777169937556.png", desc: "Certified specialists." }
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
    <div className="max-w-[1230px] mx-auto px-4 mb-20 md:mb-32">
      <div className="bg-light-gray rounded-10px p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { number: "30 Min", text: "Average response time to get you back on the road." },
          { number: "10K+", text: "Vehicles successfully towed and assisted." },
          { number: "20+", text: "Tow trucks in our fleet, ready to assist." },
          { number: "365 days", text: "Always on standby, even on holidays." }
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            {...fadeIn}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col"
          >
            <span className="text-4xl md:text-[46px] font-medium text-black mb-2 leading-none">{stat.number}</span>
            <p className="text-dark-gray text-base leading-[1.4] max-w-[185px]">{stat.text}</p>
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
    <section className="py-20 md:py-32 bg-white font-sans">
      <div className="max-w-[1230px] mx-auto px-4 grid lg:grid-cols-2 gap-16 lg:gap-8">
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
                    <h3 className="text-2xl md:text-3xl font-medium text-black tracking-tight leading-none">{service.title}</h3>
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
                  <p className="pl-[88px] pr-8 pb-4 text-paragraph-gray text-lg leading-relaxed">
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
      <div className="max-w-[1230px] mx-auto relative rounded-10px overflow-hidden h-[600px]">
        <img loading="lazy" 
          src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67d2bc621a21dd91bdf22ac8_pexels-jonathan-reynaga-861774-17429097%20(1).jpg" 
          alt="Tow Truck at Night" 
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 p-8 md:p-14 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-[600px]">
            <span className="text-primary font-bold text-lg mb-4 block uppercase tracking-wider">Roadside assistance</span>
            <h2 className="text-4xl md:text-6xl font-bold !text-white leading-[1.1] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Fast & reliable help anytime, anywhere.
            </h2>
          </div>
          <Link to="/request" className="bg-white hover:bg-black text-black hover:text-primary pl-8 pr-2 py-2 rounded-full flex items-center gap-10 transition-all duration-500 group shrink-0 shadow-lg hover:shadow-xl">
            <span className="font-medium">Request a tow now</span>
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
      <div className="max-w-[1230px] mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 w-full rounded-10px overflow-hidden max-h-[480px]">
          <img loading="lazy" 
            src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67e66774f3bed40f642d5774_pexels-19x14-8478232%20(1).webp" 
            alt="Our Mechanic Team" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="lg:w-1/2 pl-0 lg:pl-10">
          <span className="text-black font-semibold text-lg mb-6 block">Experts you can trust</span>
          <h2 className="text-4xl md:text-5xl font-medium text-black leading-tight mb-6">
            Our team is the backbone of our service.
          </h2>
          <p className="text-lg text-paragraph-gray mb-10 max-w-[85%]">
            Our certified professionals are dedicated to providing fast, reliable, and safe solutions whenever you need help.
          </p>
          <Link to="/about#team" className="bg-black text-white px-8 py-5 rounded-60px font-medium hover:bg-transparent hover:text-black border border-black transition-all">
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
    { q: "What areas do you serve?", a: "We offer towing and roadside assistance in [your service areas]. If you're unsure whether we cover your location, give us a call!" },
    { q: "Is AutoTowing available 24/7?", a: "Yes! Our towing and roadside assistance services are available 24/7, ensuring help is always just a call away." }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[1230px] mx-auto px-4 flex flex-col items-center">
        <motion.h2 
          {...fadeIn}
          className="text-4xl md:text-5xl font-medium text-black text-center mb-16"
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
                <h4 className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${openIndex === idx ? "text-black" : "text-paragraph-gray group-hover:text-black"}`}>
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
  const address = "2401 W University Dr, Tempe, AZ 85281";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;

  return (
    <section id="find-us" className="py-20 md:py-32 bg-white">
      <div className="max-w-[1230px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            {...fadeIn}
            className="order-2 lg:order-1"
          >
            <span className="text-black font-semibold text-lg mb-4 block underline decoration-primary decoration-4 underline-offset-8">Find us</span>
            <h2 className="text-4xl md:text-5xl font-medium text-black leading-tight mb-8">
              Reliable recovery service across the region.
            </h2>
            <p className="text-lg text-paragraph-gray mb-10 max-w-[500px]">
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

            <div className="flex flex-wrap gap-4">
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black hover:bg-primary text-white hover:text-black px-8 py-5 rounded-60px font-medium flex items-center gap-3 transition-all duration-300 shadow-xl border border-black"
              >
                Open in Google Maps
                <ExternalLink size={18} />
              </a>
              <a 
                href={appleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border-2 border-black text-black px-8 py-5 rounded-60px font-medium flex items-center gap-3 hover:bg-light-gray transition-all"
              >
                Open in Apple Maps
                <ExternalLink size={18} />
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13319.46782414704!2d-111.979603!3d33.424193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b0ed69542b6b5%3A0xe5f86641525ba70!2s2401%20W%20University%20Dr%2C%20Tempe%2C%20AZ%2085281!5e0!3m2!1sen!2sus!4v1714080000000!5m2!1sen!2sus" 
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
    <section className="py-10 px-4">
      <div className="max-w-[1230px] mx-auto bg-primary rounded-10px p-2 md:p-3">
        <div className="flex flex-col lg:flex-row bg-primary">
          <div className="lg:w-1/2 p-10 lg:p-16">
            <div className="mb-10">
              <h2 className="text-4xl md:text-[60px] font-medium leading-[1.1] text-black tracking-tighter">
                <span className="text-dark-gray block">Need help?</span>
                AutoTowing is just a call away!
              </h2>
            </div>
            <div className="flex flex-col items-start gap-10 md:gap-12">
              <Link to="/request" className="bg-black hover:bg-primary text-white hover:text-black pl-8 pr-2 py-2 rounded-full flex items-center gap-10 transition-all duration-500 group shadow-2xl hover:shadow-none">
                <span className="font-medium">Request a tow now</span>
                <div className="bg-primary group-hover:bg-black p-3 rounded-full group-hover:-rotate-45 transition-all duration-500">
                  <ArrowRight size={18} className="text-black group-hover:text-primary transition-colors duration-500" />
                </div>
              </Link>
              <div className="flex flex-col gap-5">
                {[
                  "24/7 Emergency Service",
                  "Fast Response Time",
                  "Affordable & Transparent Pricing"
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-black font-medium text-lg">
                    <Check size={20} className="text-black" strokeWidth={3} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[560px] rounded-10px overflow-hidden">
            <img loading="lazy" 
              src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67d2e18af8d1c0c328adac3a_pexels-jakewymoore-12330350%20(1).webp" 
              alt="Professional Towing" 
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
      <Hero />
      <About />
      <Stats />
      <Services />
      <BannerCta />
      <TeamSection />
      <FAQ />
      <FindUs />
      <PrimaryCTA />
    </>
  );
}
