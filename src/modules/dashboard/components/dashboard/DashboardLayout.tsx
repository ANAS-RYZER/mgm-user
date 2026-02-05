"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DashboardMobileHeader } from "./DashboardMobileHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import type { DashboardTabId } from "../../schema/types";

interface DashboardLayoutProps {
  activeTab: DashboardTabId;
  onSelectTab: (tab: DashboardTabId) => void;
  sidebarOpen: boolean;
  onCloseOverlay: () => void;
  onToggleSidebar: () => void;
  onBackToStore: () => void;
  onSignOut: () => void;
  children: React.ReactNode;
  profile: any;
}

export function DashboardLayout({
  activeTab,
  onSelectTab,
  sidebarOpen,
  onCloseOverlay,
  onToggleSidebar,
  onBackToStore,
  onSignOut,
  children,
  profile,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardMobileHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={onToggleSidebar}
      />

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={onCloseOverlay}
          />
        )}
      </AnimatePresence>

      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        sidebarOpen={sidebarOpen}
        onBackToStore={onBackToStore}
        onSignOut={onSignOut}
        profile={profile}
      />

      <main className="lg:ml-72 pt-16 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
