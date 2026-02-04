"use client";

import { useMemo } from "react";
import CustomJewelryRequest from "@/modules/dashboard/ui/CustomJewelryPage";
import Wishlist from "@/modules/dashboard/components/wishlist/wishList";
import DashboardHome from "@/modules/dashboard/ui/dashboardMain";
import { MyAppointments } from "@/modules/dashboard/ui/MyAppointments";
import ProfileSettings from "@/modules/dashboard/ui/ProfileSettings";
import { useDashboardNav } from "../hooks/useDashboardNav";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import type { DashboardTabId } from "../schema/types";
import { useGetProfile } from "../hooks/useGetProfile";

const DASHBOARD_CONTENT: Record<
  DashboardTabId,
  (props: { onNavigate?: (tab: DashboardTabId) => void; profile: any }) => React.ReactNode
> = {
  home: ({ onNavigate, profile }) => <DashboardHome onNavigate={onNavigate ?? (() => {})} profile={profile} />,
  "custom-request": ({ profile }) => <CustomJewelryRequest profile={profile} />,
  wishlist: ({ profile }) => <Wishlist profile={profile} />,
  appointments: ({ profile }) => <MyAppointments profile={profile} />,
  settings: ({ profile }) => <ProfileSettings profile={profile} />,
};

export default function DashboardPage() {
  const {
    activeTab,
    setActiveTab,
    sidebarOpen,
    closeSidebar,
    toggleSidebar,
    handleSignOut,
    router,
  } = useDashboardNav("home");
  const { data: profile } = useGetProfile();
  const content = useMemo(
    () => DASHBOARD_CONTENT[activeTab]({ onNavigate: setActiveTab, profile }),
    [activeTab, setActiveTab, profile]
  );

  return (
    <DashboardLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      sidebarOpen={sidebarOpen}
      onCloseOverlay={closeSidebar}
      onToggleSidebar={toggleSidebar}
      onBackToStore={() => router.push("/")}
      onSignOut={handleSignOut}
      profile={profile}
    >
      {content}
    </DashboardLayout>
  );
}
