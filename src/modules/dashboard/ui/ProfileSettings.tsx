"use client";
import { useEffect, useState } from "react";
import ProfilePicture from "@/modules/dashboard/components/profile/ProfilePicture";
import ProfileForm from "@/modules/dashboard/components/profile/ProfileForm";
import Preferences from "@/modules/dashboard/components/profile/Preferences";
import ConfirmationDialog from "@/modules/dashboard/components/profile/ConfirmationDialog";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/httpClient";
import useGetImageURL from "@/hooks/Upload-image/useGetImage";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}
// const defaultProfile: UserProfile = {
//   name: "Priya Sharma",
//   email: "priya.sharma@email.com",
//   phone: "+91 98765 43210",
//   address:
//     "123 Jewelers Lane, Zaveri Bazaar, Mumbai - 400002, Maharashtra, India",
//   avatar: "",
// };
    
const ProfileSettings = ({ profile }: { profile: any }) => {
  const [profileData, setProfileData] = useState<UserProfile>(() => ({
    name: profile?.fullName ?? profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    address: profile?.address ?? "",
    avatar: profile?.avatar ?? "",
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState<string>("");
  const [imageloading, setImageLoading] = useState(false);
  const { toast } = useToast();

  const {getImageURL , loading } = useGetImageURL();



 
  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = async (file: File) => {
    setImageLoading(true);
    try {
      const fileData = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        refId: (profile as any)?._id,
        belongsTo: 'user' as const,
      };
      
      const uploadUrl = await getImageURL(fileData);
      console.log("uploadUrl", uploadUrl);
      const uploadUrlLink = uploadUrl.data.uploadUrl;
      const s3ResponseId = uploadUrl.data.assetS3Object?._id;
      console.log("S3 Response ID", uploadUrlLink);
      const response = await fetch(uploadUrlLink, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      console.log("Upload response", response);

      const responseS3Url = await apiClient.get(`/assets/${s3ResponseId}/url`);
      console.log("S3 URL response", responseS3Url);
      console.log("Image URL:", responseS3Url.data.data.url);
      const image = responseS3Url.data.data.url;
      setSelectedAvatar(image);
    }
    catch (error) {
      console.error("Error uploading avatar:", error);
    }
    finally {
      setImageLoading(false);
      setShowAvatarDialog(true);
    }
  };

  const confirmAvatarChange = () => {
    handleChange("avatar", selectedAvatar);
    setShowAvatarDialog(false);
    toast({
      title: "Avatar Updated",
      description: "Your profile picture has been updated successfully",
    });
  };

  const handlePreferenceClick = (preference: string) => {
    setSelectedPreference(preference);
    setShowPreferencesDialog(true);
  };

  const confirmPreferenceChange = () => {
    toast({
      title: "Preference Updated",
      description: `${selectedPreference} preference has been updated`,
    });
    setShowPreferencesDialog(false);
    setSelectedPreference("");
  };

  const handleSave = () => {
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(profileData));
      setIsLoading(false);
      setShowSaveDialog(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully",
      });
    }, 500);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-mgm rounded-2xl p-6 text-primary-foreground shadow-xl">
        <h1 className="font-display text-3xl font-bold mb-2">
          Profile Settings
        </h1>
        <p className="text-primary-foreground/90">
          Manage your account information and preferences
        </p>
      </div>
      <div className="w-full gap-4 mb-8 grid lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ProfilePicture
            avatar={selectedAvatar || profileData.avatar}
            onAvatarChange={handleAvatarChange}
            name={profileData.name}
            email={profileData.email}
          />
        </div>
        <div className="lg:col-span-8">
          <ProfileForm
            profile={profileData}
            onChange={handleChange}
            onSave={handleSave}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Preferences onPreferenceClick={handlePreferenceClick} />

      <ConfirmationDialog
        title="Save Profile Changes"
        description="Are you sure you want to save the changes to your profile?"
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onConfirm={confirmSave}
      />
      <ConfirmationDialog
        title="Update Profile Picture"
        description="Are you sure you want to update your profile picture?"
        isOpen={showAvatarDialog}
        onClose={() => setShowAvatarDialog(false)}
        onConfirm={confirmAvatarChange}
      />
      <ConfirmationDialog
        title="Update Preferences"
        description={`Are you sure you want to update your ${selectedPreference} preference?`}
        isOpen={showPreferencesDialog}
        onClose={() => setShowPreferencesDialog(false)}
        onConfirm={confirmPreferenceChange}
      />
    </div>
  );
};

export default ProfileSettings;
