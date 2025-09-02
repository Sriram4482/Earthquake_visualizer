import React from "react";
export default function Input({ value, onChange, placeholder, ...rest }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-md border px-3 py-2"
      {...rest}
    />
  );
}
