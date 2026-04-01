"use client";

import Link from "next/link";
import { User, Home, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DASHBOARD_MENU_ITEMS } from "../../schema/constants";
import type { DashboardTabId } from "../../schema/types";

interface DashboardSidebarProps {
  activeTab: DashboardTabId;
  onSelectTab: (tab: DashboardTabId) => void;
  sidebarOpen: boolean;
  onBackToStore: () => void;
  onSignOut: () => void;
  profile: any;
}

export function DashboardSidebar({
  activeTab,
  onSelectTab,
  sidebarOpen,
  onBackToStore,
  onSignOut,
  profile,
  }: DashboardSidebarProps) {
  const profileData = profile as any;
  return (
    <motion.aside
      className={`fixed top-0 left-0 h-full w-72 bg-gradient-mgm text-primary-foreground border-r border-border/20 z-50
        lg:translate-x-0 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-primary-foreground/20 flex justify-center">
          <Link href="/" className="flex items-center justify-center min-h-[80px]">
            <img
              src="/images/mgm.svg"
              alt="MGM Mega Gold Mart"
              className="h-16 w-auto max-w-[200px] object-contain"
            />
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-primary-foreground/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">Welcome Back</p>
              <p className="text-sm opacity-80">{profile?.fullName}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {DASHBOARD_MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${
                  activeTab === item.id
                    ? "bg-primary-foreground text-primary"
                    : "opacity-80 hover:bg-primary-foreground/20 hover:opacity-100"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-primary-foreground/20 space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-primary-foreground/30 text-primary-foreground"
            onClick={onBackToStore}
          >
            <Home className="w-4 h-4" />
            Back to Store
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-primary-foreground/80"
            onClick={onSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}
