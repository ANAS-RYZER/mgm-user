"use client";

import { JewelryRequest } from "@/lib/custom-jewelry/types";
import { Button } from "@/components/ui/button";

interface Props {
  request: JewelryRequest;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function RequestDetailsModal({ request, onClose, onDelete }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold capitalize">{request.jewelryType}</h2>
        <p className="text-sm mt-2">{request.description}</p>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="destructive" onClick={() => onDelete(request.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
