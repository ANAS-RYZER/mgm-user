"use client";

import { useMemo, useState } from "react";
import { DateSelector } from "../components/DateAndTime";
import {
  TimeSlotSelector,
  type TimeSlotPeriod,
} from "../components/TimeSelector";
import { ProductSidebar } from "../components/ProductSideBar";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/commonui/Header";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useAppointmentProducts } from "@/lib/use-appointment-products";

/* ----------------------------- Helpers ----------------------------- */

function generateDates(count: number) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      date: date.getDate(),
      fullDate: date,
    };
  });
}

/* ------------------------------ Page ------------------------------- */

export default function BookAppointmentPage() {
  /* ---------- State ---------- */
  const [selectedDate, setSelectedDate] = useState<number | null>(1);
  const [selectedPeriod, setSelectedPeriod] = useState<TimeSlotPeriod | null>(
    "afternoon",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  /* ---------- Derived ---------- */
  const dates = useMemo(() => generateDates(14), []);

  /* ---------- Handlers ---------- */
  const appointment = useAppointmentProducts();

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      appointment.clear();
    }, 1500);
  };

  /* ---------------- Confirmation Screen ---------------- */

  if (isConfirmed) {
    const selectedDateObj = selectedDate !== null ? dates[selectedDate] : null;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-card border rounded-2xl p-8 md:p-12 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarDays className="w-8 h-8 text-emerald-600" />
            </div>

            <h2 className="text-2xl font-serif font-bold mb-2">
              Appointment Confirmed
            </h2>

            <p className="text-muted-foreground mb-6">
              Your appointment has been successfully booked.
            </p>

            {selectedDateObj && (
              <div className="bg-muted rounded-lg p-4 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {selectedDateObj.day} {selectedDateObj.date},{" "}
                    {selectedDateObj.fullDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            )}

            <a
              href="/"
              className="inline-block bg-[#2a1a1a] text-[#f5f0e8] font-semibold py-3 px-8 rounded-lg hover:bg-[#3d2a2a] transition-colors"
            >
              Back to Home
            </a>
          </div>
        </main>
      </div>
    );
  }

  /* ---------------- Booking Screen ---------------- */

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        <h1 className="text-2xl md:text-3xl  font-semibold text-foreground mb-8">Book an Appointment</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left */}
          <div className="flex-1">
            <section className="rounded-xl border border-border">
              <div className="p-5">
                <h2 className="text-lg font-serif font-bold">Date & Time</h2>
              </div>

              <div className="px-5 pb-6 flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Select Date</h3>
                  <DateSelector
                    dates={dates}
                    selectedDate={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    Select Time Slot
                  </h3>
                  <TimeSlotSelector
                    selectedPeriod={selectedPeriod}
                    onPeriodSelect={setSelectedPeriod}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="lg:w-[400px] lg:sticky lg:top-6">
            <ProductSidebar />
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-0 mt-10 bg-background/80 backdrop-blur border-t border-border z-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-end">
            <Button size="lg" className="px-10 py-6 text-base font-semibold">
              Confirm Appointment
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
