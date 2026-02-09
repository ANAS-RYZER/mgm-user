"use client";

import DateButton from "./DateButton";

export interface DateItem {
  day: string;
  date: number;
  fullDate: Date;
}

interface DateSelectorProps {
  dates: DateItem[];
  selectedDate: number | null;
  onSelect: (index: number) => void;
}

export function DateSelector({
  dates,
  selectedDate,
  onSelect,
}: DateSelectorProps) {
  const todayString = new Date().toDateString();

  return (
    <div className="grid grid-cols-7 gap-2 overflow-x-auto pb-2">
      {dates.map((dateItem, index) => {
        const isSelected = selectedDate === index;
        const isToday =
          dateItem.fullDate.toDateString() === todayString;

        return (
          <DateButton
            key={index}
            dateItem={dateItem}
            isSelected={isSelected}
            isToday={isToday}
            onClick={() => onSelect(index)}
          />
        );
      })}
    </div>
  );
}
