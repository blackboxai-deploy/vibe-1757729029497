"use client";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-white/20 rounded-full backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-500 border-2
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg' 
                    : 'bg-white/10 text-gray-400 border-white/20'
                  }
                  ${isCurrent ? 'ring-4 ring-blue-400/30 scale-110' : ''}
                `}
              >
                {stepNumber}
              </div>
              <span className={`text-xs text-center transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}