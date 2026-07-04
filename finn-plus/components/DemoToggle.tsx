"use client";

import { usePlus } from "./PlusContext";

/** Pitch-demo device: flip between free user and FINN+ member live. */
export default function DemoToggle() {
  const { isPlus, setIsPlus } = usePlus();

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border border-finn-border bg-white py-1.5 pl-4 pr-1.5 text-xs shadow-card-hover">
      <span className="font-medium text-finn-gray-2">Demo</span>
      <button
        onClick={() => setIsPlus(false)}
        className={`rounded-full px-3 py-1.5 font-medium ${
          !isPlus ? "bg-finn-ink text-white" : "text-finn-gray hover:bg-finn-bg"
        }`}
      >
        Fri bruker
      </button>
      <button
        onClick={() => setIsPlus(true)}
        className={`rounded-full px-3 py-1.5 font-medium ${
          isPlus ? "bg-finn-plus text-white" : "text-finn-gray hover:bg-finn-bg"
        }`}
      >
        FINN+ medlem
      </button>
    </div>
  );
}
