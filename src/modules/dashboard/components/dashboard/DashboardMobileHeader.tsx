"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardMobileHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function DashboardMobileHeader({
  sidebarOpen,
  onToggleSidebar,
}: DashboardMobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-mgm backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/mgm.svg"
            alt="MGM MEGA GOLD MART Logo"
            className="h-16 w-auto max-w-[200px] object-contain"
          />
        </Link>
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          {sidebarOpen ? (
            <X className="h-5 w-5 text-primary-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-primary-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
