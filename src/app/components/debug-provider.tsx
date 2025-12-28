//debug-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type DebugContextValue = {
  debug: boolean;
  toggle: () => void;
  setDebug: (v: boolean) => void;
  showDebugButton: boolean;
  setShowDebugButton: (v: boolean) => void;
};

const DebugContext = createContext<DebugContextValue | null>(null);

export function DebugProvider({ children }: { children: React.ReactNode }) {
  const [debug, setDebug] = useState(false);
  const [showDebugButton, setShowDebugButton] = useState(false);

  // 최초 1회: localStorage에서 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ui-debug-outline");
      if (saved != null) setDebug(saved === "1");
    } catch {
      // ignore (privacy mode 등)
    }
  }, []);

  // debug 변경 시: html에 클래스 토글 + localStorage 저장
  useEffect(() => {
    const root = document.documentElement; // <html>
    root.classList.toggle("ui-debug-outline", debug);
    try {
      localStorage.setItem("ui-debug-outline", debug ? "1" : "0");
    } catch {
      // ignore
    }
  }, [debug]);

  // window 객체에 디버그 버튼 표시 함수 노출
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).showDebug = () => {
        setShowDebugButton(true);
        console.log("디버그 버튼이 표시되었습니다.");
      };
      (window as any).hideDebug = () => {
        setShowDebugButton(false);
        console.log("디버그 버튼이 숨겨졌습니다.");
      };
    }
  }, []);

  const value = useMemo(
    () => ({
      debug,
      toggle: () => setDebug((v) => !v),
      setDebug,
      showDebugButton,
      setShowDebugButton,
    }),
    [debug, showDebugButton]
  );

  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
}

export function useDebugOutline() {
  const ctx = useContext(DebugContext);
  if (!ctx) throw new Error("useDebugOutline must be used within <DebugProvider>");
  return ctx;
}
