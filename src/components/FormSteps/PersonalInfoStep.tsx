"use client";

import AnimatedInput from "@/components/ui/animated-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/components/CreativeForm";

interface PersonalInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: (name: keyof FormData, value: any) => void;
  watch: (name: keyof FormData) => any;
}

export default function PersonalInfoStep({ register, errors, setValue, watch }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
        <p className="text-gray-300">Tell us about yourself</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedInput
          label="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        
        <AnimatedInput
          label="Last Name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>
      
      <AnimatedInput
        label="Email Address"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedInput
          label="Age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          error={errors.age?.message}
        />
        
        <div className="space-y-2">
          <label className="text-sm text-gray-300 ml-1">Gender</label>
          <Select onValueChange={(value) => setValue("gender", value)} value={watch("gender")}>
            <SelectTrigger className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:border-blue-400 transition-all duration-300">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/90 backdrop-blur-md border-white/20">
              <SelectItem value="male" className="text-white hover:bg-white/10">Male</SelectItem>
              <SelectItem value="female" className="text-white hover:bg-white/10">Female</SelectItem>
              <SelectItem value="other" className="text-white hover:bg-white/10">Other</SelectItem>
              <SelectItem value="prefer_not_to_say" className="text-white hover:bg-white/10">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-300 animate-pulse">{errors.gender.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}