"use client";

import { useEffect, useState } from "react";

interface SuccessAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function SuccessAnimation({ isVisible, onComplete }: SuccessAnimationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
        onComplete?.();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded-full animate-bounce`}
              style={{
                backgroundColor: ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B'][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Success message */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 text-center border border-white/30 shadow-2xl transform animate-pulse">
        {/* Success icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Success!
        </h2>
        
        <p className="text-gray-300 text-lg">
          Your form has been submitted successfully.
        </p>
        
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-2xl border-2 border-green-400/50 animate-ping"></div>
        <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
}