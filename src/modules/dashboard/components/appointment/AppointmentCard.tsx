"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { getStatusBadge } from "@/lib/utils";
import clsx from "clsx";

interface Product {
  name: string;
  sku: string;
  mrpPrice: number;
  image: string;
}

export interface Appointment {
  _id: string;
  date: string;
  slotStartTime: string;
  slotEndTime: string;
  visitType: string;
  status: string;
  referralCode: string;
  products: Product[];
}

export const AppointmentCard = ({
  appointment,
  index,
}: {
  appointment: Appointment;
  index: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  const MAX_VISIBLE = 2;
  const products = appointment.products || [];

  const visibleProducts = expanded
    ? products
    : products.slice(0, MAX_VISIBLE);

  const remaining = products.length - MAX_VISIBLE;
  const status=getStatusBadge(appointment.status as any);

  return (
    <motion.div
      key={appointment._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-border/50 hover:shadow-lg transition-all duration-300 rounded-2xl">
        <CardContent className="p-6 space-y-5">

          {/* Header */}
          <div className="flex justify-between items-center">
            <Badge
              className={clsx(status.className, "px-3 py-1 text-sm shadow-none cursor-pointer ")}
            >
              {status.label}
            </Badge>

            <span className="text-sm text-muted-foreground">
              {appointment.referralCode}
            </span>
          </div>

          {/* Date / Time / Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {new Date(appointment.date).toDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {appointment.slotStartTime} - {appointment.slotEndTime}
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {appointment.visitType}
            </div>
          </div>

          {/* Product Count */}
          <div className="text-sm font-medium text-muted-foreground">
            {products.length} Product{products.length > 1 && "s"}
          </div>

          {/* Product List */}
          <div className="space-y-3">
            {visibleProducts.map((p: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl border bg-muted/20"
              >
                {/* Image */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 object-cover rounded-lg border"
                />

                {/* Info */}
                <div className="flex-1">
                  <p className="font-medium text-sm line-clamp-1">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    SKU: {p.sku}
                  </p>
                </div>

                {/* Price */}
                <div className="text-sm font-semibold">
                  ₹{p.mrpPrice.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Show More */}
          {remaining > 0 && !expanded && (
            <div
              className="text-sm text-primary cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              +{remaining} more items
            </div>
          )}

        </CardContent>
      </Card>
    </motion.div>
  );
};