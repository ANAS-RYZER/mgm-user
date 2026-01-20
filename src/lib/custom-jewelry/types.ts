export interface JewelryRequest {
  id: string;
  images: string[];
  jewelryType: string;
  metalType: string;
  budget: string;
  description: string;
  status: "pending" | "reviewed" | "in-progress" | "completed";
  createdAt: Date;
  estimatedCompletion?: string;
  artisanNotes?: string;
}
