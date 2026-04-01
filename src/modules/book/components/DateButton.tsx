import { cn } from "@/lib/utils";

interface DateButtonProps {
  dateItem: {
    day: string;
    date: number;
  };
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;
}

export default function DateButton({
  dateItem,
  isSelected,
  isToday,
  onClick,
}: DateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center min-w-[60px] rounded-lg border px-3 py-3 transition-all",
        isSelected
          ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#2a1a1a]"
          : "border-border bg-card text-muted-foreground hover:border-[#c9a84c]/50",
        isToday && !isSelected && "border-[#c9a84c]/30",
      )}
    >
      <span className="text-xs font-medium uppercase">
        {dateItem.day}
      </span>
      <span
        className={cn(
          "text-lg font-bold",
          isSelected && "text-[#2a1a1a]",
        )}
      >
        {dateItem.date}
      </span>
    </button>
  );
}
