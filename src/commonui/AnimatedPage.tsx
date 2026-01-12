import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedPage = ({ children, className = "" }: AnimatedPageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Show loader for 800ms

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-mgm z-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            {...({
              animate: { rotate: 360 },
              transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
            } as any)}
            className="relative w-24 h-24 mx-auto mb-4"
          >
            <div className="absolute inset-0 fixed-0 flex items-center justify-center">
              <img
                src="/images/footer-logo.png"
                alt="MGM Jewels Logo"
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-gold/20 border-t-gold"></div>
          </motion.div>
          <motion.div
            {...({
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5, duration: 0.5 },
            } as any)}
            className="text-primary-foreground/70 text-sm"
          >
            Crafting Excellence
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      {...({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
      } as any)}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
