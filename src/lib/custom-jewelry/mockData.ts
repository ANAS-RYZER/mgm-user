import { JewelryRequest } from "./types";

export const mockRequests: JewelryRequest[] = [
  {
    id: "1",
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"],
    jewelryType: "necklace",
    metalType: "22k-gold",
    budget: "1-2 lakh",
    description: "Wedding necklace with floral work",
    status: "in-progress",
    createdAt: new Date("2024-12-10"),
    estimatedCompletion: "Dec 28, 2024",
    artisanNotes: "Sketches in progress",
  },
  {
    id: "2",
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400"],
    jewelryType: "ring",
    metalType: "diamond",
    budget: "2-5 lakh",
    description: "Solitaire engagement ring",
    status: "reviewed",
    createdAt: new Date("2024-12-08"),
  },
];
