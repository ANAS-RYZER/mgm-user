import { useQuery } from "@tanstack/react-query";
import api, { apiClient } from "@/lib/httpClient";

export interface AppointmentSlot {
  slotCode: "MORNING" | "EVENING" | "NIGHT";
  time: string;
  maxBookings: number;
  bookedCount: number;
  availableCount: number;
  isAvailable: boolean;
}

interface UseGetAppointmentSlotsParams {
  date: string; // Format: YYYY-MM-DD
  enabled?: boolean;
}

export const useGetAppointmentSlots = ({ date, enabled = true }: UseGetAppointmentSlotsParams) => {
  return useQuery({
    queryKey: ["appointment-slots", date],
    queryFn: async () => {
      const response = await api.get<AppointmentSlot[]>("/appointments/slots", {
        params: { date },
        headers: {
          Accept: "application/json",
        },
      });
      return response.data;
    },
    select: (data) => data,
    enabled: enabled && !!date,
  });
};
