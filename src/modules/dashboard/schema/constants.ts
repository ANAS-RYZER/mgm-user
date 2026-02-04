import { Home, Heart, Calendar, Sparkles, Settings } from "lucide-react";
import type { DashboardMenuItem } from "./types";

export const DASHBOARD_MENU_ITEMS: DashboardMenuItem[] = [
  { id: "home", label: "Dashboard", icon: Home },
  { id: "custom-request", label: "Custom Jewelry", icon: Sparkles },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "settings", label: "Profile Settings", icon: Settings },
];
