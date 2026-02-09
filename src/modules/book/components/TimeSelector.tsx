"use client";

import { cn } from "@/lib/utils";
import { Sun, CloudSun, Sunset } from "lucide-react";
import TimeSlotButton from "./TimeSlotButton";

export const timeSlots = [
  {
    id: "morning",
    label: "Morning",
    range: "10 AM - 1 PM",
    icon: Sun,
  },
  {
    id: "afternoon",
    label: "Afternoon",
    range: "2 PM - 5 PM",
    icon: CloudSun,
  },
  {
    id: "evening",
    label: "Evening",
    range: "6 PM - 9 PM",
    icon: Sunset,
  },
] as const;

export type TimeSlotPeriod = (typeof timeSlots)[number]["id"];

interface TimeSlotSelectorProps {
  selectedPeriod: TimeSlotPeriod | null;
  onPeriodSelect: (period: TimeSlotPeriod) => void;
}

export function TimeSlotSelector({
  selectedPeriod,
  onPeriodSelect,
}: TimeSlotSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {timeSlots.map((slot) => (
          <TimeSlotButton
            key={slot.id}
            slot={slot}
            isSelected={selectedPeriod === slot.id}
            onSelect={() => onPeriodSelect(slot.id)}
          />
        ))}
      </div>
    </div>
  );
}
