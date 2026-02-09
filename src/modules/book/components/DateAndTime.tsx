"use client"

import { cn } from "@/lib/utils"

interface DateSelectorProps {
  dates: { day: string; date: number; fullDate: Date }[]
  selectedDate: number | null
  onSelect: (index: number) => void
}

export function DateSelector({ dates, selectedDate, onSelect }: DateSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {dates.map((d, i) => {
        const isSelected = selectedDate === i
        const isToday = d.fullDate.toDateString() === new Date().toDateString()
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={cn(
              "flex flex-col items-center min-w-[60px] py-3 px-3 rounded-lg border transition-all",
              isSelected
                ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#2a1a1a]"
                : "border-border bg-card text-muted-foreground hover:border-[#c9a84c]/50",
              isToday && !isSelected && "border-[#c9a84c]/30",
            )}
          >
            <span className="text-xs font-medium uppercase">{d.day}</span>
            <span className={cn("text-lg font-bold", isSelected && "text-[#2a1a1a]")}>{d.date}</span>
          </button>
        )
      })}
    </div>
  )
}
