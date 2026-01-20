"use client";

import { AppointmentHeader } from "./AppointmentHeader";
import { AppointmentSearch } from "./AppointmentSearch";
import { AppointmentTabs } from "./AppointmentTabs";
import { AppointmentList } from "./AppointmentList";
import { AppointmentModal } from "./AppointmentModal";
import { useAppointments } from "./useAppointments";

export const MyAppointments = () => {
  const {
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
  } = useAppointments();

  const filteredAppointments = getFilteredAppointments();

  const getTabAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activeTab === "upcoming") {
      return filteredAppointments.filter(apt => new Date(apt.date) >= today);
    } else if (activeTab === "history") {
      return filteredAppointments.filter(apt => new Date(apt.date) < today);
    }
    return filteredAppointments;
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <AppointmentHeader />

      <AppointmentSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <AppointmentTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        appointments={appointments}
      >
        <AppointmentList
          appointments={getTabAppointments()}
          searchTerm={searchTerm}
          onView={setSelectedAppointment}
          onEdit={setSelectedAppointment}
          onCancel={cancelAppointment}
          getStatusBadge={getStatusBadge}
        />
      </AppointmentTabs>

      <AppointmentModal
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
      />
    </div>
  );
};
