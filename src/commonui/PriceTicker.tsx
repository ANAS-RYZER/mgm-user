"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetalPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
}

const PriceTicker = () => {
  const [prices, setPrices] = useState<MetalPrice[]>([
    {
      name: "Gold",
      symbol: "AU",
      price: 6234.5,
      change: 12.3,
      changePercent: 0.2,
      unit: "10g",
    },
    {
      name: "Silver",
      symbol: "AG",
      price: 73.25,
      change: -0.85,
      changePercent: -1.15,
      unit: "10g",
    },
    {
      name: "Platinum",
      symbol: "PT",
      price: 3845.75,
      change: 25.4,
      changePercent: 0.66,
      unit: "10g",
    },
  ]);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prevPrices) =>
        prevPrices.map((metal) => {
          const randomChange = (Math.random() - 0.5) * 10;
          const newPrice = metal.price + randomChange;
          const change = newPrice - metal.price + metal.change;
          const changePercent = (change / (newPrice - change)) * 100;

          return {
            ...metal,
            price: Math.max(0, newPrice),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2)),
          };
        }),
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const tickerItems = [...prices, ...prices, ...prices]; // Triple for seamless loop

  return (
    <div className="bg-gradient-mgm text-primary-foreground overflow-hidden py-3 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-8"
        animate={{ x: 0 }}
        whileHover={{
          x: [-2000, 0],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          },
        }}
      >
        {tickerItems.map((metal, index) => (
          <div
            key={`${metal.symbol}-${index}`}
            className="flex items-center gap-3 flex-shrink-0 px-4"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-gold-light">{metal.name}</span>
              <span className="text-xs text-primary-foreground/70">
                ({metal.symbol})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold">
                ₹{metal.price.toFixed(2)}/{metal.unit}
              </span>

              <div
                className={`flex items-center gap-1 text-xs ${
                  metal.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {metal.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {metal.change >= 0 ? "+" : ""}
                  {metal.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PriceTicker;
