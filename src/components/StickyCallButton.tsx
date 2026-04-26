import { motion, AnimatePresence } from "motion/react";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

const StickyCallButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-[400px]"
        >
          <a
            href="tel:8259779460"
            className="flex items-center justify-between bg-black text-white p-2 pl-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 hover:scale-[1.02] transition-transform group"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Available 24/7</span>
              <span className="text-sm font-bold">Call in 10 sec</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-[10px] font-medium text-white/60">Fast Response Promise</div>
                <div className="text-xs font-bold text-white">825-977-9460</div>
              </div>
              <div className="bg-primary p-4 rounded-full relative group-hover:bg-white transition-colors duration-500">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-primary/40 rounded-full"
                />
                <Phone size={20} className="text-black relative z-10" fill="currentColor" />
              </div>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCallButton;
