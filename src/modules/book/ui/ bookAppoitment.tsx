"use client"

import { useState, useMemo } from "react"
import { VisitTypeSelector, type VisitType } from "../components/Vistor"
import { DateSelector } from "../components/DateAndTime"
import { TimeSlotSelector, type TimeSlotPeriod } from "../components/TimeSelector"
import { ProductSidebar } from "../components/ProductSideBar"
import { ChevronUp, ChevronDown, CalendarDays, User, Phone, Mail, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import Header from "@/commonui/Header"

function generateDates(count: number) {
  const dates = []
  const today = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      date: d.getDate(),
      fullDate: d,
    })
  }
  return dates
}

export default function BookAppointmentPage() {
  const [visitType, setVisitType] = useState<VisitType>("virtual")
  const [selectedDate, setSelectedDate] = useState<number | null>(1)
  const [selectedPeriod, setSelectedPeriod] = useState<TimeSlotPeriod | null>("afternoon")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [dateTimeOpen, setDateTimeOpen] = useState(true)
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const dates = useMemo(() => generateDates(10), [])

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const canSubmit = selectedDate !== null && selectedTime !== null && name.trim() && phone.trim()

  const handleConfirm = () => {
    if (!canSubmit) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsConfirmed(true)
    }, 1500)
  }

  if (isConfirmed) {
    const selectedDateObj = selectedDate !== null ? dates[selectedDate] : null
    return (
      <div className="min-h-screen flex flex-col bg-background">
      <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarDays className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Appointment Confirmed</h2>
            <p className="text-muted-foreground mb-6">Your appointment has been successfully booked.</p>
            <div className="bg-muted rounded-lg p-4 text-left flex flex-col gap-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Visit Type</span>
                <span className="font-medium text-foreground capitalize">{visitType}</span>
              </div>
              {selectedDateObj && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">
                    {selectedDateObj.day} {selectedDateObj.date},{" "}
                    {selectedDateObj.fullDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-foreground">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium text-foreground">{name}</span>
              </div>
            </div>
            <a
              href="/"
              className="inline-block bg-[#2a1a1a] text-[#f5f0e8] font-semibold py-3 px-8 rounded-lg hover:bg-[#3d2a2a] transition-colors"
            >
              Back to Home
            </a>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">

      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        <h1 className="text-2xl md:text-3xl  font-semibold text-foreground mb-8">Book an Appointment</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Booking Form */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Visit Type */}
            <section>
              <VisitTypeSelector selected={visitType} onSelect={setVisitType} />
            </section>

            {/* Date & Time */}
            <section className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setDateTimeOpen(!dateTimeOpen)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h2 className="text-lg font-serif font-bold text-foreground">Date & Time</h2>
                {dateTimeOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {dateTimeOpen && (
                <div className="px-5 pb-6 flex flex-col gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Select Date</h3>
                    <DateSelector dates={dates} selectedDate={selectedDate} onSelect={setSelectedDate} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Select Time Slot</h3>
                    <TimeSlotSelector
                      selectedPeriod={selectedPeriod}
                      selectedTime={selectedTime}
                      onPeriodSelect={setSelectedPeriod}
                      onTimeSelect={setSelectedTime}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Your Details
            <section className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h2 className="text-lg font-serif font-bold text-foreground">Your Details</h2>
                {detailsOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {detailsOpen && (
                <div className="px-5 pb-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email (optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="notes" className="text-sm font-medium text-foreground">
                      Notes (optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea
                        id="notes"
                        placeholder="Any special requests or notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section> */}
          </div>

          {/* Right Column - Product Selection */}
          <div className="lg:w-[360px]">
            <div className="lg:sticky lg:top-6">
              <ProductSidebar selectedProducts={selectedProducts} onToggleProduct={toggleProduct} />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border mt-8 py-4 flex justify-end -mx-4 md:-mx-6 px-4 md:px-6">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!canSubmit || isSubmitting}
            className={cn(
              "py-3.5 px-10 rounded-lg font-semibold text-sm transition-all",
              canSubmit && !isSubmitting
                ? "bg-[#2a1a1a] text-[#f5f0e8] hover:bg-[#3d2a2a] cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
          >
            {isSubmitting ? "Confirming..." : "Confirm Appointment"}
          </button>
        </div>
      </main>
    </div>
  )
}
