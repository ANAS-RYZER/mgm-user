"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NetworkStatus(): JSX.Element | null {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);
    setShowBanner(!navigator.onLine);

    // Listen for online/offline events
    const handleOnline = (): void => {
      setIsOnline(true);
      setShowBanner(false);
    };

    const handleOffline = (): void => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Also check network status periodically
    const checkNetworkStatus = async (): Promise<void> => {
      try {
        const response = await fetch("/favicon.ico", {
          method: "HEAD",
          cache: "no-cache",
        });
        if (!response.ok) {
          throw new Error("Network error");
        }
        setIsOnline(true);
        setShowBanner(false);
      } catch {
        setIsOnline(false);
        setShowBanner(true);
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkNetworkStatus, 30000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {showBanner && !isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground px-4 py-3 shadow-lg"
        >
          <div className="container mx-auto flex items-center gap-3">
            <WifiOff className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">No Internet Connection</p>
              <p className="text-sm opacity-90">
                Please check your network connection and try again.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
