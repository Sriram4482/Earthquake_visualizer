import React from "react";

export default function Header({ children }) {
  return (
    <header className="sticky top-0 bg-white/70 backdrop-blur z-40 border-b border-slate-200">
      <div className="mx-auto max-w-7xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-extrabold">🌍 Earthquake Visualizer</div>
        </div>
        <div>{children}</div>
      </div>
    </header>
  );
}
