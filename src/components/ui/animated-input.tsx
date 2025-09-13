"use client";

import { forwardRef, useState } from "react";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;

    return (
      <div className="relative">
        <input
          ref={ref}
          className={`
            w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl
            text-white placeholder-transparent focus:outline-none focus:border-blue-400
            transition-all duration-300 ease-in-out
            ${error ? 'border-red-400 focus:border-red-400' : ''}
            ${className}
          `}
          placeholder={label}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* Floating label */}
        <label
          className={`
            absolute left-4 transition-all duration-300 ease-in-out pointer-events-none
            ${isFocused || hasValue
              ? 'top-2 text-xs text-blue-300 font-medium'
              : 'top-4 text-gray-400'
            }
            ${error && (isFocused || hasValue) ? 'text-red-300' : ''}
          `}
        >
          {label}
        </label>
        
        {/* Focus indicator */}
        <div
          className={`
            absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300
            ${isFocused ? 'w-full' : 'w-0'}
          `}
        ></div>
        
        {/* Error message */}
        {error && (
          <p className="mt-2 text-sm text-red-300 animate-pulse">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;