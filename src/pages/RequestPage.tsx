import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function RequestPage() {
  return (
    <div className="pt-24 min-h-screen bg-light-gray flex items-center justify-center p-4">
      <div className="max-w-[1230px] w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row p-4 md:p-10 gap-10 md:gap-20">
        {/* Left Image */}
        <div className="md:w-1/2 rounded-xl overflow-hidden">
          <img 
            src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67d2e18af8d1c0c328adac3a_pexels-jakewymoore-12330350%20(1).webp" 
            alt="Car on trailer" 
            className="w-full h-full object-cover min-h-[400px] md:min-h-[600px]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 flex flex-col justify-center py-6 md:pr-10">
          <h1 className="text-5xl md:text-6xl font-medium text-black mb-12 tracking-tight leading-tight">
            Request towing assistance
          </h1>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Full name" 
                className="w-full px-6 py-5 rounded-full border border-soft-gray focus:border-black focus:outline-none text-lg transition-colors placeholder:text-paragraph-gray/60"
              />
            </div>
            <div className="relative">
              <input 
                type="tel" 
                placeholder="Phone number" 
                className="w-full px-6 py-5 rounded-full border border-soft-gray focus:border-black focus:outline-none text-lg transition-colors placeholder:text-paragraph-gray/60"
              />
            </div>
            <div className="relative">
              <textarea 
                placeholder="Message" 
                rows={5}
                className="w-full px-6 py-5 rounded-3xl border border-soft-gray focus:border-black focus:outline-none text-lg transition-colors placeholder:text-paragraph-gray/60 resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <button className="bg-black hover:bg-primary text-white hover:text-black pl-10 pr-2 py-2 rounded-full flex items-center gap-14 transition-all duration-500 group w-fit shadow-xl hover:shadow-2xl">
                <span className="font-medium text-lg">Send message</span>
                <div className="bg-primary group-hover:bg-black p-4 rounded-full group-hover:rotate-[-45deg] transition-all duration-500">
                  <ArrowRight size={20} className="text-black group-hover:text-primary transition-colors duration-500" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
