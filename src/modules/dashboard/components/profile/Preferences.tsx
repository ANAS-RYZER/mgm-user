"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";


interface PreferencesProps {
  onPreferenceClick: (preference: string) => void;
}

const Preferences = ({ onPreferenceClick }: PreferencesProps) => {
  return (
    <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              type="button"
              className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              onClick={() => onPreferenceClick("Notifications")}
            >
              <h4 className="font-medium text-foreground mb-1 text-sm">Notifications</h4>
              <p className="text-xs text-muted-foreground">
                Receive updates about your orders and offers
              </p>
            </button>
            <button
              type="button"
              className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              onClick={() => onPreferenceClick("Newsletter")}
            >
              <h4 className="font-medium text-foreground mb-1 text-sm">Newsletter</h4>
              <p className="text-xs text-muted-foreground">
                Get latest collections and exclusive deals
              </p>
            </button>
            <button
              type="button"
              className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              onClick={() => onPreferenceClick("Language")}
            >
              <h4 className="font-medium text-foreground mb-1 text-sm">Language</h4>
              <p className="text-xs text-muted-foreground">
                English (India)
              </p>
            </button>
          </div>
      </CardContent>
    </Card>
  );
};

export default Preferences;