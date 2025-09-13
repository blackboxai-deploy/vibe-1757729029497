"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/components/CreativeForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PreferencesStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: (name: keyof FormData, value: any) => void;
  watch: (name: keyof FormData) => any;
}

export default function PreferencesStep({ errors, setValue, watch }: PreferencesStepProps) {
  const interests = [
    { id: "technology", label: "Technology" },
    { id: "sports", label: "Sports" },
    { id: "music", label: "Music" },
    { id: "travel", label: "Travel" },
    { id: "cooking", label: "Cooking" },
    { id: "reading", label: "Reading" },
    { id: "gaming", label: "Gaming" },
    { id: "art", label: "Art & Design" },
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    const currentInterests = watch("interests") || [];
    const updatedInterests = checked
      ? [...currentInterests, interestId]
      : currentInterests.filter((id: string) => id !== interestId);
    setValue("interests", updatedInterests);
  };

  const currentInterests = watch("interests") || [];

  return (
    <div className="space-y-8 animate-fadeInUp">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Your Preferences</h2>
        <p className="text-gray-300">What are you interested in?</p>
      </div>
      
      {/* Newsletter preference */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Communication</h3>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="newsletter"
            checked={watch("newsletter")}
            onCheckedChange={(checked) => setValue("newsletter", checked)}
            className="border-white/30 data-[state=checked]:bg-blue-500"
          />
          <Label htmlFor="newsletter" className="text-gray-200 cursor-pointer">
            Subscribe to our newsletter for updates and tips
          </Label>
        </div>
      </div>
      
      {/* Interests */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Interests</h3>
        <p className="text-gray-400 text-sm mb-6">Select all that apply (minimum 2 required)</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className={`
                relative p-4 rounded-lg border transition-all duration-300 cursor-pointer group
                ${currentInterests.includes(interest.id)
                  ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                }
              `}
              onClick={() => handleInterestChange(interest.id, !currentInterests.includes(interest.id))}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={interest.id}
                  checked={currentInterests.includes(interest.id)}
                  onCheckedChange={(checked) => handleInterestChange(interest.id, !!checked)}
                  className="border-white/30 data-[state=checked]:bg-blue-500"
                />
                <Label 
                  htmlFor={interest.id} 
                  className="text-gray-200 cursor-pointer text-sm font-medium"
                >
                  {interest.label}
                </Label>
              </div>
              
              {/* Selection indicator */}
              {currentInterests.includes(interest.id) && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
        
        {errors.interests && (
          <p className="mt-4 text-sm text-red-300 animate-pulse">
            {errors.interests.message}
          </p>
        )}
      </div>
    </div>
  );
}