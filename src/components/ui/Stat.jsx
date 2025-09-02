import React from "react";
export default function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border p-3 text-center">
      <div className="text-2xl font-extrabold tabular-nums">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}
