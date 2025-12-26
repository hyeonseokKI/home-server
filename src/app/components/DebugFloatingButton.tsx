// DebugFloatingButton.tsx
"use client";

import { useDebugOutline } from "./debug-provider";

export default function DebugFloatingButton() {
  const { debug, toggle } = useDebugOutline();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={debug}
      title="컴포넌트 경계선 디버그 토글"
      className={`
        fixed bottom-4 right-4 z-[9999]
        rounded-full px-4 py-2 text-xs font-semibold
        shadow-lg backdrop-blur
        transition
        ${debug
          ? "border border-red-400 bg-red-950/70 text-red-300"
          : "border border-gray-600 bg-black/60 text-gray-300 hover:bg-black/80"}
      `}
    >
      Debug : {debug ? "ON" : "OFF"}
    </button>
  );
}
