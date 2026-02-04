"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Send, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { JewelryRequest } from "@/lib/custom-jewelry/types";
import { useJewelryRequests } from "@/hooks/useJewelryRequests";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function RequestForm() {
  const { addRequest } = useJewelryRequests();
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [jewelryType, setJewelryType] = useState("");
  const [metalType, setMetalType] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<JewelryRequest | null>(null);
  const [requests, setRequests] = useState<JewelryRequest[]>([
    {
      id: "1",
      images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"],
      jewelryType: "necklace",
      metalType: "22k-gold",
      budget: "1-2lakh",
      description: "Traditional gold necklace with modern design elements for wedding occasion. Looking for intricate work with floral patterns.",
      status: "in-progress",
      createdAt: new Date("2024-12-10"),
      estimatedCompletion: "Dec 28, 2024",
      artisanNotes: "Beautiful design! We've started the initial sketches and will share them soon."
    },
    {
      id: "2",
      images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400"],
      jewelryType: "ring",
      metalType: "diamond",
      budget: "2-5lakh",
      description: "Engagement ring with solitaire diamond and rose gold band. Prefer cushion cut diamond.",
      status: "reviewed",
      createdAt: new Date("2024-12-08"),
      artisanNotes: "We've reviewed your request and are preparing a detailed quote with options."
    },
    {
      id: "3",
      images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"],
      jewelryType: "earrings",
      metalType: "24k-gold",
      budget: "50k-1lakh",
      description: "Temple jewelry style earrings with intricate filigree work",
      status: "completed",
      createdAt: new Date("2024-12-05"),
      artisanNotes: "Your custom earrings are ready for pickup! We're thrilled with how they turned out."
    },
    {
      id: "4",
      images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400"],
      jewelryType: "bangle",
      metalType: "22k-gold",
      budget: "1-2lakh",
      description: "Set of 4 bangles with antique finish and peacock motifs",
      status: "pending",
      createdAt: new Date("2024-12-15"),
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (images.length >= 5) {
        toast({
          title: "Maximum images reached",
          description: "You can upload up to 5 reference images",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast({
        title: "Please upload at least one image",
        description: "Reference images help us understand your vision",
        variant: "destructive",
      });
      return;
    }

    if (!jewelryType || !metalType || !budget) {
      toast({
        title: "Please fill all required fields",
        description: "All fields are necessary to process your request",
        variant: "destructive",
      });
      return;
    }

    const newRequest: JewelryRequest = {
      id: Date.now().toString(),
      images,
      jewelryType,
      metalType,
      budget,
      description,
      status: "pending",
      createdAt: new Date(),
    };

    setRequests([newRequest, ...requests]);

    // Reset form
    setImages([]);
    setJewelryType("");
    setMetalType("");
    setBudget("");
    setDescription("");

    toast({
      title: "Request Submitted Successfully!",
      description: "Our master artisans will review your design within 24-48 hours.",
    });
  };

  const deleteRequest = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
    setSelectedRequest(null);
    toast({
      title: "Request deleted",
      description: "Your jewelry request has been removed.",
    });
  };

  return (
    <div className="lg:col-span-2">
          <Card className="sticky top-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
            <CardHeader className="bg-gradient-mgm/10 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-2xl font-display">
                <Gem className="w-6 h-6 text-primary-foreground" />
                New Request
              </CardTitle>
              <CardDescription>
                Share every detail that makes your design special
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Reference Images *</Label>
                  <p className="text-xs text-muted-foreground">Upload up to 5 images</p>
                  <div
                    className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center cursor-pointer hover:border-border hover:bg-muted/50 transition-all"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm font-medium text-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB each
                    </p>
                  </div>

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {images.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative aspect-square rounded-lg overflow-hidden group shadow-md"
                        >
                          <Image
                            src={img}
                            alt={`Reference ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <X className="w-6 h-6 text-white" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Two Column Layout for Selects */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Jewelry Type */}
                  <div className="space-y-2">
                    <Label htmlFor="jewelryType" className="font-semibold">Type *</Label>
                    <Select value={jewelryType} onValueChange={setJewelryType}>
                      <SelectTrigger className="border-border/50">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="necklace">Necklace</SelectItem>
                        <SelectItem value="earrings">Earrings</SelectItem>
                        <SelectItem value="ring">Ring</SelectItem>
                        <SelectItem value="bangle">Bangle</SelectItem>
                        <SelectItem value="bracelet">Bracelet</SelectItem>
                        <SelectItem value="pendant">Pendant</SelectItem>
                        <SelectItem value="anklet">Anklet</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Metal Type */}
                  <div className="space-y-2">
                    <Label htmlFor="metalType" className="font-semibold">Metal *</Label>
                    <Select value={metalType} onValueChange={setMetalType}>
                      <SelectTrigger className="border-border/50">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24k-gold">24K Gold</SelectItem>
                        <SelectItem value="22k-gold">22K Gold</SelectItem>
                        <SelectItem value="18k-gold">18K Gold</SelectItem>
                        <SelectItem value="diamond">Diamond</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="rose-gold">Rose Gold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label htmlFor="budget" className="font-semibold">Budget Range *</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="border-amber-200">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                      <SelectItem value="50k-1lakh">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="1-2lakh">₹1,00,000 - ₹2,00,000</SelectItem>
                      <SelectItem value="2-5lakh">₹2,00,000 - ₹5,00,000</SelectItem>
                      <SelectItem value="above-5lakh">Above ₹5,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-semibold">Design Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your vision... What occasion is this for? Any specific patterns, stones, or cultural elements you'd like? Any inspiration behind the design?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="border-border/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-mgm hover:opacity-90 shadow-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Request
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Our artisans typically respond within 24-48 hours
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
  );
}
