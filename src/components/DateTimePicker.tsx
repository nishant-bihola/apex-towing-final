import { useState, useEffect } from "react";
import { Calendar, Clock, Check } from "lucide-react";

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("ASAP");

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // Generate time slots (every hour)
  const timeSlots = [
    "ASAP",
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
  ];

  useEffect(() => {
    const dateStr = selectedDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
    
    if (selectedTime === "ASAP") {
      onChange(`${dateStr} (ASAP)`);
    } else {
      onChange(`${dateStr} at ${selectedTime}`);
    }
  }, [selectedDate, selectedTime]);

  return (
    <div className="space-y-8 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-soft-gray shadow-sm">
      {/* Date Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-black/40 px-2">
          <Calendar size={16} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Select Date</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
          {dates.map((date, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                selectedDate.toDateString() === date.toDateString()
                  ? "bg-black border-black text-white shadow-xl scale-105"
                  : "bg-white border-soft-gray text-paragraph-gray hover:border-black/20"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="text-xl font-bold tracking-tighter">
                {date.getDate()}
              </span>
              <span className="text-[10px] font-bold uppercase opacity-60 mt-1">
                {date.toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-black/40 px-2">
          <Clock size={16} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Select Time</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`py-3 px-4 rounded-xl text-[11px] font-bold transition-all duration-300 border flex items-center justify-center gap-2 ${
                selectedTime === time
                  ? "bg-primary border-primary text-black shadow-lg"
                  : "bg-white border-soft-gray text-paragraph-gray hover:border-black/20"
              }`}
            >
              {selectedTime === time && <Check size={14} />}
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {/* Hidden input for form submission consistency */}
      <input type="hidden" name="serviceDate" value={value} />
    </div>
  );
}
