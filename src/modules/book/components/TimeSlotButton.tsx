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
}

export default function TimeSlotButton({
  slot,
  isSelected,
  onSelect,
}: TimeSlotButtonProps) {
  const Icon = slot.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-1 rounded-lg border px-3 py-4 transition-all",
        isSelected
          ? "border-[#c9a84c] bg-[#2a1a1a] text-[#f5f0e8]"
          : "border-border bg-card text-foreground hover:border-[#c9a84c]/50",
      )}
    >
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
    </button>
  );
}
