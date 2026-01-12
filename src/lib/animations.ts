import { Variants } from "framer-motion";

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

// Fade in variants
export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide up variants
export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

// Scale in variants
export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Stagger container for list animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger item variants
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

export const hoverLift = {
  whileHover: { y: -5, transition: { duration: 0.2 } },
  whileTap: { y: 0 },
};

// Card animations
export const cardVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, scale: 0.95 },
};

// Modal animations
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.8 },
};

// Drawer/Slide panel animations
export const drawerVariants: Variants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
  exit: { x: "100%" },
};

// Hero text animations
export const heroTextVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Image reveal animation
export const imageRevealVariants: Variants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// Button hover animation
export const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

// Floating animation for decorative elements
export const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Pulse animation for attention-grabbing elements
export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Shimmer/glow effect
export const shimmerVariants = {
  initial: { backgroundPosition: "200% 0" },
  animate: {
    backgroundPosition: "-200% 0",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};
