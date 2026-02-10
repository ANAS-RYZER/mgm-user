import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TimeSlot {
  id: string;
  label: string;
  range: string;
  icon: LucideIcon;
}

interface TimeSlotButtonProps {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: () => void;
  data: any;
  disabled: boolean;
}

export default function TimeSlotButton({
  slot,
  isSelected,
  onSelect,
  data,
  disabled,
}: TimeSlotButtonProps) {
  const Icon = slot.icon;
  const isRecommended = slot.id === "evening";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center gap-1 rounded-lg border px-3 py-4 transition-all",
        isSelected
          ? "border-[#c9a84c] bg-[#2a1a1a] text-[#f5f0e8]"
          : "border-border bg-card text-foreground hover:border-[#c9a84c]/50",
        disabled && "opacity-40 cursor-not-allowed",
      )}
    >
      {/* 🔥 Recommended badge */}
      {isRecommended && !disabled && (
        <span className="absolute -top-2 right-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-[#2a1a1a]">
          Recommended
        </span>
      )}

      <Icon
        className={cn(
          "mb-1 h-5 w-5",
          isSelected ? "text-[#c9a84c]" : "text-muted-foreground",
        )}
      />

      <span className="text-sm font-semibold">{slot.label}</span>

      <span
        className={cn(
          "text-xs",
          isSelected ? "text-[#f5f0e8]/70" : "text-muted-foreground",
        )}
      >
        {slot.range}
      </span>

      {/* Optional availability */}
      {/* <span className="text-xs text-muted-foreground">
        {data?.availableCount} slots left
      </span> */}
    </button>
  );
}
