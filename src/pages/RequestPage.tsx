import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import DateTimePicker from "../components/DateTimePicker";
import { submitServiceRequest } from "../api/bookingApi";
import { services } from "../data/services";

export default function RequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // New email field
    phone: "",
    service: "",
    serviceDate: "", // New field for requested time
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsSubmitting(true);
    try {
      await submitServiceRequest({
        name: formData.name,
        email: formData.email, // Passing email to API
        phone: formData.phone,
        serviceType: formData.service || "General Request",
        requestedTime: formData.serviceDate, // Passing requested time
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: "Website Form"
      });
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", service: "", serviceDate: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      serviceDate: value
    }));
  };

  return (
    <div className="pt-24 min-h-screen bg-light-gray flex items-center justify-center p-4">
      <div className="max-w-[1230px] w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row p-4 md:p-10 gap-10 md:gap-20">
        {/* Left Image */}
        <div className="md:w-1/2 rounded-xl overflow-hidden">
          <img loading="lazy" 
            src="https://cdn.prod.website-files.com/67d1666f8b02642a9ce876dc/67d2e18af8d1c0c328adac3a_pexels-jakewymoore-12330350%20(1).webp" 
            alt="Car on trailer" 
            className="w-full h-full object-cover min-h-[400px] md:min-h-[600px]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 flex flex-col justify-center py-6 md:pr-10">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <CheckCircle2 size={80} className="text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-black">Thank you!</h2>
              <p>Your request has been received. We've added this to your Apex Towing database and notified your client at <strong>{formData.email}</strong>.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-black font-bold underline underline-offset-8 decoration-primary decoration-4 hover:text-primary transition-colors"
              >
                Send another request
              </button>
            </motion.div>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl font-medium text-black mb-12 tracking-tight leading-tight">
                Request towing assistance
              </h1>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name" 
                    required
                    className="w-full px-6 py-5 rounded-full border border-soft-gray focus:border-black focus:outline-none text-lg transition-colors placeholder:text-paragraph-gray/60"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address" 
                    required
                    className="w-full px-6 py-5 rounded-full border border-soft-gray focus:border-black focus:outline-none text-lg transition-colors placeholder:text-paragraph-gray/60"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number" 
                    required
                    className="w-full px-6 py-5 rounded-full border border-soft-gray focus:border-black focus:outline-none text-lg transition-colors placeholder:text-paragraph-gray/60"
                  />
                </div>
                <div className="relative">
                  <DateTimePicker 
                    value={formData.serviceDate}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="relative">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message / Details (Optional)" 
                    rows={5}
                    className="w-full px-6 py-5 rounded-3xl border border-soft-gray focus:border-black focus:outline-none text-lg transition-colors placeholder:text-paragraph-gray/60 resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={isSubmitting}
                    className="bg-black hover:bg-primary text-white hover:text-black pl-10 pr-2 py-2 rounded-full flex items-center gap-14 transition-all duration-500 group w-fit shadow-xl hover:shadow-2xl disabled:opacity-50"
                  >
                    <span className="font-medium text-lg">
                      {isSubmitting ? "Sending..." : "Send message"}
                    </span>
                    <div className="bg-primary group-hover:bg-black p-4 rounded-full group-hover:rotate-[-45deg] transition-all duration-500">
                      {isSubmitting ? (
                        <Loader2 size={20} className="text-black animate-spin" />
                      ) : (
                        <ArrowRight size={20} className="text-black group-hover:text-primary transition-colors duration-500" />
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
