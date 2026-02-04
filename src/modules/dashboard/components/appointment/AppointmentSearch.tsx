"use client";

import { Search } from "lucide-react";

interface AppointmentSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const AppointmentSearch = ({ searchTerm, onSearchChange }: AppointmentSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};
