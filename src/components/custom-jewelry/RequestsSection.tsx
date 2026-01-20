"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Tag,
  Gem,
  DollarSign,
  Calendar,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useState, useMemo } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { JewelryRequest } from "@/lib/custom-jewelry/types";
import { statusConfig } from "@/lib/custom-jewelry/statusConfig";

interface Props {
  requests: JewelryRequest[];
  onSelect: (request: JewelryRequest) => void;
}

export default function RequestsSection({ requests, onSelect }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredRequests = useMemo(() => {
    if (activeTab === "all") return requests;
    return requests.filter((r) => r.status === activeTab);
  }, [activeTab, requests]);

  if (!requests.length) {
    return (
      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          No requests found
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Your Requests
        </h2>
        <p className="text-muted-foreground">
          Track the progress of your custom jewelry creations
        </p>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5">
          {["all", "pending", "reviewed", "in-progress", "completed"].map(
            (status) => (
              <TabsTrigger key={status} value={status}>
                {status}
                <Badge className="ml-1">
                  {status === "all"
                    ? requests.length
                    : requests.filter((r) => r.status === status).length}
                </Badge>
              </TabsTrigger>
            ),
          )}
        </TabsList>
      </Tabs>

      {filteredRequests.map((request, index) => {
        const status = statusConfig[request.status];

        return (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg cursor-pointer">
              <CardContent className="p-0 flex flex-col sm:flex-row">
                <div className="relative sm:w-64 h-56">
                  {request.images[0] && (
                    <Image
                      src={request.images[0]}
                      alt="preview"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 p-5 space-y-3">
                  <div className="flex justify-between">
                    <Badge className={`${status.color} border`}>
                      <span
                        className={`w-2 h-2 rounded-full ${status.dotColor} mr-2`}
                      />
                      {status.text}
                    </Badge>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelect(request)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>

                  <h3 className="font-bold flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {request.jewelryType}
                  </h3>

                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex gap-1">
                      <Gem className="w-4 h-4" />
                      {request.metalType}
                    </span>
                    <span className="flex gap-1">
                      <DollarSign className="w-4 h-4" />
                      {request.budget}
                    </span>
                    <span className="flex gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(request.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>

                  {request.artisanNotes && (
                    <div className="bg-muted p-3 rounded text-xs flex gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {request.artisanNotes}
                    </div>
                  )}

                  {request.estimatedCompletion && (
                    <div className="flex gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded w-fit">
                      <Clock className="w-4 h-4" />
                      {request.estimatedCompletion}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
