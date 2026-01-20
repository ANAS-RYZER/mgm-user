"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Appointment, MOCK_APPOINTMENTS } from "./types";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if (typeof window === "undefined") {
      return MOCK_APPOINTMENTS;
    }
    
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : MOCK_APPOINTMENTS;
  });

  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const saveToLocalStorage = useCallback((data: Appointment[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("appointments", JSON.stringify(data));
    }
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    saveToLocalStorage(updated);
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully",
    });
  }, [appointments, saveToLocalStorage, toast]);

  const getStatusBadge = (date: string) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      return { status: "Completed", color: "bg-primary text-primary-foreground" };
    } else if (appointmentDate.getTime() === today.getTime()) {
      return { status: "Today", color: "bg-green-600 hover:bg-green-700 text-white" };
    } else {
      return { status: "Upcoming", color: "bg-blue-100 text-blue-800 border-blue-200" };
    }
  };

  const getFilteredAppointments = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filtered = appointments.filter((apt) => {
      const appointmentDate = new Date(apt.date);
      const matchesSearch =
        apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (apt.productName &&
          apt.productName.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (activeTab === "upcoming") {
        return appointmentDate >= today;
      } else if (activeTab === "history") {
        return appointmentDate < today;
      }
      return true;
    });

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [appointments, activeTab, searchTerm]);

  return {
    appointments,
    activeTab,
    setActiveTab,
    selectedAppointment,
    setSelectedAppointment,
    searchTerm,
    setSearchTerm,
    cancelAppointment,
    getStatusBadge,
    getFilteredAppointments,
  };
};
