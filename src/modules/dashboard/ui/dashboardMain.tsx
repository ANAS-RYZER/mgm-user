"use client";
import { motion } from "framer-motion";
import { Sparkles, Heart, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useGetDashboard } from "../hooks/useGetDashboard";
import AnimatedPage from "@/components/AnimatedPage";

interface DashboardHomeProps {
  onNavigate: (tab: "home" | "custom-request" | "wishlist" | "appointments" | "settings") => void;
  profile: any;
}

const DashboardHome = ({ onNavigate, profile: _profile }: DashboardHomeProps) => {

  const { data: dashboard , isFetching, isError } = useGetDashboard();
  console.log(dashboard?.data , "dashboard");


  const quickActions = [
    {
      title: "My Wishlist",
      description: "View your saved items",
      icon: Heart,
      color: "bg-accent/10 text-accent",
      action: () => onNavigate("wishlist"),
    },
    {
      title: "Appointments",
      description: "Manage your store visits",
      icon: Calendar,
      color: "bg-secondary/50 text-secondary-foreground",
      action: () => onNavigate("appointments"),
    },
  ];

  if (isFetching) return (
    <AnimatedPage isLoading={true} />
);
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-mgm p-8">
        <div className="relative z-10">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-primary-foreground/90 max-w-xl">
            Explore our exquisite collection, request custom jewelry, and manage your appointments all in one place.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Wishlist Items", value: dashboard?.data?.wishlistCount || 0, icon: Heart },
          { label: "Appointments", value: dashboard?.data?.totalAppointments || 0, icon: Calendar },
          { label: "Store Visits", value: dashboard?.data?.storeVisitCount || 0, icon: TrendingUp },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default DashboardHome;
