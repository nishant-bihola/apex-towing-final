import { motion } from "motion/react";
import { Star, CheckCircle2 } from "lucide-react";

const reviews = [
  {
    name: "James Robertson",
    date: "2 days ago",
    content: "Stranded on the Henday at 3 AM. Apex was there in 15 minutes. Best towing service in Edmonton, hands down. No waiting, no stress.",
    rating: 5
  },
  {
    name: "Sarah Miller",
    date: "1 week ago",
    content: "Very professional team. They handled my luxury car with extreme care. The 'Fast Response Promise' is real. Highly recommended!",
    rating: 5
  },
  {
    name: "David Chen",
    date: "2 weeks ago",
    content: "Excellent roadside assistance. Had a flat tire in the middle of a snowstorm and they arrived faster than any other company I called.",
    rating: 5
  }
];

const GoogleReviews = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#FFD700" className="text-[#FFD700]" />
              ))}
            </div>
            <span className="font-bold text-black">4.9/5 Rating</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-black">Trusted by Edmonton drivers</h2>
        </div>
        <div className="bg-light-gray px-6 py-3 rounded-full flex items-center gap-3 border border-soft-gray">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm font-bold text-black">Verified Google Reviews</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-2xl border border-soft-gray hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="font-bold text-black flex items-center gap-2">
                    {review.name}
                    <CheckCircle2 size={14} className="text-blue-500" fill="currentColor" />
                  </span>
                  <span className="text-xs text-paragraph-gray">{review.date}</span>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#FFD700" className="text-[#FFD700]" />
                  ))}
                </div>
              </div>
              <p className="text-paragraph-gray leading-relaxed italic">"{review.content}"</p>
            </div>
            <div className="mt-8 pt-6 border-t border-soft-gray flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">Verified Customer</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GoogleReviews;
