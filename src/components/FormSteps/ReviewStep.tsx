"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/components/CreativeForm";

interface ReviewStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  formData: FormData;
  setValue: (name: keyof FormData, value: any) => void;
  watch: (name: keyof FormData) => any;
}

export default function ReviewStep({ errors, formData, setValue, watch }: ReviewStepProps) {
  const interestLabels: { [key: string]: string } = {
    technology: "Technology",
    sports: "Sports",
    music: "Music",
    travel: "Travel",
    cooking: "Cooking",
    reading: "Reading",
    gaming: "Gaming",
    art: "Art & Design",
  };

  return (
    <div className="space-y-8 animate-fadeInUp">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Review & Submit</h2>
        <p className="text-gray-300">Please review your information before submitting</p>
      </div>
      
      {/* Personal Information Review */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <span className="text-gray-400 text-sm">Name:</span>
            <p className="text-white">{formData.firstName} {formData.lastName}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Email:</span>
            <p className="text-white">{formData.email}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Age:</span>
            <p className="text-white">{formData.age}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Gender:</span>
            <p className="text-white capitalize">{formData.gender?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
      
      {/* Preferences Review */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
          Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <span className="text-gray-400 text-sm">Newsletter:</span>
            <p className="text-white">{formData.newsletter ? 'Subscribed' : 'Not subscribed'}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Interests:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests?.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30"
                >
                  {interestLabels[interest] || interest}
                </span>
              )) || <p className="text-gray-400">None selected</p>}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information Review */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <span className="text-gray-400 text-sm">Phone:</span>
            <p className="text-white">{formData.phone || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Address:</span>
            <p className="text-white">{formData.address || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">City:</span>
            <p className="text-white">{formData.city || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Country:</span>
            <p className="text-white">{formData.country || 'Not provided'}</p>
          </div>
        </div>
        
        {formData.message && (
          <div className="mt-4">
            <span className="text-gray-400 text-sm">Message:</span>
            <p className="text-white mt-1 p-3 bg-white/5 rounded-lg border border-white/10">
              {formData.message}
            </p>
          </div>
        )}
      </div>
      
      {/* Terms and Conditions */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={watch("acceptTerms")}
            onCheckedChange={(checked) => setValue("acceptTerms", checked)}
            className="border-white/30 data-[state=checked]:bg-blue-500 mt-1"
          />
          <div>
            <Label htmlFor="terms" className="text-gray-200 cursor-pointer leading-relaxed">
              I agree to the <span className="text-blue-400 underline">Terms of Service</span> and{" "}
              <span className="text-blue-400 underline">Privacy Policy</span>. I understand that my
              information will be processed according to these agreements.
            </Label>
            {errors.acceptTerms && (
              <p className="mt-2 text-sm text-red-300 animate-pulse">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}