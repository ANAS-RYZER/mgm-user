"use client";

import RequestForm from "../components/custom/RequestForm";
import RequestsSection from "../components/custom/RequestsSection";
import RequestDetailsModal from "../components/custom/RequestDetailsModal";
import { useJewelryRequests } from "@/hooks/useJewelryRequests";
import { Sparkles } from "lucide-react";

export default function CustomJewelryPage({ profile: _profile }: { profile: any }) {
  const { requests, selectedRequest, setSelectedRequest, deleteRequest } =
    useJewelryRequests();

  return (
    <>
      <div className="p-6 lg:p-8 space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-mgm p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8" />
              <span className="text-sm font-medium tracking-wide uppercase text-primary-foreground/90">
                Custom Creations
              </span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Turn Your Vision Into Reality
            </h1>
            <p className="text-primary-foreground/90 max-w-2xl">
              Share your dream jewelry design with our master artisans. Upload
              reference images, describe your vision, and we &apos; ll craft a
              masterpiece uniquely yours.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>
      </div>
      <div className="w-full gap-4 px-6 lg:px-8 mb-8 grid lg:grid-cols-12">
        <div className="lg:col-span-4">
          <RequestForm />
        </div>

        <div className="lg:col-span-8">
          <RequestsSection requests={requests} onSelect={setSelectedRequest} />
        </div>
      </div>

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onDelete={deleteRequest}
        />
      )}
    </>
  );
}
