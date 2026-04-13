"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Appointment, AppointmentCard } from "./AppointmentCard";
import MGMLoader from "@/components/MGMLoader";

interface AppointmentListProps {
  appointments: Appointment[];
  isLoading: boolean;
}

export const AppointmentList = ({
  appointments,
  isLoading,
}: AppointmentListProps) => {
  if (appointments?.length === 0) {
    return (
      <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-12 text-center">
          <div className="bg-gradient-mgm rounded-full w-24 h-24  mx-auto mb-4 flex items-center justify-center">
            <Calendar size={64} className="mx-auto text-gold" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No appointments found
          </h3>
          {/* <p className="text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No appointments in this category"}
          </p> */}
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <MGMLoader />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments?.map((appointment, index) => {
        return (
          <AppointmentCard
            key={appointment?._id}
            appointment={appointment}
            index={index}
          />
        );
      })}
    </div>
  );
};
