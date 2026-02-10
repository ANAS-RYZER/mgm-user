"use client";

import { cn } from "@/lib/utils";
import { Sun, CloudSun, Sunset } from "lucide-react";
import TimeSlotButton from "./TimeSlotButton";
import { useMemo } from "react";

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

function mapSlots(apiSlots: any[]) {
  return apiSlots.map((slot) => {
    const slotId = slot.slotCode.toLowerCase(); // MORNING → morning
    const timeSlotTemplate = timeSlots.find((ts) => ts.id === slotId);
    
    return {
      id: slotId,
      label: slot.slotCode.charAt(0) + slot.slotCode.slice(1).toLowerCase(),
      range: slot.time,
      icon: timeSlotTemplate?.icon || Sun, // Fallback to Sun if not found
      maxBookings: slot.maxBookings,
      bookedCount: slot.bookedCount,
      availableCount: slot.availableCount,
      isAvailable: slot.isAvailable && slot.availableCount > 0,
    };
  });
}

interface TimeSlotSelectorProps {
  selectedPeriod: TimeSlotPeriod | null;
  onPeriodSelect: (period: TimeSlotPeriod) => void;
  slots : any
}

export function TimeSlotSelector({
  selectedPeriod,
  onPeriodSelect,
  slots,
}: TimeSlotSelectorProps) {

  const mappedSlots = useMemo(() => mapSlots(slots || []), [slots]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {mappedSlots.map((slot) => (
        <TimeSlotButton
          key={slot.id}
          slot={{
            id: slot.id,
            label: slot.label,
            range: slot.range,
            icon: slot.icon,
            
          }}
          data={slot}
          isSelected={selectedPeriod === slot.id}
          disabled={!slot.isAvailable}
          onSelect={() => onPeriodSelect(slot.id)}   
        />
      ))}
    </div>
  );
}
