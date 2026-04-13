"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const MGMLoader = ({margin="mt-40"}:{margin?: string}) => {
  return (
    <div className={clsx(margin, "flex flex-col gap-2 items-center justify-center")}>
      <div className="relative flex  items-center justify-center">
        {/* 🔵 Background Circle */}
        <div className="relative w-28 h-28 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <Image
            src="/images/footer-logo.png"
            alt="MGM Jewels Logo"
            fill
            priority
            className="object-cover absolute scale-150"
          />
        </div>

        {/* 🌀 Spinning Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute w-28 h-28 rounded-full border-4 border-gold/20 border-t-gold"
        />
      </div>

      {/* ✨ Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className=" text-gold text-sm tracking-wide"
      >
        Crafting Excellence
      </motion.div>
    </div>
  );
};

export default MGMLoader;
