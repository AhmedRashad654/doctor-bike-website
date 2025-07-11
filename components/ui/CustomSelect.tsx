import React from "react";

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({
  options,
  placeholder,
  className = "",
  ...props
}: CustomSelectProps) {
  return (
    <select
      className={`w-full py-[9px] px-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-[#0f0f1f] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
