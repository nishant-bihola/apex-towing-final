import { motion } from "motion/react";
import { Star, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const TestimonialsPage = () => {
  const mainTestimonials = [
    {
      title: "Fast, reliable, and professional!",
      text: "My car broke down on the highway at night, and AutoTowing arrived in less than 30 minutes. The driver was super friendly and made the whole process stress-free. Highly recommend!",
      author: "Michael Drowes",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
      bg: "bg-light-gray"
    },
    {
      title: "Excellent towing service!",
      text: "I called the company, and within 30 minutes, a powerful tow truck arrived. They pulled my car out without any damage and handled everything very carefully. Thank you for the quick help!",
      author: "Jessica Holland",
      image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=80&w=800",
      bg: "bg-primary/20",
      reverse: true
    },
    {
      title: "Trustworthy and affordable",
      text: "I needed my SUV transported to another city, and this company offered the best price. It's great to know there's a reliable service like this when you need it!",
      author: "Jason Mitchel",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
      bg: "bg-primary/10"
    }
  ];

  const gridTestimonials = [
    { name: "John Matthews", text: "I was stranded on the highway late at night, and Auto Towing came to my rescue. The team arrived quickly and was incredibly professional. They made a stressful situation much easier.", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" },
    { name: "Sarah Lewis", text: "Excellent service! My car broke down in the middle of a busy intersection, and they showed up within 20 minutes. The driver was friendly, helpful, and made sure I was safe.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" },
    { name: "Michael Bradley", text: "Auto Towing went above and beyond! After an accident, they quickly transported my vehicle to the shop. They kept me informed the whole time and handled everything with care.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" },
    { name: "Emily Roberts", text: "Locked myself out of my car in the parking lot, and Auto Towing was there in no time. Their locksmith service was quick and affordable, and I was back inside my car within minutes.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
    { name: "James Thompson", text: "I needed a flatbed to tow my vintage car, and I couldn't be more impressed with Auto Towing's attention to detail. The driver took extra care to ensure the car was safely secured.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
    { name: "Laura Green", text: "I ran out of gas on the highway, and Auto Towing came to deliver fuel right to my location. The whole process was seamless, and their customer service was outstanding.", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=100" }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1230px] mx-auto px-4 text-center">
          <motion.h1 
            {...fadeIn}
            className="text-5xl md:text-7xl font-medium text-black mb-8 tracking-tighter"
          >
            Hear from our satisfied clients
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-paragraph-gray max-w-2xl mx-auto leading-relaxed"
          >
            With years of experience and a commitment to service, our team is here for you in every emergency.
          </motion.p>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="pb-20 md:pb-32 px-4">
        <div className="max-w-[1230px] mx-auto space-y-20 md:space-y-32">
          {mainTestimonials.map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className={`flex flex-col ${item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20`}
            >
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-10px overflow-hidden shadow-2xl">
                <img src={item.image} alt={item.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className={`w-full md:w-1/2 p-10 md:p-16 rounded-10px ${item.bg} flex flex-col justify-center h-full min-h-[350px]`}>
                <h2 className="text-3xl md:text-4xl font-medium text-black mb-6 leading-tight select-none">
                  “{item.title}”
                </h2>
                <p className="text-lg text-paragraph-gray mb-8 leading-relaxed">
                  {item.text}
                </p>
                <div className="font-bold text-black text-lg">{item.author}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grid Testimonials */}
      <section className="py-20 md:py-32 bg-light-gray">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridTestimonials.map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-10px shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div className="font-bold text-black">{item.name}</div>
                </div>
                <p className="text-paragraph-gray leading-relaxed italic">
                  "{item.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1230px] mx-auto px-4">
          <div className="text-center">
            <h2 className="text-5xl md:text-[60px] font-medium leading-[1.1] text-black tracking-tighter mb-10">
              <span className="text-dark-gray block">Need help?</span>
              AutoTowing is just a call away!
            </h2>
            <div className="flex justify-center">
              <Link to="/request" className="bg-black hover:bg-primary text-white hover:text-black pl-8 pr-2 py-2 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-10 group">
                <span className="font-medium">Request a tow now</span>
                <div className="bg-primary group-hover:bg-black p-3 rounded-full group-hover:rotate-[-45deg] transition-all duration-500">
                  <ArrowRight size={18} className="text-black group-hover:text-primary transition-colors duration-500" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
