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
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RequestPage from "./pages/RequestPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AdminPage from "./pages/AdminPage";
import ScrollToTop from "./components/ScrollToTop";
import { services } from "./data/services";
import { subscribeEmail } from "./api/subscribeApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-soft-gray py-4">
      <div className="max-w-[1230px] mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-black uppercase">
          Apex Towing<span className="text-primary">.</span>
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
            href="tel:8259779460"
            className="hidden md:flex items-center gap-3 bg-white border border-soft-gray px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all font-bold text-black text-sm"
          >
            <Phone size={18} fill="currentColor" />
            <span>(825) 977-9460</span>
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
            href="tel:8259779460"
            className="flex items-center justify-center gap-2 bg-white border border-soft-gray px-8 py-3 rounded-full font-medium"
          >
            <Phone size={16} fill="currentColor" />
            <span>(825) 977-9460</span>
          </a>
        </div>
      )}
    </nav>
  );
};

// Keep existing sub-components but move them if they are only for home page
// Actually I moved them all to HomePage.tsx and AboutPage.tsx

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [subError, setSubError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    setSubError("");
    const result = await subscribeEmail(email);
    setSubLoading(false);
    if (result.success) {
      setSubSuccess(true);
      setEmail("");
    } else {
      setSubError("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="pt-16 md:pt-20 pb-10 bg-white">
      <div className="max-w-[1230px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 border-t border-b border-soft-gray py-10 md:py-16">
          <div className="grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-16 lg:gap-20">
            <div className="space-y-4 md:space-y-6">
              <div className="text-black font-medium uppercase text-xs md:text-sm tracking-widest">Sitemap</div>
              <div className="flex flex-col space-y-2 md:space-y-3">
                <Link to="/" className="hover:text-black font-medium text-sm md:text-base">Home</Link>
                <Link to="/about" className="hover:text-black font-medium text-sm md:text-base">About us</Link>
                <Link to="/services" className="hover:text-black font-medium text-sm md:text-base">Services</Link>
                <Link to="/testimonials" className="hover:text-black font-medium text-sm md:text-base">Testimonials</Link>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="text-black font-medium uppercase text-xs md:text-sm tracking-widest">Our Services</div>
              <div className="flex flex-col space-y-2 md:space-y-3">
                {services.slice(0, 4).map(s => (
                  <Link key={s.id} to={`/service/${s.id}`} className="hover:text-black font-medium text-paragraph-gray text-xs">{s.title}</Link>
                ))}
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="text-black font-medium uppercase text-xs md:text-sm tracking-widest">Socials</div>
              <div className="flex flex-col space-y-2 md:space-y-3">
                <a href="#" className="flex items-center gap-2 hover:text-black font-medium text-sm">
                  <Instagram size={16} /> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-black font-medium text-sm">
                  <Youtube size={16} /> Youtube
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-black font-medium text-sm">
                  <Facebook size={16} /> Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-[460px]">
            <h4 className="text-xl md:text-2xl font-medium text-black mb-6 md:mb-8 leading-tight">
              Subscribe to be in touch with latest news.
            </h4>

            {subSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-full"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <Check size={16} className="text-black" />
                </div>
                <p className="text-sm font-medium">You're subscribed! Check your inbox. 🎉</p>
              </motion.div>
            ) : (
              <form className="relative" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  disabled={subLoading}
                  className="w-full h-[64px] md:h-[72px] rounded-60px border border-soft-gray px-6 md:px-8 focus:border-paragraph-gray focus:outline-none focus:text-black transition-all bg-white text-sm md:text-base disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={subLoading}
                  className="absolute right-3 top-3 bottom-3 w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center hover:bg-black hover:text-primary transition-all duration-500 group disabled:opacity-60"
                >
                  {subLoading ? (
                    <svg className="animate-spin w-4 h-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : (
                    <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform" />
                  )}
                </button>
                {subError && (
                  <p className="mt-2 text-xs text-red-500 pl-4">{subError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs md:text-sm text-paragraph-gray">
          <div className="flex gap-2 items-center">
            <span>Copyright © 2026 Nishant Bihola. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-1 items-center">
              <span>Template by</span>
              <a href="#" className="text-black font-medium">Nishant Bihola</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for preloader to showcase the WOW factor
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ── Admin — completely standalone, no Navbar/Footer/Preloader ── */}
        <Route path="/admin" element={<AdminPage />} />

        {/* ── Public site ── */}
        <Route path="*" element={
          <>
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
                    APEX TOWING<span className="text-primary">.</span>
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
          </>
        } />
      </Routes>
    </Router>
  );
}
