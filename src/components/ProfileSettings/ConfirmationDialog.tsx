import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog = ({ title, description, isOpen, onClose, onConfirm }: ConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-xl shadow-xl max-w-md w-full overflow-hidden"
      >
        <div className="p-6">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm}>Confirm</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationDialog;