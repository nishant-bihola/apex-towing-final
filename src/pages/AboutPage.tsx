import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Check, 
  Award, 
  Target, 
  Users, 
  ShieldCheck, 
  History,
  Clock,
  MapPin,
  Truck,
  Phone
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const AboutPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-light-gray overflow-hidden">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="text-black font-semibold text-lg mb-6 block underline decoration-primary decoration-4 underline-offset-8">Our Story</span>
              <h1 className="text-5xl md:text-7xl font-medium text-black leading-[1.1] mb-8 tracking-tighter">
                A decade of reliable roadside care.
              </h1>
              <p className="text-xl text-paragraph-gray leading-relaxed max-w-2xl">
                From a single truck to a regional fleet, Apex Towing & Recovery was built on a simple promise: help people when they need it most, without delay.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-3xl"></div>
              <img loading="lazy" 
                src="/about-hero.png" 
                alt="Apex Towing Truck" 
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover border-4 border-white"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
              <img loading="lazy" 
                src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67d2bc621a21dd91bdf22ac8_pexels-jonathan-reynaga-861774-17429097%20(1).jpg" 
                alt="Our Mission" 
                className="relative rounded-10px shadow-2xl w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-medium text-black mb-10 tracking-tight">Our Mission</h2>
              <p className="text-lg text-paragraph-gray mb-12 leading-relaxed">
                Our mission is to provide the fastest, safest, and most professional towing and recovery services in the industry. We believe that a roadside emergency shouldn't ruin your day, and our team works tirelessly to ensure your peace of mind.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <ShieldCheck className="text-primary" />, title: "Safety First", desc: "We employ the highest safety standards for both our team and your vehicle." },
                  { icon: <Clock className="text-primary" />, title: "24/7 Availability", desc: "Emergencies don't sleep, and neither do we. We're here every hour of the day." },
                  { icon: <Target className="text-primary" />, title: "Precision", desc: "Our experienced operators handle every vehicle with care and precision." }
                ].map((value, i) => (
                  <motion.div 
                    key={i}
                    {...fadeIn}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shrink-0 shadow-lg border-2 border-primary/20 hover:scale-110 transition-transform duration-500">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-black mb-1">{value.title}</h4>
                      <p className="text-paragraph-gray">{value.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 !text-white">Our Journey</h2>
            <p className="text-paragraph-gray text-lg max-w-2xl mx-auto">Tracking our growth and highlights since the beginning.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-primary/20"></div>
            {[
              { year: "2009", title: "The Beginning", desc: "Started with one truck and a passionate founder in Edmonton." },
              { year: "2015", title: "Fleet Expansion", desc: "Expanded to 10 trucks and added heavy-duty towing capabilities." },
              { year: "2024", title: "The New Peak", desc: "Became the #1 rated towing service in Edmonton with 20+ specialized vehicles." }
            ].map((milestone, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative bg-white/5 p-8 rounded-xl border border-white/10"
              >
                <div className="w-12 h-12 bg-primary rounded-full absolute -top-6 left-8 flex items-center justify-center text-black font-bold">
                  {milestone.year}
                </div>
                <h3 className="text-2xl font-bold mt-4 mb-4 !text-white">{milestone.title}</h3>
                <p className="text-paragraph-gray leading-relaxed">{milestone.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 md:py-32">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-medium text-black mb-6">Meet the Experts</h2>
              <p className="text-paragraph-gray text-lg">Our certified professionals are the heartbeat of Apex Towing.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full border border-soft-gray flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all">
                  <ArrowRight className="rotate-180" />
               </div>
               <div className="w-12 h-12 rounded-full border border-soft-gray flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all">
                  <ArrowRight />
               </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "John Smith", role: "Founder & Lead Diver", img: "https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=400" },
              { name: "Sarah Johnson", role: "Fleet Manager", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
              { name: "Mike Wilson", role: "Heavy Duty Specialist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
              { name: "Emily Davis", role: "Customer Operations", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" }
            ].map((member, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 relative">
                  <img loading="lazy" src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className="text-xl font-bold text-black">{member.name}</h4>
                <p className="text-paragraph-gray">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 md:py-32 bg-primary">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 text-black">
            {[
              { icon: <Award className="w-10 h-10" />, label: "Industry Awards", value: "15+" },
              { icon: <Users className="w-10 h-10" />, label: "Happy Clients", value: "50k+" },
              { icon: <Truck className="w-10 h-10" />, label: "Miles Driven", value: "2M+" },
              { icon: <MapPin className="w-10 h-10" />, label: "Cities Covered", value: "45+" }
            ].map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="mb-4 flex justify-center md:justify-start">{item.icon}</div>
                <div className="text-4xl font-bold mb-2">{item.value}</div>
                <div className="font-medium text-black/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1230px] mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-medium text-black mb-10">Ready to get back on the road?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <Link to="/request" className="bg-black hover:bg-primary text-white hover:text-black pl-8 pr-2 py-2 rounded-full flex items-center gap-10 transition-all duration-500 group shadow-2xl hover:shadow-none shrink-0">
                <span className="font-medium uppercase tracking-widest text-[10px]">Request Service</span>
                <div className="bg-primary group-hover:bg-black p-3 rounded-full group-hover:rotate-[-45deg] transition-all duration-500">
                  <ArrowRight size={18} className="text-black group-hover:text-primary transition-colors duration-500" />
                </div>
             </Link>
              <a 
                href="tel:8259779460" 
                className="bg-black text-white hover:bg-white hover:text-black pl-8 pr-2 py-2 rounded-full flex items-center gap-6 transition-all duration-500 group shadow-lg hover:shadow-xl shrink-0"
              >
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[9px] font-bold opacity-40 group-hover:opacity-100 uppercase tracking-widest mb-1 transition-opacity text-white/40 group-hover:text-black/40">Call now 24/7</span>
                  <span className="text-xl font-bold">825-977-9460</span>
                </div>
                <div className="bg-primary group-hover:bg-black p-3.5 rounded-full transition-all duration-500">
                  <Phone size={18} className="text-black group-hover:text-primary transition-colors duration-500 fill-current" />
                </div>
              </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
