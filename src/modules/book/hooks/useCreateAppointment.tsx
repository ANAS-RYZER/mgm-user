import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/httpClient";

export interface CreateAppointmentPayload {
  date: string; // Format: YYYY-MM-DD
  slotCode: "MORNING" | "EVENING" | "NIGHT";
  productIds: string[];
}

export interface CreateAppointmentResponse {
  id?: string;
  date?: string;
  slotCode?: string;
  productIds?: string[];
  [key: string]: any;
}

export const useCreateAppointment = () => {
  return useMutation<CreateAppointmentResponse, Error, CreateAppointmentPayload>({
    mutationFn: async (payload: CreateAppointmentPayload) => {
      const response = await apiClient.post<CreateAppointmentResponse>(
        "/appointments",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });
};
