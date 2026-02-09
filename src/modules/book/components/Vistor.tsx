"use client";

import { cn } from "@/lib/utils";
import { Monitor, Store, Home } from "lucide-react";

const visitTypes = [
  { id: "virtual", label: "Virtual", icon: Monitor },
  { id: "store", label: "Store Visit", icon: Store },
  { id: "home", label: "Home Visit", icon: Home },
] as const;

export type VisitType = (typeof visitTypes)[number]["id"];

interface VisitTypeSelectorProps {
  selected: VisitType;
  onSelect: (type: VisitType) => void;
}

export function VisitTypeSelector({
  selected,
  onSelect,
}: VisitTypeSelectorProps) {
  return (
    <div className="flex gap-0 rounded-lg overflow-hidden border border-border">
      {visitTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selected === type.id;
        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelect(type.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-medium transition-all",
              isSelected
                ? "bg-[#c9a84c] text-[#2a1a1a]"
                : "bg-card text-muted-foreground hover:bg-muted",
            )}
          >
            <Icon className="w-4 h-4" />
            {type.label}
          </button>
        );
      })}
    </div>
  );
}
