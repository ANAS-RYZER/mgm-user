"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AppointmentDetailModal } from "./AppointmentDetailModal";
import { Appointment } from "../../schema/appointment";

interface AppointmentModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onEdit: () => void;
  onCancel: () => void;
  getStatusBadge: (date: string) => { status: string; color: string };
}

export const AppointmentModal = ({
  appointment,
  onClose,
  onEdit,
  onCancel,
  getStatusBadge,
}: AppointmentModalProps) => {
  return (
    <AnimatePresence>
      {appointment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-11/12 max-h-[85vh] overflow-y-auto shadow-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const { status, color } = getStatusBadge(appointment.date);
              return (
                <AppointmentDetailModal
                  appointment={appointment}
                  statusBadgeColor={color}
                  statusBadgeText={status}
                  onClose={onClose}
                  onEdit={onEdit}
                  onCancel={onCancel}
                />
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
