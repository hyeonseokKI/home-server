// DebugToggleButton.tsx
"use client";

import { useDebugOutline } from "./debug-provider";

export default function DebugToggleButton() {
  const { debug, toggle } = useDebugOutline();

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-md border px-3 py-1 text-sm hover:opacity-80"
      aria-pressed={debug}
      title="컴포넌트 경계선 디버그 토글"
    >
      test: {debug ? "ON" : "OFF"}
    </button>
  );
}
