import React from "react";

/* Basic slider using input range. For multiple handles you would need a lib. */
export default function Slider({ value = 0, onChange, min = 0, max = 8, step = 0.1 }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
  );
}
