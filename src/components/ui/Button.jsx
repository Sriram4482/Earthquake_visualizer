import React from "react";
export default function Button({ children, onClick, variant = "default", size = "md", ...rest }) {
  const base = "rounded-md px-3 py-1.5 text-sm";
  const variants = {
    default: "bg-sky-600 text-white hover:bg-sky-700",
    ghost: "bg-transparent border",
    outline: "border"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant] || variants.default}`} {...rest}>
      {children}
    </button>
  );
}
