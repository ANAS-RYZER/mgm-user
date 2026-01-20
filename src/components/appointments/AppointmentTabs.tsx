"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Appointment } from "./types";

interface AppointmentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  appointments: Appointment[];
  children: React.ReactNode;
}

export const AppointmentTabs = ({
  activeTab,
  onTabChange,
  appointments,
  children,
}: AppointmentTabsProps) => {
  const getUpcomingCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointments.filter(apt => new Date(apt.date) >= today).length;
  };

  const getHistoryCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointments.filter(apt => new Date(apt.date) < today).length;
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted">
        <TabsTrigger value="all" className="data-[state=active]:bg-background">
          All <Badge className="ml-1 bg-primary">{appointments.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="data-[state=active]:bg-background">
          Upcoming <Badge className="ml-1 bg-primary">{getUpcomingCount()}</Badge>
        </TabsTrigger>
        <TabsTrigger value="history" className="data-[state=active]:bg-background">
          History <Badge className="ml-1 bg-primary">{getHistoryCount()}</Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6">
        {children}
      </TabsContent>
      <TabsContent value="upcoming" className="mt-6">
        {children}
      </TabsContent>
      <TabsContent value="history" className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
};
