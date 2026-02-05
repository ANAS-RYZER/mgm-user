"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/httpClient";
import type { DashboardTabId } from "../schema/types";

export function useDashboardNav(defaultTab: DashboardTabId = "home") {
  const [activeTab, setActiveTab] = useState<DashboardTabId>(defaultTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = useCallback(() => {
    auth.clear();
    router.push("/");
    router.refresh();
  }, [router]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  const setTab = useCallback((tab: DashboardTabId) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  }, []);

  return {
    activeTab,
    setActiveTab: setTab,
    sidebarOpen,
    setSidebarOpen,
    closeSidebar,
    toggleSidebar,
    handleSignOut,
    router,
  };
}
