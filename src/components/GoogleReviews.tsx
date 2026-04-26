import { motion } from "motion/react";
import { Star, MessageCircle, Quote } from "lucide-react";

const GoogleReviews = () => {
  const reviews = [
    {
      name: "Michael Drowes",
      date: "2 days ago",
      text: "My car broke down on the highway at night, and Apex Towing arrived in less than 30 minutes. The driver was super friendly and made the whole process stress-free. Highly recommend!",
      rating: 5,
    },
    {
      name: "Jessica Holland",
      date: "1 week ago",
      text: "I called the company, and within 30 minutes, a powerful tow truck arrived. They pulled my car out without any damage and handled everything very carefully. Thank you for the quick help!",
      rating: 5,
    },
    {
      name: "Jason Mitchel",
      date: "3 weeks ago",
      text: "I needed my SUV transported to another city, and this company offered the best price. It's great to know there's a reliable service like this when you need it!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-32 bg-[#fdfdfd] border-y border-soft-gray overflow-hidden">
      <div className="max-w-[1230px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-2xl w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4 md:mb-6"
            >
              <div className="flex bg-[#FBBC04]/10 p-1.5 md:p-2 rounded-lg">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#FBBC04] text-[#FBBC04] md:w-[18px] md:h-[18px]" />
                ))}
              </div>
              <span className="font-bold text-black text-sm md:text-lg">5.0 Average Rating</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-6xl font-medium text-black leading-tight tracking-tighter"
            >
              Trusted by Hundreds of <span className="text-primary underline decoration-black/10 underline-offset-4 md:underline-offset-8">Edmonton Drivers</span>.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full md:w-auto"
          >
            <a 
              href="https://www.google.com/search?q=Apex+Towing+Edmonton#lrd=0x53a0224580deff23:0xc20f3a748c9038f,3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-black text-white px-6 md:px-8 py-4 md:py-5 rounded-full font-bold hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-3 md:gap-4 shadow-xl group text-sm md:text-base w-full md:w-auto"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
              </svg>
              Write a Google Review
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
          <div className="absolute -top-10 -left-10 text-primary/10 -z-10 hidden lg:block">
            <Quote size={200} />
          </div>
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border border-soft-gray shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group"
            >
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-yellow-500 rounded-full flex items-center justify-center text-black font-black text-lg md:text-xl shadow-lg border-2 border-white">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-black text-base md:text-lg group-hover:text-primary transition-colors leading-tight">{review.name}</span>
                    <span className="text-[10px] md:text-xs text-paragraph-gray font-medium uppercase tracking-widest">{review.date}</span>
                  </div>
                </div>
                <div className="bg-[#4285F4]/10 p-1.5 md:p-2 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-[#4285F4]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
                  </svg>
                </div>
              </div>
              <div className="flex gap-1 mb-4 md:mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#FBBC04] text-[#FBBC04] md:w-[16px] md:h-[16px]" />
                ))}
              </div>
              <p className="text-paragraph-gray text-base md:text-lg leading-relaxed mb-6 md:mb-8 relative z-10">
                "{review.text}"
              </p>
              <div className="flex items-center gap-2 md:gap-3 pt-5 md:pt-6 border-t border-soft-gray">
                <div className="bg-green-500 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse"></div>
                <span className="text-[10px] md:text-sm font-bold text-black/40 uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
                  <MessageCircle size={12} className="md:w-[14px] md:h-[14px]" /> Verified Google Review
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 border-t border-soft-gray pt-10 md:pt-12"
        >
          <img src="/google-logo-gray.png" alt="Google" className="h-5 md:h-6 opacity-30 grayscale" />
          <div className="hidden sm:block h-8 w-px bg-soft-gray"></div>
          <p className="text-paragraph-gray font-medium text-sm md:text-base text-center">Over 500+ five-star reviews in the Edmonton area</p>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviews;
