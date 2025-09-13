"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ProgressIndicator from "@/components/ui/progress-indicator";
import SuccessAnimation from "@/components/ui/success-animation";
import PersonalInfoStep from "@/components/FormSteps/PersonalInfoStep";
import PreferencesStep from "@/components/FormSteps/PreferencesStep";
import ContactStep from "@/components/FormSteps/ContactStep";
import ReviewStep from "@/components/FormSteps/ReviewStep";
import { Button } from "@/components/ui/button";

// Form validation schema
const formSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.number().min(18, "Must be at least 18 years old").max(120, "Age must be realistic"),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"], {
    required_error: "Please select a gender",
  }),
  
  // Preferences
  newsletter: z.boolean(),
  interests: z.array(z.string()).min(2, "Please select at least 2 interests"),
  
  // Contact Info
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  message: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  twitter: z.string().optional(),
  
  // Terms
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { label: "Personal", component: PersonalInfoStep },
  { label: "Preferences", component: PreferencesStep },
  { label: "Contact", component: ContactStep },
  { label: "Review", component: ReviewStep },
];

export default function CreativeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      newsletter: false,
      interests: [],
      acceptTerms: false,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email", "age", "gender"];
        break;
      case 2:
        fieldsToValidate = ["interests"];
        break;
      case 3:
        fieldsToValidate = ["phone", "address", "city", "country"];
        break;
      case 4:
        fieldsToValidate = ["acceptTerms"];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const formData = watch();
  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={STEPS.length}
          stepLabels={STEPS.map(step => step.label)}
        />

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Current Step Content */}
            <div className="min-h-[500px]">
              <CurrentStepComponent
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                formData={formData}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
              <Button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className={`
                  px-8 py-3 rounded-xl font-medium transition-all duration-300
                  ${currentStep === 1
                    ? 'opacity-50 cursor-not-allowed bg-gray-500/20 border-gray-500/30 text-gray-400'
                    : 'bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40'
                  }
                `}
              >
                Previous
              </Button>

              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>{currentStep}</span>
                <span>/</span>
                <span>{STEPS.length}</span>
              </div>

              {currentStep < STEPS.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    px-8 py-3 font-medium rounded-xl shadow-lg transition-all duration-300 transform
                    ${isSubmitting
                      ? 'bg-gray-500/50 cursor-not-allowed text-gray-300'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl hover:scale-105'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Form'
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Success Animation */}
      <SuccessAnimation
        isVisible={showSuccess}
        onComplete={() => setShowSuccess(false)}
      />
    </>
  );
}