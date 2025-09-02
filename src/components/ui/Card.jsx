import React from "react";
export default function Card({ children, className = "", ...rest }) {
  return (
    <div className={`bg-white rounded-2xl p-4 ${className} card-shadow`} {...rest}>
      {children}
    </div>
  );
}
