"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, User, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/use-toast";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const BookAppointmentModal = ({ isOpen, onClose, productName }: BookAppointmentModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    store: "",
    message: "",
  });

  const stores = [
    "MGM Jewels - Jubilee Hills, Hyderabad",
    "MGM Jewels - Banjara Hills, Hyderabad",
    "MGM Jewels - Kukatpally, Hyderabad",
    "MGM Jewels - Secunderabad",
  ];

  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Booked!",
      description: `Your appointment for ${productName} has been scheduled. We'll contact you shortly to confirm.`,
    });
    onClose();
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      store: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // manage body scroll and focus when modal opens
  const firstInputRef = React.useRef<HTMLInputElement | null>(null);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function validatePhone(phone: string) {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 || (digits.length === 12 && digits.startsWith('91'));
  }

  const isFormValid = !!(
    formData.name.trim() &&
    validatePhone(formData.phone) &&
    formData.date &&
    formData.time &&
    formData.store
  );

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
  }

  const enhancedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({ name: true, phone: true, date: true, time: true, store: true });
      return;
    }
    handleSubmit(e);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="book-appointment-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8 border border-slate-100/50"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 id="book-appointment-title" className="font-display text-3xl font-bold text-foreground">
                    Book an Appointment
                  </h2>
                  <p className="text-base text-slate-600 mt-2">For: <span className="font-semibold text-foreground">{productName}</span></p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-cream rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Close appointment dialog"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <form onSubmit={enhancedSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-900">
                    <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-gold" />
                    </div>
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    ref={firstInputRef}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your full name"
                    className="px-4 py-3 border-2 border-slate-100/50 rounded-2xl focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] bg-white/50 backdrop-blur-sm transition-all duration-300"
                    required
                  />
                  {!formData.name && touched.name && (
                    <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-destructive" /> Please enter your name
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-900">
                      <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5 text-gold" />
                      </div>
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10-digit mobile"
                      className="px-4 py-3 border-2 border-slate-100/50 rounded-2xl focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] bg-white/50 backdrop-blur-sm transition-all duration-300"
                      required
                    />
                    {!validatePhone(formData.phone) && touched.phone && (
                      <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive" /> Enter valid 10-digit number
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-900">
                      <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                        <Mail className="w-3.5 h-3.5 text-gold" />
                      </div>
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="your@email.com"
                      className="px-4 py-3 border-2 border-slate-100/50 rounded-2xl focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] bg-white/50 backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-900">
                    <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                    </div>
                    Select Store <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="store"
                    value={formData.store}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 border-2 border-slate-100/50 rounded-2xl bg-white/50 backdrop-blur-sm text-foreground focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] transition-all duration-300 appearance-none cursor-pointer font-medium"
                    required
                  >
                    <option value="">Choose a store location</option>
                    {stores.map((store) => (
                      <option key={store} value={store}>{store}</option>
                    ))}
                  </select>
                  {!formData.store && touched.store && (
                    <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-destructive" /> Please select a store
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-900">
                      <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                      </div>
                      Preferred Date <span className="text-destructive">*</span>
                    </label>
                    <Input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={new Date().toISOString().split("T")[0]}
                      className="px-4 py-3 border-2 border-slate-100/50 rounded-2xl focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] bg-white/50 backdrop-blur-sm transition-all duration-300"
                      required
                    />
                    {!formData.date && touched.date && (
                      <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive" /> Please select a date
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-900">
                      <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                      </div>
                      Preferred Time <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 border-2 border-slate-100/50 rounded-2xl bg-white/50 backdrop-blur-sm text-foreground focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] transition-all duration-300 appearance-none cursor-pointer font-medium"
                      required
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {!formData.time && touched.time && (
                      <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive" /> Please select a time
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-slate-900">
                    <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                      <MessageSquare className="w-3.5 h-3.5 text-gold" />
                    </div>
                    Additional Notes
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific requirements or questions?"
                    className="px-4 py-3 border-2 border-slate-100/50 rounded-2xl focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] bg-white/50 backdrop-blur-sm transition-all duration-300"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onClose} 
                    className="flex-1 border-2 border-slate-200 rounded-2xl font-semibold py-3 hover:bg-slate-50 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gold hover:bg-gold/90 text-foreground rounded-2xl font-semibold py-3 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isFormValid}
                  >
                    Confirm Appointment
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookAppointmentModal;
