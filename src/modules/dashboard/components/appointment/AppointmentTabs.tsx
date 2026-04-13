"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Appointment } from "../../schema/appointment";

interface AppointmentTabsProps {
  activeTab: "all" | "upcoming" | "history";
  onTabChange: (tab: "all" | "upcoming" | "history") => void;
  appointments: Appointment[];
  children: React.ReactNode;
}

export const AppointmentTabs = ({
  activeTab,
  onTabChange,
  appointments,
  children,
}: AppointmentTabsProps) => {


  return (
    <Tabs value={activeTab} onValueChange={onTabChange as any} className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-auto md:p-1 px-2 bg-muted">
        <TabsTrigger value="all" className="data-[state=active]:bg-background">
          All 
          
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="data-[state=active]:bg-background">
          Upcoming 
        </TabsTrigger>
        <TabsTrigger value="history" className="data-[state=active]:bg-background">
          History 
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
