"use client";

import { useState } from "react";
import { JewelryRequest } from "@/lib/custom-jewelry/types";
import { mockRequests } from "@/lib/custom-jewelry/mockData";

export const useJewelryRequests = () => {
  const [requests, setRequests] = useState<JewelryRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<JewelryRequest | null>(null);

  const addRequest = (request: JewelryRequest) => {
    setRequests(prev => [request, ...prev]);
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    setSelectedRequest(null);
  };

  return {
    requests,
    selectedRequest,
    setSelectedRequest,
    addRequest,
    deleteRequest,
  };
};
