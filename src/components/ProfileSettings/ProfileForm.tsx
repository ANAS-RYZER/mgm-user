"use client";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";



type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

interface ProfileFormProps {
  profile: Profile;
  onChange: (field: keyof Profile, value: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const ProfileForm = ({ profile, onChange, onSave, isLoading }: ProfileFormProps) => {
  return (
    <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter your name"
                value={profile.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) => onChange("email", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={profile.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Textarea
              id="address"
              placeholder="Enter your address"
              value={profile.address}
              onChange={(e) => onChange("address", e.target.value)}
              className="pl-10 min-h-[100px]"
            />
          </div>
        </div>
        <Button onClick={onSave} disabled={isLoading} className="gap-2 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;