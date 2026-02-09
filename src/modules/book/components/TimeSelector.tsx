"use client"

import { cn } from "@/lib/utils"
import { Sun, CloudSun, Sunset, Moon } from "lucide-react"

const timeSlots = [
  { id: "morning", label: "Morning", range: "6 AM - 11 AM", icon: Sun },
  { id: "afternoon", label: "Afternoon", range: "11 AM - 5 PM", icon: CloudSun },
  { id: "evening", label: "Evening", range: "5 PM - 10 PM", icon: Sunset },
  { id: "night", label: "Night", range: "10 PM - 6 AM", icon: Moon },
] as const

export type TimeSlotPeriod = (typeof timeSlots)[number]["id"]

const specificTimes: Record<TimeSlotPeriod, string[]> = {
  morning: ["06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM"],
  afternoon: ["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"],
  evening: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"],
  night: ["10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"],
}

interface TimeSlotSelectorProps {
  selectedPeriod: TimeSlotPeriod | null
  selectedTime: string | null
  onPeriodSelect: (period: TimeSlotPeriod) => void
  onTimeSelect: (time: string) => void
}

export function TimeSlotSelector({
  selectedPeriod,
  selectedTime,
  onPeriodSelect,
  onTimeSelect,
}: TimeSlotSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {timeSlots.map((slot) => {
          const Icon = slot.icon
          const isSelected = selectedPeriod === slot.id
          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onPeriodSelect(slot.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-4 px-3 rounded-lg border transition-all",
                isSelected
                  ? "border-[#c9a84c] bg-[#2a1a1a] text-[#f5f0e8]"
                  : "border-border bg-card text-foreground hover:border-[#c9a84c]/50",
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1", isSelected ? "text-[#c9a84c]" : "text-muted-foreground")} />
              <span className="font-semibold text-sm">{slot.label}</span>
              <span className={cn("text-xs", isSelected ? "text-[#f5f0e8]/70" : "text-muted-foreground")}>{slot.range}</span>
            </button>
          )
        })}
      </div>

      {selectedPeriod && (
        <div className="flex flex-wrap gap-2 pt-2">
          {specificTimes[selectedPeriod].map((time) => {
            const isSelected = selectedTime === time
            return (
              <button
                key={time}
                type="button"
                onClick={() => onTimeSelect(time)}
                className={cn(
                  "py-2 px-4 rounded-lg border text-sm font-medium transition-all",
                  isSelected
                    ? "border-[#c9a84c] bg-[#c9a84c] text-[#2a1a1a]"
                    : "border-border bg-card text-muted-foreground hover:border-[#c9a84c]/50 hover:text-foreground",
                )}
              >
                {time}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
