"use client";

import React from "react";

export interface NoCodeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  heading?: string;
  error?: string;
  name: string;
}

const GlobalInputComp = React.forwardRef<HTMLInputElement, NoCodeInputProps>(
  ({ heading, error, type = "text", name, ...rest }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1">
          {heading && <label className={`font-medium `}>{heading}</label>}
        </div>

        <input
          type={type}
          name={name}
          ref={ref}
          className="w-full p-2 border rounded-xl border-gray-400 hover:border-[#fe6c02] focus:border-[#fe6c02]  outline-none"
          {...rest}
        />

        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

GlobalInputComp.displayName = "GlobalInputComp";

export default GlobalInputComp;
