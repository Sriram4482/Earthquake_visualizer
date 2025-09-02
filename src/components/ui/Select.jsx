import React from "react";

/* Simple select wrapper that accepts options as [{key,label,url}] or similar */
export default function Select({ value, onChange, options = [] }) {
  return (
    <select
      className="w-full rounded-md border px-3 py-2"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.key} value={opt.key}>{opt.label}</option>
      ))}
    </select>
  );
}
