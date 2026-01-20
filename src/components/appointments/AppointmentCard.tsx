"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "./types";

interface AppointmentCardProps {
  appointment: Appointment;
  index: number;
  statusBadgeColor: string;
  statusBadgeText: string;
  onView: (apt: Appointment) => void;
  onEdit: (apt: Appointment) => void;
  onCancel: (id: string) => void;
}

export const AppointmentCard = ({
  appointment,
  index,
  statusBadgeColor,
  statusBadgeText,
  onView,
  onEdit,
  onCancel,
}: AppointmentCardProps) => {
  return (
    <motion.div
      key={appointment.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Appointment Details */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <Badge className={statusBadgeColor}>{statusBadgeText}</Badge>
                {appointment.productName && (
                  <span className="text-sm text-muted-foreground">
                    For: {appointment.productName}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-foreground">
                    {new Date(appointment.date).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{appointment.store}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{appointment.name}</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {appointment.phone}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 gap-2"
                onClick={() => onView(appointment)}
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 gap-2"
                onClick={() => onEdit(appointment)}
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 gap-2 text-destructive hover:text-destructive"
                onClick={() => onCancel(appointment.id)}
              >
                <Trash2 className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
