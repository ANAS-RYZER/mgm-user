"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AppointmentCard } from "./AppointmentCard";
import { Appointment } from "../../schema/appointment";

interface AppointmentListProps {
  appointments: Appointment[];
  searchTerm: string;
  onView: (apt: Appointment) => void;
  onEdit: (apt: Appointment) => void;
  onCancel: (id: string) => void;
  getStatusBadge: (date: string) => { status: string; color: string };
}

export const AppointmentList = ({
  appointments,
  searchTerm,
  onView,
  onEdit,
  onCancel,
  getStatusBadge,
}: AppointmentListProps) => {
  if (appointments.length === 0) {
    return (
      <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No appointments found
          </h3>
          <p className="text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No appointments in this category"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => {
        const { status, color } = getStatusBadge(appointment.date);
        return (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            index={index}
            statusBadgeColor={color}
            statusBadgeText={status}
            onView={onView}
            onEdit={onEdit}
            onCancel={onCancel}
          />
        );
      })}
    </div>
  );
};
