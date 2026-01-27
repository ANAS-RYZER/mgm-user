"use client";
import { User, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ProfilePictureProps {
  avatar: string;
  onAvatarChange: (file: File) => void;
  name: string;
  email: string;
}

const ProfilePicture = ({
  avatar,
  onAvatarChange,
  name,
  email,
}: ProfilePictureProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarChange(file);
    }
  };
    
  return (
    <>
      <Card className="h-full border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col">
        <CardContent className="p-4 text-center">
          <div className="relative w-28 h-28 mx-auto mb-3">
            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                  height={100}
                  width={300}
                />
              ) : (
                <User className="w-16 h-16 text-primary" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-all duration-300 hover:scale-110">
              <Camera className="w-4 h-4 text-primary-foreground" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <h3 className="font-semibold text-foreground">
            {name || "Your Name"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {email || "your@email.com"}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfilePicture;
