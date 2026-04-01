"use client";
import { motion } from "framer-motion";
import { Sparkles, Heart, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface DashboardHomeProps {
  onNavigate: (tab: "home" | "custom-request" | "wishlist" | "appointments" | "settings") => void;
  profile: any;
}

const DashboardHome = ({ onNavigate, profile: _profile }: DashboardHomeProps) => {


  const quickActions = [
    {
      title: "Custom Jewelry Request",
      description: "Upload your design and get it crafted",
      icon: Sparkles,
      color: "bg-gradient-mgm/10 text-primary-foreground",
      action: () => onNavigate("custom-request"),
    },
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Wishlist Items", value: "4", icon: Heart },
          { label: "Appointments", value: "3", icon: Calendar },
          { label: "Custom Requests", value: "3", icon: Sparkles },
          { label: "Store Visits", value: "12", icon: TrendingUp },
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

      {/* Featured Products */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display text-xl">Featured Collection</CardTitle>
          <Link href="/catalogue">
            <Button variant="ghost" size="sm" className="gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
        {/* //  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/product/${product.id}`}>
                  <div className="group relative overflow-hidden rounded-xl">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium truncate">{product.name}</p>
                      <p className="text-white/80 text-xs">{product.price}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
