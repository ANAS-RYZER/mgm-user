import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Status =
  | "CONFIRMED"
  | "CANCELLED"
  | "ISPURCHASED"
  | "ISVISITED"
  | "NOTVISITED";

export const getStatusBadge = (status: Status) => {
  switch (status) {
    case "CONFIRMED":
      return {
        label: "Confirmed",
        className:
          "border-green-600 bg-green-300/10 text-green-600 hover:bg-green-300/10 hover:text-green-600",
      };

    case "CANCELLED":
      return {
        label: "Cancelled",
        className:
          "border-red-600 bg-red-300/10 text-red-600 hover:bg-red-300/10 hover:text-red-600   ",
      };

    case "ISPURCHASED":
      return {
        label: "Purchased",
        className:
          "border-yellow-600 bg-yellow-300/10 text-yellow-600 hover:bg-yellow-300/10 hover:text-yellow-600",
      };

    case "ISVISITED":
      return {
        label: "Visited",
        className:
          "border-blue-600 bg-blue-300/10 text-blue-600 hover:bg-blue-300/10 hover:text-blue-600",
      };

    case "NOTVISITED":
      return {
        label: "Not Visited",
        className:
          "border-gray-600 bg-gray-300/10 text-gray-600 hover:bg-gray-300/10 hover:text-gray-600",
      };

    default:
      return {
        label: status,
        className:
          "border-gray-600 bg-gray-300/10 text-gray-600 hover:bg-gray-300/10 hover:text-gray-600",
      };
  }
};