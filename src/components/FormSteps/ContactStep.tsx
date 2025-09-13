"use client";

import AnimatedInput from "@/components/ui/animated-input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/components/CreativeForm";

interface ContactStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export default function ContactStep({ register, errors }: ContactStepProps) {
  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
        <p className="text-gray-300">How can we reach you?</p>
      </div>
      
      <AnimatedInput
        label="Phone Number"
        type="tel"
        {...register("phone")}
        error={errors.phone?.message}
      />
      
      <AnimatedInput
        label="Address"
        {...register("address")}
        error={errors.address?.message}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedInput
          label="City"
          {...register("city")}
          error={errors.city?.message}
        />
        
        <AnimatedInput
          label="Country"
          {...register("country")}
          error={errors.country?.message}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-gray-300 ml-1">Additional Message (Optional)</label>
        <Textarea
          placeholder="Tell us anything else you'd like us to know..."
          {...register("message")}
          className="min-h-[120px] px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 resize-none"
        />
        {errors.message && (
          <p className="text-sm text-red-300 animate-pulse">{errors.message.message}</p>
        )}
      </div>
      
      {/* Social media links */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Social Links (Optional)</h3>
        <div className="space-y-4">
          <AnimatedInput
            label="Website URL"
            type="url"
            {...register("website")}
            error={errors.website?.message}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedInput
              label="LinkedIn Profile"
              type="url"
              {...register("linkedin")}
              error={errors.linkedin?.message}
            />
            
            <AnimatedInput
              label="Twitter Handle"
              {...register("twitter")}
              error={errors.twitter?.message}
            />
          </div>
        </div>
      </div>
    </div>
  );
}