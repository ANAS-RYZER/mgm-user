import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TimeSlot {
  id: string;
  label: string;
  range: string;
  icon: LucideIcon;
}

type SlotStatus = "high" | "medium" | "low" | "full";

interface TimeSlotButtonProps {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: () => void;
  data: any;
  disabled: boolean;
  status: SlotStatus;
}

export default function TimeSlotButton({
  slot,
  isSelected,
  onSelect,
  data,
  disabled,
  status,
}: TimeSlotButtonProps) {
  const Icon = slot.icon;
  const isRecommended = slot.id === "evening";

  
  const statusStyles = {
    high: "border-green-400 bg-green-50 text-green-800",
    medium: "border-yellow-400 bg-yellow-50 text-yellow-800",
    low: "border-red-400 bg-red-50 text-red-800",
    full: "border-gray-300 bg-gray-100 text-gray-400",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center gap-1 rounded-lg border px-3 py-4 transition-all",

        isSelected
          ? "border-[#c9a84c] bg-[#2a1a1a] text-[#f5f0e8]"
          : statusStyles[status],

        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Recommended badge */}
      {isRecommended && !disabled && (
        <span className="absolute -top-2 right-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-[#2a1a1a]">
          Recommended
        </span>
      )}

      <Icon
        className={cn(
          "mb-1 h-5 w-5",
          isSelected ? "text-[#c9a84c]" : ""
        )}
      />

      <span className="text-sm font-semibold">{slot.label}</span>

      <span
        className={cn(
          "text-xs",
          isSelected ? "text-[#f5f0e8]/70" : "opacity-70"
        )}
      >
        {slot.range}
      </span>

      {/* availability info */}
      <span className="text-xs opacity-80">
        {status === "full"
          ? "Fully booked"
          : `${data?.availableCount} slots left`}
      </span>

      {/* optional warning text */}
      {status === "medium" && (
        <span className="text-[10px] font-medium">Filling fast</span>
      )}

      {status === "low" && (
        <span className="text-[10px] font-medium">Almost full</span>
      )}
    </button>
  );
}
