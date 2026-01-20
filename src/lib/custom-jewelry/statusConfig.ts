import { Clock, AlertCircle, Sparkles, CheckCircle } from "lucide-react";

export const statusConfig = {
  pending: {
    icon: Clock,
    text: "Pending Review",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    dotColor: "bg-yellow-500",
  },
  reviewed: {
    icon: AlertCircle,
    text: "Under Review",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    dotColor: "bg-blue-500",
  },
  "in-progress": {
    icon: Sparkles,
    text: "Crafting in Progress",
    color: "text-purple-600 bg-purple-50 border-purple-200",
    dotColor: "bg-purple-500",
  },
  completed: {
    icon: CheckCircle,
    text: "Ready for Pickup",
    color: "text-green-600 bg-green-50 border-green-200",
    dotColor: "bg-green-500",
  },
};
