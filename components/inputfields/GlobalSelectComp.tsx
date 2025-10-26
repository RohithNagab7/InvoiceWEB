"use client"

import React from "react";

interface NoCodeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  heading?: string;
  error?: string;
  item?: string[];
}

const GlobalSelectComp = React.forwardRef<HTMLSelectElement, NoCodeSelectProps>(
  ({ heading, item = [], error, ...rest }, ref) => {
    return (
      <div className="flex flex-col w-full">
       {heading &&  <div className="flex justify-between items-center mb-1">
          <label className="font-medium">{heading}</label>
        </div>}

        {/* Select Input */}
        <select
          ref={ref}
          className="w-full border rounded-xl border-gray-400 hover:border-[#fe6c02] focus:border-[#fe6c02] p-2 outline-none"
          {...rest}
        >
          <option value="">Select</option>
          {item.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

GlobalSelectComp.displayName = "GlobalSelectComp";



export default GlobalSelectComp;