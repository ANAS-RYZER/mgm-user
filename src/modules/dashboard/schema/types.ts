import type { LucideIcon } from "lucide-react";

export type DashboardTabId =
  | "home"
  | "custom-request"
  | "wishlist"
  | "appointments"
  | "settings";

export interface DashboardMenuItem {
  id: DashboardTabId;
  label: string;
  icon: LucideIcon;
}
