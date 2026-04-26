/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowRight, 
  ChevronDown, 
  ShoppingCart, 
  Menu, 
  Check, 
  Plus, 
  X,
  Instagram,
  Youtube,
  Facebook,
  CircleDot,
  Battery,
  Lock,
  Truck,
  Tractor,
  AlertTriangle,
  Phone
} from "lucide-react";
import { useState, useEffect } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RequestPage from "./pages/RequestPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import { services } from "./data/services";
import { bookTowRequest } from "./api/bookingApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-soft-gray py-4">
      <div className="max-w-[1230px] mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-black">
          APEXTOWING.
        </Link>

        {/* Middle Links */}
        <div className="hidden lg:flex items-center space-x-10 text-[13px] font-bold tracking-widest text-black">
          <div 
            className="relative h-full py-2 flex items-center group cursor-pointer"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <Link to="/services" className="hover:text-paragraph-gray transition-colors flex items-center gap-1 uppercase">
              SERVICES
              <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </Link>
            
            {/* Dropdown menu */}
            {isServicesOpen && (
              <div className="absolute top-full left-0 pt-4 w-[350px]">
                <div className="bg-white border border-soft-gray rounded-10px shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-4 grid gap-2">
                    {services.map((service) => (
                      <Link 
                        key={service.id}
                        to={`/service/${service.id}`}
                        className="flex flex-col p-4 rounded-lg hover:bg-light-gray transition-colors group/item"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="text-[12px] font-bold text-black uppercase tracking-tight group-hover/item:text-primary transition-colors">
                          {service.title}
                        </span>
                        <span className="text-[11px] font-medium text-paragraph-gray mt-1 line-clamp-1">
                          {service.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="bg-light-gray p-4">
                    <Link to="/services" className="text-[11px] font-bold text-black hover:text-primary transition-colors flex items-center justify-center gap-2">
                      VIEW ALL SERVICES <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to="/testimonials" className="hover:text-primary transition-colors uppercase">TESTIMONIALS</Link>
          <Link to="/about" className="hover:text-primary transition-colors uppercase">ABOUT</Link>
          <Link to="/#find-us" className="hover:text-primary transition-colors uppercase">FIND US</Link>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <a
            href="tel:4805550103"
            className="hidden md:flex items-center gap-3 bg-white border border-soft-gray px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all font-bold text-black text-sm"
          >
            <Phone size={18} fill="currentColor" />
            <span>(480) 555-0103</span>
          </a>
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-soft-gray p-6 flex flex-col space-y-6 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link to="/services" className="text-sm font-bold tracking-widest uppercase" onClick={() => setIsOpen(false)}>SERVICES</Link>
            <div className="pl-4 flex flex-col space-y-3 border-l-2 border-primary/20">
              {services.map(s => (
                <Link 
                  key={s.id} 
                  to={`/service/${s.id}`} 
                  className="text-[11px] font-bold text-paragraph-gray hover:text-primary uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/testimonials" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>TESTIMONIALS</Link>
          <Link to="/about" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>ABOUT</Link>
          <Link to="/#find-us" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>FIND US</Link>
          <a
            href="tel:4805550103"
            className="flex items-center justify-center gap-2 bg-white border border-soft-gray px-8 py-3 rounded-full font-medium"
          >
            <Phone size={16} fill="currentColor" />
            <span>(480) 555-0103</span>
          </a>
        </div>
      )}
    </nav>
  );
};

// Keep existing sub-components but move them if they are only for home page
// Actually I moved them all to HomePage.tsx and AboutPage.tsx

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-white">
      <div className="max-w-[1230px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 border-t border-b border-soft-gray py-16">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-20">
            <div className="space-y-6">
              <div className="text-black font-medium uppercase text-sm tracking-widest">Sitemap</div>
              <div className="flex flex-col space-y-3">
                <Link to="/" className="hover:text-black font-medium">Home</Link>
                <Link to="/about" className="hover:text-black font-medium">About us</Link>
                <Link to="/services" className="hover:text-black font-medium">Services</Link>
                <Link to="/testimonials" className="hover:text-black font-medium">Testimonials</Link>
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-black font-medium uppercase text-sm tracking-widest">Our Services</div>
              <div className="flex flex-col space-y-3">
                {services.slice(0, 4).map(s => (
                  <Link key={s.id} to={`/service/${s.id}`} className="hover:text-black font-medium text-paragraph-gray text-xs">{s.title}</Link>
                ))}
              </div>
            </div>
            <div className="space-y-6 md:pl-10">
              <div className="text-black font-medium uppercase text-sm tracking-widest">Socials</div>
              <div className="flex flex-col space-y-3">
                <a href="#" className="flex items-center gap-2 hover:text-black font-medium">
                  <Instagram size={18} /> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-black font-medium">
                  <Youtube size={18} /> Youtube
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-black font-medium">
                  <Facebook size={18} /> Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-[460px]">
            <h4 className="text-2xl font-medium text-black mb-8 leading-tight">
              Subscribe to be in touch with latest news.
            </h4>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full h-[72px] rounded-60px border border-soft-gray px-8 focus:border-paragraph-gray focus:outline-none focus:text-black transition-all bg-white"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-3 bottom-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-black hover:text-primary transition-all duration-500 group"
              >
                <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-paragraph-gray">
          <div className="flex gap-2 items-center">
            <span>© Apex Towing & Recovery. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-1 items-center">
              <span>Template by</span>
              <a href="#" className="text-black font-medium">Apex Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for preloader to showcase the WOW factor
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Listen for custom events from the ElevenLabs widget
    // Note: The widget emits events when tools are called or state changes
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.source === 'elevenlabs-convai' && event.data?.type === 'tool_call') {
        const { tool, arguments: args } = event.data;
        console.log('AI Tool Call:', tool, args);
        
        if (tool === 'book_tow') {
          setToastMessage("AI is processing your tow booking...");
          setShowToast(true);
          
          try {
            const response = await bookTowRequest({
              name: args?.name || "AI User",
              phone: args?.phone || "Unknown",
              serviceType: args?.service_type || "Towing",
              location: args?.location || "Not provided",
              timestamp: new Date().toISOString()
            });
            
            if (response.success) {
              setToastMessage("Booking confirmed! Notification sent to nishant15bihola@gmail.com.");
              setTimeout(() => setShowToast(false), 5000);
            }
          } catch (error) {
            console.error("AI Booking failed:", error);
            setToastMessage("AI Booking failed to save.");
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Premium Preloader */}
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8"
            >
              APEXTOWING<span className="text-primary">.</span>
            </motion.div>
            
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-primary"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase"
            >
              Elevating Towing Services
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
          />
        </motion.div>
      )}

      <div className={`font-sans antialiased bg-white min-h-screen relative transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        
        {/* Success Notification for AI Booking */}
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 right-8 z-[200] bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-primary/30"
          >
            <div className="bg-primary p-2 rounded-full">
              <Check size={18} className="text-black" />
            </div>
            <span className="font-medium">{toastMessage}</span>
            <button onClick={() => setShowToast(false)} className="ml-4 hover:text-primary transition-colors">
              <X size={18} />
            </button>
          </motion.div>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
        </Routes>
        <Footer />
      </div>
      <Analytics />
    </Router>
  );
}
