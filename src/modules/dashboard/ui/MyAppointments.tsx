"use client";

import { AppointmentHeader } from "../components/appointment/AppointmentHeader";
import { AppointmentTabs } from "../components/appointment/AppointmentTabs";
import { AppointmentList } from "../components/appointment/AppointmentList";
import { useState } from "react";
import useGetAppointments from "../hooks/useAppointments";

export const MyAppointments = ({ profile: _profile }: { profile: any }) => {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "history">(
    "all",
  );
  const {
    data: appointments,
    isFetching:isAppointmentsLoading,
    error,
  } = useGetAppointments(activeTab);
  console.log("Fetched Appointments:", appointments?.data);

  return (
    <div className="px-2 py-6 md:p-6 lg:p-8 space-y-8">
      <AppointmentHeader />

      {/* <AppointmentSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} /> */}

      <AppointmentTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        appointments={appointments?.data}
      >
        <AppointmentList isLoading={isAppointmentsLoading} appointments={appointments?.data} />
      </AppointmentTabs>

      {/* <AppointmentModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onEdit={() => {
          setSelectedAppointment(null);
          // Edit functionality can be added here
        }}
        onCancel={() => {
          if (selectedAppointment) {
            setSelectedAppointment(null);
            cancelAppointment(selectedAppointment.id);
          }
        }}
        getStatusBadge={getStatusBadge}
      /> */}
    </div>
  );
};
