"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const REF_ID_COPY = {
  title: "Do you have the referral?",
  label: "Referral ID (optional)",
  placeholder: "Enter referral ID",
  createAccount: "Create Account",
} as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

type RefIdDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAccount: (refId: string | undefined) => void;
  isLoading?: boolean;
};

export function RefIdDialog({
  open,
  onOpenChange,
  onCreateAccount,
  isLoading = false,
}: RefIdDialogProps) {
  const [refId, setRefId] = useState("");

  // Clear refId when dialog closes so it's reset for next time
  useEffect(() => {
    if (!open) setRefId("");
  }, [open]);

  const handleCreateAccount = () => {
    onCreateAccount(refId.trim() || undefined);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            role="presentation"
            aria-hidden
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ref-id-dialog-title"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto w-full max-w-md rounded-lg bg-primary p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h2
                  id="ref-id-dialog-title"
                  className="text-lg font-semibold leading-none tracking-tight text-white "
                >
                  {REF_ID_COPY.title}
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="ref-id" className="text-white/90">{REF_ID_COPY.label}</Label>
                  <Input
                    id="ref-id"
                    type="text"
                    placeholder={REF_ID_COPY.placeholder}
                    value={refId}
                    onChange={(e) => setRefId(e.target.value)}
                    autoFocus
                    className="text-white"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleCreateAccount}
                  disabled={isLoading}
                  className="w-full bg-background/20 border border-primary-foreground/30 text-primary-foreground hover:bg-background/30 hover:border-primary-foreground/50 backdrop-blur-sm font-medium p-4"
                >
                  {isLoading ? "Please wait..." : REF_ID_COPY.createAccount}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
