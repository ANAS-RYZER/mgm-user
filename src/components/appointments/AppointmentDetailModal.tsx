"use client";

import { AlertCircle, Calendar, MapPin, Trash2, Edit, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "./types";

interface AppointmentDetailModalProps {
  appointment: Appointment;
  statusBadgeColor: string;
  statusBadgeText: string;
  onClose: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

export const AppointmentDetailModal = ({
  appointment,
  statusBadgeColor,
  statusBadgeText,
  onClose,
  onEdit,
  onCancel,
}: AppointmentDetailModalProps) => {
  const isUpcoming = new Date(appointment.date) >= new Date();

  return (
    <>
      <div className="sticky top-0 bg-gradient-mgm text-primary-foreground p-6 flex items-center justify-between z-10 rounded-t-2xl">
        <div>
          <h2 className="font-display text-2xl font-bold">Appointment Details</h2>
          <p className="text-primary-foreground/90 text-sm">
            {new Date(appointment.date).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            at {appointment.time}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Status Banner */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-3">
            <Badge className={statusBadgeColor}>{statusBadgeText}</Badge>
            <div>
              <p className="font-semibold text-lg">
                {isUpcoming ? "Upcoming Appointment" : "Completed Appointment"}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(appointment.date).toDateString() === new Date().toDateString()
                  ? "Today's appointment"
                  : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Customer Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-semibold">{appointment.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <p className="font-semibold">{appointment.phone}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-semibold">{appointment.email}</p>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Appointment Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date</p>
              <p className="font-semibold">
                {new Date(appointment.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Time</p>
              <p className="font-semibold">{appointment.time}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground mb-1">Store Location</p>
              <p className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {appointment.store}
              </p>
            </div>
            {appointment.productName && (
              <div className="sm:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">
                  Product of Interest
                </p>
                <p className="font-semibold">{appointment.productName}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
          <Button
            variant="outline"
            className="flex-1 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Appointment
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            onClick={onClose}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirm
          </Button>
          <Button
            variant="destructive"
            className="flex-1 transition-all duration-300 hover:scale-105"
            onClick={onCancel}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Cancel Appointment
          </Button>
        </div>
      </div>
    </>
  );
};
